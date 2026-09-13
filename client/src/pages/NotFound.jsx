import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <h1 className="font-display text-6xl mb-4">404</h1>
      <p className="text-muted mb-8">This page doesn't exist.</p>
      <Link to="/" className="border border-ink px-7 py-3 text-sm hover:bg-ink hover:text-paper transition-colors">
        Back to home
      </Link>
    </div>
  );
}
