"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductType } from "@/types/product";
import { toast } from "sonner";

interface CartStore {
  items: ProductType[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data) => {
        const exists = get().items.some((item) => item.id === data.id);
        if (exists) {
          toast.info("El producto ya está en el carrito");
          return;
        }
        set({ items: [...get().items, data] });
        toast.success("Producto añadido al carrito 🙂");
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast("Producto eliminado del carrito 😔");
      },

      removeAll: () => {
        set({ items: [] });
        toast("Carrito vaciado");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      // opcional: persiste solo items
      partialize: (state) => ({ items: state.items }),
    }
  )
);
