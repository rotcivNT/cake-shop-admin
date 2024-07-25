/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { filterOrders } from "@/services/orders";
import {
  FilterOrderProps,
  Order,
  OrderStatus,
  PaymentStatus,
} from "@/types/order";
import { formatDateTime } from "@/utils/formatDate";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import OrderStatusFilterSelect from "../SelectGroup/OrderStatusFilterSelect";
import Search from "../search/Search";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { Button } from "../ui/button";
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-4 xl:pl-11">
      <div className="h-4 w-40 rounded bg-gray-2 dark:bg-meta-4"></div>
    </td>
    <td className="px-4 py-4">
      <div className="h-4 w-32 rounded bg-gray-2 dark:bg-meta-4"></div>
    </td>
    <td className="px-4 py-4 text-center">
      <div className="mx-auto h-4 w-24 rounded bg-gray-2 dark:bg-meta-4"></div>
    </td>
    <td className="px-4 py-4 text-center xl:pl-11">
      <div className="mx-auto h-4 w-28 rounded bg-gray-2 dark:bg-meta-4"></div>
    </td>
    <td className="px-4 py-4 text-center">
      <div className="mx-auto h-8 w-20 rounded bg-gray-2 dark:bg-meta-4"></div>
    </td>
  </tr>
);
export default function OrderList() {
  const [filterProps, setFilterProps] = useState<FilterOrderProps>(
    {} as FilterOrderProps,
  );
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 0;
  const q = searchParams.get("q") || "";
  const router = useRouter();
  const [isLastPage, setIsLastPage] = useState(false);
  const { data: orders, isLoading } = useSWR(
    [`/filter-order?page=${page}&size=10&q=${q}`, filterProps],
    ([url, filterProps]) => filterOrders(url, filterProps),
  );
  const { data: nextPage } = useSWR(
    [`/filter-order?page=${+page + 1}&size=10&q=${q}`, filterProps],
    ([url, filterProps]) => filterOrders(url, filterProps),
  );
  const handleSetFilterProps = <T extends keyof FilterOrderProps>(
    key: T,
    value: string,
  ) => {
    setFilterProps((prev) => ({ ...prev, [key]: value }));
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    router.push("/orders");
  }, [filterProps]);

  useEffect(() => {
    if (nextPage && nextPage.code === 1 && nextPage.data.length === 0) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [nextPage]);
  return (
    <div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark  xl:pb-1">
      <div className="flex items-center justify-between p-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Hóa đơn
        </h4>
      </div>

      <div>
        <Search />
      </div>
      <div className="mb-6 px-6">
        <OrderStatusFilterSelect setFilterProps={handleSetFilterProps} />
      </div>
      <div className="max-w-full overflow-x-auto px-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Mã đơn hàng
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Ngày tạo hóa đơn
              </th>
              <th className="min-w-[120px] px-4 py-4 text-center font-medium text-black dark:text-white">
                Trạng thái hóa đơn
              </th>
              <th className="min-w-[220px] px-4 py-4 text-center font-medium text-black dark:text-white xl:pl-11">
                Tổng tiền
              </th>
              <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : (
              orders?.data &&
              orders.data.length > 0 &&
              orders.data.map((orderItem: Order) => (
                <tr key={orderItem.id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {orderItem.id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDateTime(orderItem.createdAt)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                    <p
                      className={`py-1text-sm inline-flex rounded-full bg-opacity-10 px-3 font-medium ${
                        orderItem.status === OrderStatus.SHIPPED
                          ? "bg-success text-success"
                          : orderItem.paymentDetail.status ===
                              PaymentStatus.FAILED
                            ? "bg-danger text-danger"
                            : "bg-warning text-warning"
                      }`}
                    >
                      {orderItem.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                    <p className="text-center text-black dark:text-white">
                      {formatNumberToVND(orderItem.total)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center justify-center space-x-3.5">
                      <Link
                        href={`/orders/${orderItem.id}`}
                        className="hover:text-primary"
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {orders?.data && orders.data.length === 0 && (
          <p className="py-10 text-center">Không tìm thấy hóa đơn</p>
        )}
      </div>
      <Pagination className="py-10">
        <PaginationContent>
          {+page !== 0 && (
            <PaginationItem>
              <Button className="p-0">
                <Link
                  className="block px-4 py-2"
                  href={"?" + createQueryString("page", `${+page - 1}`)}
                >
                  Trang trước
                </Link>
              </Button>
            </PaginationItem>
          )}
          <PaginationItem className="mx-4 font-bold">
            {+page + 1}
          </PaginationItem>
          {!isLastPage && (
            <PaginationItem>
              <Button className="p-0">
                <Link
                  className="block px-4 py-2"
                  href={"?" + createQueryString("page", `${+page + 1}`)}
                >
                  Trang tiếp
                </Link>
              </Button>
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
