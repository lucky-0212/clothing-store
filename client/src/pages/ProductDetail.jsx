import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import Loader from "../components/Loader";
import useCartStore from "../store/cartStore";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/${slug}`)
      .then((res) => {
        setProduct(res.data);
        setColor(res.data.colors?.[0]?.name || "");
        setSize(res.data.sizes?.[0] || "");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (product.sizes.length && !size) return;
    addItem({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size,
      color,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (loading) return <Loader />;
  if (!product) return <div className="container-page py-24 text-center">Product not found.</div>;

  return (
    <div className="container-page py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-[3/4] overflow-hidden bg-surface/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-20 overflow-hidden border ${
                    i === activeImage ? "border-ink" : "border-transparent opacity-60"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-wide2 uppercase text-muted mb-2">{product.category}</p>
          <h1 className="font-display text-3xl lg:text-4xl mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl">${product.price}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-muted line-through text-sm">${product.compareAtPrice}</span>
            )}
          </div>

          <p className="text-muted leading-relaxed mb-8 max-w-md">{product.description}</p>

          {product.colors?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs tracking-wide2 uppercase text-muted mb-3">
                Color — {color}
              </p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === c.name ? "border-ink" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mb-8">
              <p className="text-xs tracking-wide2 uppercase text-muted mb-3">Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-11 h-11 text-sm border ${
                      size === s
                        ? "bg-ink text-paper border-ink"
                        : "border-linelight hover:border-ink"
                    } transition-colors`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
            <p className="text-xs tracking-wide2 uppercase text-muted">Qty</p>
            <div className="flex items-center border border-linelight">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 text-lg"
              >
                –
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-9 h-9 text-lg"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full sm:w-auto px-10 py-4 bg-ink text-paper text-sm hover:bg-gold hover:text-ink transition-colors disabled:opacity-40"
          >
            {product.stock === 0 ? "Out of stock" : added ? "Added ✓" : "Add to bag"}
          </button>

          <p className="text-xs text-muted mt-4">{product.material}</p>
        </motion.div>
      </div>
    </div>
  );
}
