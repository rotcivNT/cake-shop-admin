/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { uploadFile } from "@/services";
import {
  createNewProduct,
  getAllVariants,
  updateProduct,
} from "@/services/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import CategorySelect from "../SelectGroup/CategorySelect";
import SizeSelect from "../SelectGroup/SizeSelect";
import { Button } from "../ui/button";
import FileUpload from "./FileUpload";
import { Loader2 } from "lucide-react";

export interface IFormInput {
  name: string;
  desc: string;
  categoryId: string;
  images: File[];
}

export interface PriceProps {
  variantId: string;
  price: number;
}

export interface VariantSelection {
  value: string;
  text: string;
  selected: boolean;
}
interface IProps {
  initValue?: IFormInput;
  initPrice?: PriceProps[];
  variantSelection?: VariantSelection[];
  isEdit?: boolean;
  productId: string;
}

function ProductForm({
  initValue,
  initPrice = [],
  variantSelection = [],
  isEdit,
  productId,
}: IProps) {
  const { register, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: initValue,
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [variants, setVariants] =
    useState<VariantSelection[]>(variantSelection);
  const [price, setPrice] = useState<PriceProps[]>(initPrice);
  const {
    data: allVariants,
    isLoading,
    error,
  } = useSWR("get-all-variants", getAllVariants);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    startTransition(async () => {
      let fileUrl: string[] = [];

      if (!isEdit && data.images) {
        const formData = new FormData();
        formData.append("folder", "product");
        for (const image of data.images) {
          formData.append("file", image);
        }
        fileUrl = await uploadFile(formData);
      }
      console.log(fileUrl);

      const payload = isEdit
        ? {
            id: productId,
            name: data.name,
            categoryId: data.categoryId,
            desc: data.desc,
            productVariants: price,
          }
        : {
            ...data,
            images: fileUrl.shift(),
            gallery: fileUrl,
            productVariants: price,
          };
      console.log(payload);
      if (isEdit) {
        const res = await updateProduct(payload);
        console.log(res);
        if (res?.statusCode === "200") {
          router.push("/product");
        }
      } else {
        const res = await createNewProduct(payload);
        console.log(res);
      }
      reset();
      setPrice([]);
    });
  };
  const setPriceForVariantItem = (variantId: string, price: number) => {
    setPrice((pre) => {
      const updated = [...pre];
      const index = updated.findIndex((item) => item.variantId === variantId);
      if (index !== -1) {
        updated[index].price = price;
      } else {
        updated.push({ variantId, price });
      }
      return updated;
    });
  };
  const removePriceByVariantId = (variantId: string) => {
    setPrice((pre) => pre.filter((item) => item.variantId !== variantId));
  };
  useEffect(() => {
    if (allVariants) {
      setVariants(
        allVariants.data.map((item: any) => ({
          value: item.id,
          text: item.variantValue,
          selected: variantSelection.some((v) => v.value === item.id),
        })),
      );
    }
  }, [allVariants]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <Button>
          <Link href="/product">Quay lại</Link>
        </Button>
        <h3 className="font-medium text-black dark:text-white">
          Thêm sản phẩm
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <div className="w-full">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Product Name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter product name"
                required
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            {/* <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Price <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                required
                placeholder="Enter price"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div> */}

            {/* <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Stock <span className="text-meta-1">*</span>
              </label>
              <input
                {...register("stock", { required: true })}
                type="number"
                required
                placeholder="Enter unit stock"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div> */}
          </div>

          <CategorySelect
            register={{ ...register("categoryId", { required: true }) }}
            initCategory={initValue?.categoryId}
          />
          <SizeSelect
            id="multiSelect"
            variants={variants}
            setPrice={setPriceForVariantItem}
            price={price}
            removePriceByVariantId={removePriceByVariantId}
          />
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Description
            </label>
            <textarea
              {...register("desc")}
              rows={6}
              placeholder="Product Description"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>

          {!isEdit && (
            <FileUpload
              register={{ ...register("images", { required: true }) }}
            />
          )}

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : isEdit ? (
              "Save"
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
