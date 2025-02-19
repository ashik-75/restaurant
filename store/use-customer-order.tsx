import { OrderItem } from "@/types/cart.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderState = {
  orders: OrderItem[];
  addCustomerOrder: (item: OrderItem) => void;
  updateOrder: (id: number, quantity: number, note?: string) => void;
  removeOrder: (id: number) => void;
  clearOrders: () => void;
};

export const useCustomerOrder = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],

      addCustomerOrder: (item) =>
        set((state) => {
          const existingItem = state.orders.find(
            (order) => order.id === item.id
          );
          if (existingItem) {
            return {
              orders: state.orders.map((order) =>
                order.id === item.id
                  ? { ...order, quantity: order.quantity + 1 }
                  : order
              ),
            };
          } else {
            return { orders: [...state.orders, { ...item, quantity: 1 }] };
          }
        }),

      updateOrder: (id, quantity) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, quantity } : order
          ),
        })),

      removeOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        })),

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "order-storage", // Key for localStorage
    }
  )
);
