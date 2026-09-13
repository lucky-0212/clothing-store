import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";

const NAV_LINKS = [
  { label: "Shop All", to: "/shop" },
  { label: "Outerwear", to: "/shop?category=outerwear" },
  { label: "Dresses", to: "/shop?category=dresses" },
  { label: "Accessories", to: "/shop?category=accessories" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-linelight">
      <div className="container-page flex items-center justify-between h-20">
        <button
          className="lg:hidden text-sm tracking-wide2 uppercase"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          Menu
        </button>

        <Link to="/" className="font-display text-2xl tracking-tight select-none">
          NOIR <span className="italic font-light">&amp;</span> CO
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm text-ink/80 hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {user ? (
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <Link to="/orders" className="hover:text-gold transition-colors">
                {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-muted hover:text-ink transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:inline text-sm hover:text-gold transition-colors">
              Sign in
            </Link>
          )}

          <Link to="/cart" className="relative flex items-center" aria-label="View cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 7h12l-1 13H7L6 7Z" strokeLinejoin="round" />
              <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
            </svg>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-ink text-paper text-[10px] w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute left-0 top-0 h-full w-72 bg-paper p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="text-sm tracking-wide2 uppercase mb-10"
                onClick={() => setMenuOpen(false)}
              >
                Close
              </button>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="font-display text-2xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {!user && (
                  <Link
                    to="/login"
                    className="text-sm text-muted mt-4"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
