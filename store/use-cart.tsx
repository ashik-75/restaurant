import { Menu } from "@/db/schema";
import { CartItemType } from "@/types/cart.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderState = {
  items: CartItemType[];
  addItemToCart: (item: Menu) => void;
  updateCart: (id: number, quantity: number, note?: string) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
};

export const useCart = create<OrderState>()(
  persist(
    (set) => ({
      items: [],

      addItemToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === item.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }
        });
      },
      updateCart: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      removeItemFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((items) => items.id !== id),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // Key for localStorage
    }
  )
);
