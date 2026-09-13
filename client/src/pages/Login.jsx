import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate(searchParams.get("redirect") || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page py-20 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl mb-2">Sign in</h1>
        <p className="text-muted text-sm mb-8">Welcome back. Enter your details below.</p>

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 mb-6">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs tracking-wide2 uppercase text-muted block mb-2">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-linelight bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs tracking-wide2 uppercase text-muted block mb-2">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-linelight bg-transparent px-4 py-3 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-ink text-paper text-sm hover:bg-gold hover:text-ink transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-muted mt-8">
          New here?{" "}
          <Link to="/register" className="text-ink underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
