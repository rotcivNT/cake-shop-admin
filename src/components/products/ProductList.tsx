/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getAllProduct, updateProductStatus } from "@/services/product";
import { useCakeStore } from "@/store/CakeStore";
import { CakeProduct } from "@/types/CakeProduct";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { Edit, Eye, EyeOff, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import FilterCategorySelect from "../SelectGroup/FilterCategorySelect";
import Search from "../search/Search";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import ProductListLoading from "./ProductListLoading";

export interface ProductListProps {
  product: CakeProduct;
  categoryId: string;
  categoryName: string;
  parentCategoryId: string;
  parentCategoryName: string;
}

const ProductList = () => {
  const { productData, setProductData } = useCakeStore((state) => ({
    productData: state.productData,
    setProductData: state.setProductData,
  }));
  const [selectedCateId, setSelectedCateId] = useState<string>("");
  const [isLastPage, setIsLastPage] = useState(false);
  const query = useSearchParams();
  const page = query.get("page") || 0;
  const q = query.get("q") || "";
  const {
    data: res,
    isLoading,
    error,
  } = useSWR(
    [`?page=${+page}&size=10&q=${q}`, selectedCateId],
    ([url, selectedCateId]) => getAllProduct(url, selectedCateId),
  );
  const { data: nextPage } = useSWR(
    [`?page=${+page + 1}&size=10&q=${q}`, selectedCateId],
    ([url, selectedCateId]) => getAllProduct(url, selectedCateId),
  );
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const toggleHidden = async (id: string, isStop: boolean) => {
    try {
      const res = await updateProductStatus(id, isStop);
      if (res.statusCode === "200") {
        const newData = productData.map((item) => {
          if (item.product.id === id) {
            return {
              ...item,
              product: {
                ...item.product,
                stop: isStop,
              },
            };
          }
          return item;
        });
        setProductData(newData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!isLoading && !error && res) {
      if (res?.code === 1) {
        setProductData(res.data);
      }
    }
  }, [res, isLoading, error]);
  useEffect(() => {
    if (nextPage && nextPage.code === 1 && nextPage.data.length === 0) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [nextPage]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Sản phẩm
        </h4>
        <Button>
          <Link href="/product/create">Thêm sản phẩm</Link>
        </Button>
      </div>
      <div>
        <Search />
      </div>
      <div className="mb-6 ">
        <FilterCategorySelect setSelectedCateId={setSelectedCateId} />
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Tên sản phẩm</p>
        </div>
        <div className="col-span-1  hidden items-center sm:col-span-2 sm:flex">
          <p className="font-medium">Danh mục</p>
        </div>
        <div className="col-span-1 flex items-center sm:col-span-2">
          <p className="font-medium">Size - Giá</p>
        </div>
        <div className="col-span-2 flex items-center justify-end  sm:col-span-1">
          <p className="font-medium">Hành động</p>
        </div>
      </div>

      {isLoading ? (
        <ProductListLoading />
      ) : (
        productData &&
        productData.map((data, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <Image
                    src={data.product.thumbnail}
                    width={60}
                    height={50}
                    alt="Product"
                    className=" h-[50px] w-[60px] rounded-md object-cover"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {data.product.name}
                </p>
              </div>
            </div>
            <div className="col-span-1 hidden items-center sm:col-span-2 sm:flex">
              <p className="text-sm text-black dark:text-white">
                {data.categoryName}
              </p>
            </div>
            <div className="col-span-1 flex flex-col justify-center sm:col-span-2">
              {data.product.productVariants.map((item) => (
                <p
                  key={item.variant.id}
                  className="text-sm text-black dark:text-white"
                >
                  {item.variant.variantValue} - {formatNumberToVND(item.price)}
                </p>
              ))}
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-3.5 sm:col-span-1">
              <button
                onClick={() =>
                  toggleHidden(data.product.id, !data.product.stop)
                }
                className="hover:text-primary"
              >
                {data.product.stop ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <Link
                href={{
                  pathname: "/product/update",
                  query: `id=${data.product.id}`,
                }}
                className="block hover:text-primary"
              >
                <Edit size={18} />
              </Link>
            </div>
          </div>
        ))
      )}
      <Pagination className="pb-10">
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
};

export default ProductList;
