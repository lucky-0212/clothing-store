import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product, index = 0 }) {
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        <div className="relative overflow-hidden bg-surface/5 aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          {(product.isNewArrival || onSale) && (
            <span className="absolute top-3 left-3 bg-paper text-ink text-[10px] tracking-wide2 uppercase px-2 py-1">
              {onSale ? "Sale" : "New"}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm text-ink">{product.name}</h3>
            <p className="text-xs text-muted mt-1">{product.material}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-sm">${product.price}</span>
            {onSale && (
              <span className="block text-xs text-muted line-through">
                ${product.compareAtPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
