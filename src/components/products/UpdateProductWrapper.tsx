"use client";
import { useCakeStore } from "@/store/CakeStore";
import { useSearchParams } from "next/navigation";
import ProductForm, {
  IFormInput,
  PriceProps,
  VariantSelection,
} from "./ProductForm";

function UpdateProductWrapper() {
  const productId = useSearchParams().get("id");
  const productData = useCakeStore((state) => state.productData);
  const updateProduct = productData.find(
    (data) => data.product.id === productId,
  );

  const initValue: IFormInput = {
    categoryId: updateProduct?.categoryId as string,
    desc: updateProduct?.product.description as string,
    name: updateProduct?.product.name as string,
    images: [],
  };
  const initPrice: PriceProps[] = updateProduct?.product.productVariants.map(
    (item) => ({
      price: item.price,
      variantId: item.variant.id,
    }),
  ) as PriceProps[];
  const initVariant: VariantSelection[] =
    updateProduct?.product.productVariants.map((item) => ({
      selected: true,
      text: item.variant.variantValue,
      value: item.variant.id,
    })) as VariantSelection[];
  return (
    <div>
      <ProductForm
        initValue={initValue}
        initPrice={initPrice}
        variantSelection={initVariant}
        isEdit={true}
        productId={updateProduct?.product.id as string}
      />
    </div>
  );
}

export default UpdateProductWrapper;
