import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc  Create a new order (checkout)
// @route POST /api/orders
export const createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  let itemsPrice = 0;
  const validatedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) continue;
    itemsPrice += product.price * item.qty;
    validatedItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: item.size,
      color: item.color,
      qty: item.qty,
    });
  }

  const shippingPrice = itemsPrice > 150 ? 0 : 9.99;
  const taxPrice = Number((itemsPrice * 0.08).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const order = await Order.create({
    user: req.user._id,
    items: validatedItems,
    shippingAddress,
    paymentMethod: paymentMethod || "Cash on Delivery",
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  res.status(201).json(order);
};

// @desc  Get logged-in user's orders
// @route GET /api/orders/mine
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// @desc  Get single order by id
// @route GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) return res.status(404).json({ message: "Order not found" });

  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized to view this order" });
  }

  res.json(order);
};

// @desc  Get all orders (admin)
// @route GET /api/orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
  res.json(orders);
};

// @desc  Update order status (admin)
// @route PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = req.body.status || order.status;
  if (req.body.status === "delivered") {
    order.isPaid = true;
    order.paidAt = Date.now();
  }

  const updated = await order.save();
  res.json(updated);
};
