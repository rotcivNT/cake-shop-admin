import { ProductListProps } from "@/components/products/ProductList";
import { create, createStore } from "zustand";

interface CakeStoreState {
  productData: ProductListProps[];
  setProductData: (data: ProductListProps[]) => void;
}

export const useCakeStore = create<CakeStoreState>()(
  (set): CakeStoreState => ({
    productData: [],
    setProductData: (data: ProductListProps[]) => set({ productData: data }),
  }),
);
