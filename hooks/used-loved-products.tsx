import { create } from "zustand"; 
import {persist, createJSONStorage} from "zustand/middleware"
import { ProductType } from "@/types/product";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface UseLovedProductsTypes {
    lovedItems: ProductType [],
    addLoveItem: (data: ProductType) => void
    removeLovedItem: (id: number) => void
}


export const UseLovedProducts = create(persist<UseLovedProductsTypes>((set,get)=> ({
     lovedItems: [],
     addLoveItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find((item) => item.id === data.id)
     
        if (existingItem) {
            return toast.info("El producto ya está en el carrito ;)");
        }
        set ({
            lovedItems: [...get().lovedItems, data]
        })
        toast.success("Producto agregado a tus favoritos! ;)");
    },
    removeLovedItem: (id: number) => {
        set({lovedItems: [...get().lovedItems.filter((item)=> item.id !== id)]})
        toast("Producto eliminado de favoritos 😔");
    }
}), {
    name: "loved-product-storage",
    storage: createJSONStorage(() => localStorage)
}))