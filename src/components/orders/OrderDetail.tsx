/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getAllOrders, updateOrderStatus } from "@/services/orders";
import { useCakeStore } from "@/store/CakeStore";
import {
  Order,
  OrderDetailFull,
  OrderStatus,
  PaymentStatus,
  PaymentType,
} from "@/types/order";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { Button } from "../ui/button";
import Link from "next/link";
import OrderStatusSelect from "../SelectGroup/OrderStatusSelect";

export default function OrderDetail() {
  const { id } = useParams();
  const [orders, setOrders] = useState<Order[]>();
  const { data, isLoading } = useSWR(id, getAllOrders);
  useEffect(() => {
    if (data && data.data) {
      data.data.map((order) =>
        order.orderDetailsFull.map(
          (item) => (item.product = JSON.parse(item.productJson)),
        ),
      );
      setOrders(data.data);
    }
  }, [data]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Order - {orders && orders[0].id}
        </h4>
        <Button>
          <Link href="/orders">Quay về</Link>
        </Button>
      </div>
      <div className="m-6 ">
        {orders && (
          <OrderStatusSelect
            orderId={orders[0].id}
            defaultValue={orders[0].status}
          />
        )}
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Tên sản phẩm</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Size</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Giá</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Số lượng</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Tổng tiền</p>
        </div>
      </div>

      {orders &&
        orders.map((order) => (
          <>
            {order.orderDetailsFull.map(
              (item) =>
                item.product && (
                  <div
                    className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={item.id}
                  >
                    <div className="col-span-3 flex items-center">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="h-12.5 w-15 rounded-md">
                          <Image
                            src={item.product?.thumbnail}
                            width={60}
                            height={50}
                            alt="Product"
                          />
                        </div>
                        <p className="text-sm text-black dark:text-white">
                          {item.product.name}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm text-black dark:text-white">
                        {
                          item.product.productVariants.find(
                            (pv) => pv.variant.id === item.variantId,
                          )?.variant.variantValue
                        }
                      </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm text-black dark:text-white">
                        {formatNumberToVND(item.price)}
                      </p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                      <p className="text-sm text-black dark:text-white">
                        {item.quantity}
                      </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-sm text-meta-3">
                        {formatNumberToVND(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ),
            )}
            <div className="mt-5 px-6 pb-10 text-[18px]">
              <div className="flex items-center justify-between">
                <p className="font-bold text-inherit">
                  Tổng tiền:{" "}
                  <span className="mr-1 text-[#EF4444]">
                    {formatNumberToVND(order.total)}
                  </span>
                  <span className="text-base">
                    {order.paymentDetail.status === PaymentStatus.PENDING
                      ? "(Chưa thanh toán)"
                      : order.paymentDetail.status === PaymentStatus.PAID
                        ? "(Đã thanh toán)"
                        : "(Thanh toán thất bại)"}
                  </span>
                </p>
                <p className="font-bold text-inherit">
                  Phương thức thanh toán:{" "}
                  {order.paymentDetail.type.toUpperCase()}
                </p>
              </div>
              <p className="my-2 font-bold text-inherit">
                Địa chỉ giao hàng: {order.shippingAddress}
              </p>
              <p className="font-bold text-inherit">
                Ghi chú:{" "}
                {order.description !== "null"
                  ? order.description
                  : "Không có ghi chú."}
              </p>
            </div>
          </>
        ))}
    </div>
  );
}
