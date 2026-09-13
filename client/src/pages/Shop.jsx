import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Tops", value: "tops" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Dresses", value: "dresses" },
  { label: "Footwear", value: "footwear" },
  { label: "Accessories", value: "accessories" },
];

const SORTS = [
  { label: "Newest", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";

  const [data, setData] = useState({ products: [], pages: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", { params: { category, sort, search, page, limit: 12 } })
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [category, sort, search, page]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    setPage(1);
  };

  return (
    <div className="container-page py-12">
      <div className="mb-10">
        <h1 className="font-display text-4xl lg:text-5xl">Shop All</h1>
        <p className="text-muted mt-2 text-sm">{data.total || 0} pieces</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-56 shrink-0">
          <h3 className="text-xs tracking-wide2 uppercase text-muted mb-4">Category</h3>
          <ul className="space-y-2 mb-10">
            {CATEGORIES.map((c) => (
              <li key={c.value}>
                <button
                  onClick={() => updateParam("category", c.value === "all" ? "" : c.value)}
                  className={`text-sm ${
                    category === c.value ? "text-ink font-medium" : "text-muted hover:text-ink"
                  } transition-colors`}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-xs tracking-wide2 uppercase text-muted mb-4">Sort</h3>
          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="w-full border border-linelight bg-transparent text-sm px-3 py-2"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </aside>

        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : data.products.length === 0 ? (
            <p className="text-muted py-20 text-center">
              No pieces found. Try a different filter.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {data.products.map((p, i) => (
                  <ProductCard product={p} key={p._id} index={i} />
                ))}
              </div>

              {data.pages > 1 && (
                <div className="flex justify-center gap-2 mt-16">
                  {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 text-sm ${
                        p === page ? "bg-ink text-paper" : "text-muted hover:text-ink"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
