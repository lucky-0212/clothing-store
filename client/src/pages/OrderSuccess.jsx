import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import Loader from "../components/Loader";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="container-page py-24 max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-16 h-16 rounded-full border border-ink flex items-center justify-center mx-auto mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-display text-3xl mb-3">Order placed</h1>
        <p className="text-muted mb-8">
          Thank you{order && `, order #${order._id.slice(-6).toUpperCase()}`} — we'll email you
          when it ships.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/orders" className="border border-ink px-6 py-3 text-sm hover:bg-ink hover:text-paper transition-colors">
            View orders
          </Link>
          <Link to="/shop" className="text-sm text-muted hover:text-ink underline">
            Continue shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
