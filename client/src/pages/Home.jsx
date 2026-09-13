import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const CATEGORIES = [
  { name: "Outerwear", value: "outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80" },
  { name: "Dresses", value: "dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" },
  { name: "Footwear", value: "footwear", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80" },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products/featured")
      .then((res) => setFeatured(res.data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-10 pb-20 lg:pt-16 lg:pb-32 grid lg:grid-cols-12 gap-8 items-end">
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-wide2 uppercase text-muted mb-6">
            Autumn / Winter Collection
          </p>
          <h1 className="font-display text-[13vw] leading-[0.95] lg:text-7xl lg:leading-[0.95]">
            Clothing built to <span className="italic">outlast</span> the season.
          </h1>
          <p className="mt-6 text-muted max-w-md">
            Natural fibers, considered construction, and a palette that moves easily
            from one year to the next. No trend cycle required.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-8 border border-ink px-7 py-3 text-sm hover:bg-ink hover:text-paper transition-colors"
          >
            Shop the collection
          </Link>
        </motion.div>

        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&q=80"
              alt="Model wearing a tailored wool overcoat"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Category strip */}
      <section className="container-page pb-24">
        <div className="grid sm:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              to={`/shop?category=${cat.value}`}
              className="group relative overflow-hidden aspect-[4/5]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 text-paper font-display text-2xl">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page pb-28">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl lg:text-4xl">Featured pieces</h2>
          <Link to="/shop" className="text-sm border-b border-ink hover:text-gold hover:border-gold transition-colors">
            View all
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featured.map((p, i) => (
              <ProductCard product={p} key={p._id} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Editorial strip */}
      <section className="bg-ink text-paper py-24">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80"
              alt="Fabric and material detail"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-wide2 uppercase text-gold mb-6">Our approach</p>
            <h2 className="font-display text-3xl lg:text-4xl leading-tight mb-6">
              Fewer garments, made properly, worn for a long time.
            </h2>
            <p className="text-paper/70 max-w-md">
              We work with a small number of mills across Europe and South Asia,
              choosing durable natural fibers over synthetic shortcuts. Every
              piece is designed to earn its place in a wardrobe, not to be
              replaced next season.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
