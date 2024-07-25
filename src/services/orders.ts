// "use server";

import { FilterOrderProps, Order, OrderStatus } from "@/types/order";

const baseURL = process.env.NEXT_PUBLIC_SHOPPING_BACK_END_URL as string;

export const getAllOrders = async (orderId?: string) => {
  try {
    const res = await fetch(`${baseURL}/get-orders/${orderId ? orderId : ""}`);
    const data: Order[] = await res.json();

    if (res.ok) {
      return {
        code: 1,
        msg: "success",
        data,
      };
    }
  } catch (e) {
    return {
      code: -1,
      msg: e,
    };
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  try {
    const res = await fetch(`${baseURL}/update-order/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    });
    const data = await res.json();
    if (res.ok) {
      return {
        code: 1,
        msg: "success",
        data,
      };
    }
  } catch (e) {
    return {
      code: -1,
      msg: e,
    };
  }
};

export const getStatistics = async (type?: string) => {
  type = type ? type : "daily";
  try {
    const res = await fetch(`${baseURL}/get-statistics?type=${type}`);
    const data = await res.json();
    if (res.ok) {
      return {
        code: 1,
        msg: "success",
        data,
      };
    }
  } catch (e) {
    return {
      code: -1,
      msg: e,
    };
  }
};

export const filterOrders = async (
  url: string,
  filderOrderProps?: FilterOrderProps,
) => {
  try {
    if (!filderOrderProps) {
      filderOrderProps = {} as FilterOrderProps;
    }
    if (!filderOrderProps.status) {
      filderOrderProps.status = null;
    }
    const res = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filderOrderProps),
    });
    const data = await res.json();
    if (res.ok) {
      return {
        code: 1,
        msg: "success",
        data,
      };
    }
  } catch (e) {
    return {
      code: -1,
      msg: e,
    };
  }
};
