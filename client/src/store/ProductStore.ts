import type {Cart} from "@/features/cart/types";
import {create} from "zustand";
import { type Product, type ProductFormInput } from "@/schema/product.schema";

interface CartState {
    cart: Cart[],
    preview: null | ProductFormInput
    addToPreview: (preview: Product) => void
    addToCart: (item: Cart) => void,
    removeItem: (id: string) => void
}

export const useProductStore = create<CartState>((set, get) => ({
    cart: [],
    preview: null,
    addToPreview: (preview) => set({preview}),
    addToCart: (item) => {
        const items = get().cart
        const exist = items.some((itm) => itm.idx === item.idx)
        const newItem = !exist ? [...items, item] : items
        set({cart: newItem})
    },
    removeItem: (id) => {
        const filterProduct = get().cart.filter((item) => item.idx !== id)
        set({cart: filterProduct})
    }
})) 