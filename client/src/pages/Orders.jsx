import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

const STATUS_COLOR = {
  pending: "text-muted",
  processing: "text-gold",
  shipped: "text-gold",
  delivered: "text-green-700",
  cancelled: "text-red-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/mine")
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-4xl mb-10">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted mb-6">You haven't placed any orders yet.</p>
          <Link to="/shop" className="border border-ink px-6 py-3 text-sm hover:bg-ink hover:text-paper transition-colors">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-linelight border-t border-b border-linelight">
          {orders.map((order) => (
            <div key={order._id} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm">Order #{order._id.slice(-6).toUpperCase()}</p>
                <p className="text-xs text-muted mt-1">
                  {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item(s)
                </p>
              </div>
              <div className="flex items-center gap-6">
                <span className={`text-xs uppercase tracking-wide2 ${STATUS_COLOR[order.status]}`}>
                  {order.status}
                </span>
                <span className="text-sm">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
