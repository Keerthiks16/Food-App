import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item, quantity, customs = [], total) => {
        const newOrder = {
          id: Date.now(),
          item,
          quantity,
          customs,
          total,
        };
        set((state) => ({
          cart: [...state.cart, newOrder],
        }));
      },

      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((order) => order.id !== id),
        }));
      },

      updateQuantity: (id, newQuantity, newTotal) => {
        if (newQuantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set((state) => ({
          cart: state.cart.map((order) =>
            order.id === id
              ? { ...order, quantity: newQuantity, total: newTotal }
              : order
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getCartTotal: () => {
        const { cart } = get();
        return cart
          .reduce((total, order) => total + parseFloat(order.total), 0)
          .toFixed(2);
      },

      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((count, order) => count + order.quantity, 0);
      },

      isItemInCart: (itemName) => {
        const { cart } = get();
        return cart.some((order) => order.item === itemName);
      },

      getCartItem: (id) => {
        const { cart } = get();
        return cart.find((order) => order.id === id);
      },

      getAllCartItems: () => {
        const { cart } = get();
        return cart;
      },
    }),
    {
      name: "cart-storage",
      storage: AsyncStorage, // ✅ Directly pass AsyncStorage here
    }
  )
);

export default useCartStore;
