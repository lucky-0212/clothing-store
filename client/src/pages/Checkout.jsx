import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import useCartStore from "../store/cartStore";

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 150 ? 0 : 9.99;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = (subtotal + shipping + tax).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/orders", {
        items,
        shippingAddress: address,
        paymentMethod: "Cash on Delivery",
      });
      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-page py-32 text-center">
        <p className="text-muted">Your bag is empty.</p>
      </div>
    );
  }

  return (
    <div className="container-page py-12 grid lg:grid-cols-3 gap-12">
      <motion.form
        onSubmit={handleSubmit}
        className="lg:col-span-2 space-y-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl mb-6">Shipping details</h1>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>
        )}

        <div>
          <label className="text-xs tracking-wide2 uppercase text-muted block mb-2">Address</label>
          <input
            required
            value={address.line1}
            onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            className="w-full border border-linelight bg-transparent px-4 py-3 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs tracking-wide2 uppercase text-muted block mb-2">City</label>
            <input
              required
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full border border-linelight bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs tracking-wide2 uppercase text-muted block mb-2">State</label>
            <input
              required
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              className="w-full border border-linelight bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs tracking-wide2 uppercase text-muted block mb-2">Postal code</label>
            <input
              required
              value={address.postalCode}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              className="w-full border border-linelight bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs tracking-wide2 uppercase text-muted block mb-2">Country</label>
            <input
              required
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="w-full border border-linelight bg-transparent px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs tracking-wide2 uppercase text-muted mb-2">Payment</p>
          <p className="text-sm border border-linelight px-4 py-3">Cash on Delivery</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-ink text-paper text-sm hover:bg-gold hover:text-ink transition-colors disabled:opacity-50"
        >
          {loading ? "Placing order…" : `Place order — $${total}`}
        </button>
      </motion.form>

      <div className="border border-linelight p-6 h-fit">
        <h2 className="font-display text-xl mb-6">Order Summary</h2>
        <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <li key={`${item.product}-${item.size}`} className="flex justify-between text-sm">
              <span className="text-muted">
                {item.name} × {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-linelight pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base pt-2 border-t border-linelight">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
