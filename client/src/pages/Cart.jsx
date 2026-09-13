import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

export default function Cart() {
  const { items, updateQty, removeItem } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = () => {
    navigate(user ? "/checkout" : "/login?redirect=/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-3xl mb-4">Your bag is empty</h1>
        <p className="text-muted mb-8">Nothing here yet — go find something to wear.</p>
        <Link to="/shop" className="border border-ink px-7 py-3 text-sm hover:bg-ink hover:text-paper transition-colors">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-4xl mb-10">Your Bag</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 divide-y divide-linelight">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={`${item.product}-${item.size}-${item.color}`}
                layout
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-5 py-6"
              >
                <div className="w-24 h-32 shrink-0 overflow-hidden bg-surface/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm">{item.name}</h3>
                      <p className="text-xs text-muted mt-1">
                        {item.color} {item.size && `· ${item.size}`}
                      </p>
                    </div>
                    <span className="text-sm">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-linelight">
                      <button
                        onClick={() => updateQty(index, Math.max(1, item.qty - 1))}
                        className="w-8 h-8 text-sm"
                      >
                        –
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQty(index, item.qty + 1)}
                        className="w-8 h-8 text-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-xs text-muted hover:text-ink underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="border border-linelight p-6 h-fit">
          <h2 className="font-display text-xl mb-6">Order Summary</h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-muted">Shipping</span>
            <span>{subtotal > 150 ? "Free" : "$9.99"}</span>
          </div>
          <div className="border-t border-linelight pt-4 flex justify-between text-base mb-6">
            <span>Estimated total</span>
            <span>${(subtotal + (subtotal > 150 ? 0 : 9.99)).toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full py-4 bg-ink text-paper text-sm hover:bg-gold hover:text-ink transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
