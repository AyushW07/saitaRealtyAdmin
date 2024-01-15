import { create } from "zustand";

const useLoginStore = create((set) => ({
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  login: () => {
    localStorage.setItem("isLoggedIn", "true");
    set({ isLoggedIn: true });
  },
  logout: () => {
    localStorage.setItem("isLoggedIn", "false");
    set({ isLoggedIn: false });
  },
}));

export default useLoginStore;
