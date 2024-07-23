import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductForm from "@/components/products/ProductForm";

function ProductListPage() {
  return (
    <DefaultLayout>
      <ProductForm productId={""} />
    </DefaultLayout>
  );
}

export default ProductListPage;
