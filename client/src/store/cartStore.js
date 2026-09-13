import { create } from "zustand";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("noir_cart")) || [];
  } catch {
    return [];
  }
};

const persist = (items) => localStorage.setItem("noir_cart", JSON.stringify(items));

const useCartStore = create((set, get) => ({
  items: loadCart(),

  addItem: (item) => {
    const items = [...get().items];
    const existing = items.find(
      (i) => i.product === item.product && i.size === item.size && i.color === item.color
    );
    if (existing) {
      existing.qty += item.qty;
    } else {
      items.push(item);
    }
    persist(items);
    set({ items });
  },

  updateQty: (index, qty) => {
    const items = [...get().items];
    if (!items[index]) return;
    items[index].qty = qty;
    persist(items);
    set({ items });
  },

  removeItem: (index) => {
    const items = get().items.filter((_, i) => i !== index);
    persist(items);
    set({ items });
  },

  clearCart: () => {
    persist([]);
    set({ items: [] });
  },

  get total() {
    return get().items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },
}));

export default useCartStore;
