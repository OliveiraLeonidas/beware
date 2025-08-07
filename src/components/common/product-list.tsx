"use client";

import { productTable, productVariantTable } from "@/db/schema";

import { ProductItem } from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="px-4 text-sm font-semibold md:text-xl">{title}</h3>
      <div className="flex w-full gap-4 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
