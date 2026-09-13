import Product from "../models/Product.js";

// @desc  Get all products with filtering, search, sort, pagination
// @route GET /api/products
export const getProducts = async (req, res) => {
  const { category, search, sort, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

  const query = {};
  if (category && category !== "all") query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { rating: -1 };

  const pageSize = Number(limit);
  const skip = (Number(page) - 1) * pageSize;

  const [products, total] = await Promise.all([
    Product.find(query).sort(sortOption).skip(skip).limit(pageSize),
    Product.countDocuments(query),
  ]);

  res.json({
    products,
    page: Number(page),
    pages: Math.ceil(total / pageSize),
    total,
  });
};

// @desc  Get single product by slug
// @route GET /api/products/:slug
export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate(
    "reviews.user",
    "name"
  );
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// @desc  Get featured products
// @route GET /api/products/featured
export const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8);
  res.json(products);
};

// @desc  Create a product (admin)
// @route POST /api/products
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// @desc  Update a product (admin)
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// @desc  Delete a product (admin)
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product removed" });
};

// @desc  Add a review to a product
// @route POST /api/products/:id/reviews
export const addProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) {
    return res.status(400).json({ message: "You have already reviewed this product" });
  }

  product.reviews.push({
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  });

  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;

  await product.save();
  res.status(201).json({ message: "Review added" });
};
