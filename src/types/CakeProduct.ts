import { CategoryProps } from ".";

export interface Gallery {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  id: string;
  variantKey: string;
  variantValue: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  price: number;
  variant: Variant;
  createdAt: string;
  updatedAt: string;
}

export interface CakeProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  thumbnail: string;
  description: string;
  category?: CategoryProps;
  createdAt: string;
  updatedAt: string;
  galleries: Gallery[];
  productVariants: ProductVariant[];
  stop: boolean;
}
