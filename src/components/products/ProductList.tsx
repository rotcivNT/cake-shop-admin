/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getAllProduct } from "@/services/product";
import { useCakeStore } from "@/store/CakeStore";
import { CakeProduct } from "@/types/CakeProduct";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import { Button } from "../ui/button";

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
  const {
    data: res,
    isLoading,
    error,
  } = useSWR("get-all-product", getAllProduct);
  useEffect(() => {
    if (!isLoading && !error && res) {
      if (res?.code === 1) {
        setProductData(res.data);
      }
    }
  }, [res, isLoading, error]);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Products
        </h4>
        <Button>
          <Link href="/product/create">Create Product</Link>
        </Button>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1  hidden items-center sm:col-span-2 sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center sm:col-span-2">
          <p className="font-medium">Size - Price</p>
        </div>
        <div className="col-span-2 flex items-center justify-end  sm:col-span-1">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {productData &&
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
              <button className="hover:text-primary">
                <Trash2 size={18} />
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
        ))}
    </div>
  );
};

export default ProductList;
