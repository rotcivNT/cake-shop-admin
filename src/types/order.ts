import { CakeProduct } from "./CakeProduct";

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export enum PaymentType {
  VN_PAY = "vnpay",
  COD = "cod",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  SHIPPING = "SHIPPING",
  CANCELLED = "CANCELLED",
}

export interface PaymentDetail {
  id: string;
  amount: number;
  status: PaymentStatus;
  type: PaymentType;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetailFull {
  id: string;
  variantId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  productJson: string;
  price: number;
  product?: CakeProduct;
}

export interface OrderDetail {
  variantId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  price: number;
}

export interface Order {
  id: string;
  total: number;
  userJson: string;
  userId?: string;
  description: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  orderDetailsFull: OrderDetailFull[];
  orderDetails?: OrderDetail[];
  paymentDetail: PaymentDetail;
  status: OrderStatus;
}

export interface FilterOrderProps {
  status: OrderStatus | null;
  startedAt: Date | null;
  endedAt: Date | null;
}
