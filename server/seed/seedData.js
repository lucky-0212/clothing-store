import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();
connectDB();

const products = [
  {
    name: "Wool Overcoat",
    slug: "wool-overcoat",
    description:
      "A tailored double-breasted overcoat cut from heavyweight Italian wool. Structured shoulders, a full canvas construction, and a length that falls just below the knee.",
    category: "outerwear",
    price: 428,
    compareAtPrice: 540,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    ],
    colors: [{ name: "Charcoal", hex: "#3a3a3a" }, { name: "Camel", hex: "#c19a6b" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 24,
    material: "100% Wool",
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: "Silk Slip Dress",
    slug: "silk-slip-dress",
    description:
      "Bias-cut silk charmeuse slip dress with adjustable straps and a fluid, body-skimming drape. Finished with a hand-rolled hem.",
    category: "dresses",
    price: 265,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    ],
    colors: [{ name: "Ivory", hex: "#f2ede4" }, { name: "Black", hex: "#111111" }],
    sizes: ["XS", "S", "M", "L"],
    stock: 18,
    material: "100% Silk",
    isFeatured: true,
  },
  {
    name: "Merino Turtleneck",
    slug: "merino-turtleneck",
    description:
      "Fine-gauge merino wool turtleneck with a close, ribbed fit. Breathable, temperature-regulating, and built to layer.",
    category: "tops",
    price: 118,
    images: [
      "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80",
    ],
    colors: [{ name: "Oatmeal", hex: "#d8cfc0" }, { name: "Forest", hex: "#2f3b2c" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 40,
    material: "100% Merino Wool",
    isNewArrival: true,
  },
  {
    name: "Tailored Wide-Leg Trouser",
    slug: "tailored-wide-leg-trouser",
    description:
      "High-rise wide-leg trouser in a fluid wool-blend twill. Pressed center creases and a clean waistband with hidden hook closure.",
    category: "bottoms",
    price: 195,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80",
    ],
    colors: [{ name: "Black", hex: "#111111" }, { name: "Stone", hex: "#a89f91" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 30,
    material: "Wool Blend",
    isFeatured: true,
  },
  {
    name: "Leather Chelsea Boot",
    slug: "leather-chelsea-boot",
    description:
      "Hand-finished full-grain leather Chelsea boot on a stacked leather sole. Elastic side gussets and a pull tab for easy wear.",
    category: "footwear",
    price: 340,
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
    ],
    colors: [{ name: "Cognac", hex: "#8a4b2a" }, { name: "Black", hex: "#111111" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 22,
    material: "Full-Grain Leather",
    isNewArrival: true,
  },
  {
    name: "Cashmere Scarf",
    slug: "cashmere-scarf",
    description:
      "An oversized scarf woven from pure cashmere with a soft fringed edge. Generous proportions for wrapping or draping.",
    category: "accessories",
    price: 145,
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    ],
    colors: [{ name: "Camel", hex: "#c19a6b" }, { name: "Charcoal", hex: "#3a3a3a" }],
    sizes: [],
    stock: 50,
    material: "100% Cashmere",
    isFeatured: true,
  },
  {
    name: "Structured Blazer",
    slug: "structured-blazer",
    description:
      "Single-breasted blazer with a sharply structured shoulder and nipped waist. Cut from a mid-weight twill with a soft hand.",
    category: "outerwear",
    price: 310,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80",
    ],
    colors: [{ name: "Black", hex: "#111111" }, { name: "Pinstripe", hex: "#4a4a55" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 26,
    material: "Wool Twill",
    isNewArrival: true,
  },
  {
    name: "Cotton Poplin Shirt",
    slug: "cotton-poplin-shirt",
    description:
      "Crisp cotton poplin shirt with a relaxed fit through the body and a slightly dropped shoulder. Mother-of-pearl buttons.",
    category: "tops",
    price: 98,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    colors: [{ name: "White", hex: "#f7f7f5" }, { name: "Sky", hex: "#aebfd1" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 45,
    material: "100% Cotton",
    isFeatured: true,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany({ role: "admin" });

    await Product.insertMany(products);
    await User.create({
      name: "Admin",
      email: "admin@noirandco.com",
      password: "admin123",
      role: "admin",
    });

    console.log("Seed data imported successfully");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
