import { create } from "zustand";

const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem("noir_user")) || null;
  } catch {
    return null;
  }
};

const useAuthStore = create((set) => ({
  user: loadUser(),

  login: (userData) => {
    localStorage.setItem("noir_user", JSON.stringify(userData));
    set({ user: userData });
  },

  logout: () => {
    localStorage.removeItem("noir_user");
    set({ user: null });
  },
}));

export default useAuthStore;
