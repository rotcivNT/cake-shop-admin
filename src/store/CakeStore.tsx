import { ProductListProps } from "@/components/products/ProductList";
import { Order } from "@/types/order";
import { create, createStore } from "zustand";

interface CakeStoreState {
  productData: ProductListProps[];
  setProductData: (data: ProductListProps[]) => void;
  orderList: Order[];
  setOrderList: (data: Order[]) => void;
}

export const useCakeStore = create<CakeStoreState>()(
  (set): CakeStoreState => ({
    productData: [],
    setProductData: (data: ProductListProps[]) => set({ productData: data }),
    orderList: [],
    setOrderList: (data: Order[]) => set({ orderList: data }),
  }),
);
