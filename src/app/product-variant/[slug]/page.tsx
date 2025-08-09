import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import VariantSelector from "@/app/product-variant/[slug]/components/variant-selector";
import Footer from "@/components/common/footer";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) return notFound();

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <div className="mt-6 mb-6 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2 px-4">
          <Image
            src={productVariant?.imageUrl}
            alt={productVariant?.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full rounded-3xl object-cover"
          />

          <div className="">
            <VariantSelector
              selectedVariant={productVariant.slug}
              variants={productVariant.product.variants}
            />
          </div>
          <div className="">
            <h2 className="text-lg font-semibold">
              {productVariant?.product.name}
            </h2>
            <h3 className="text-muted-foreground text-sm">
              {productVariant?.name}
            </h3>
            <h3 className="text-lg font-semibold">
              {formatCentsToBRL(productVariant?.priceInCents)}
            </h3>
          </div>
          <ProductActions productVariantId={productVariant.id} />
          <div className="">
            <p className="text-shadow-amber-600">
              {productVariant?.product?.description}
            </p>
          </div>
        </div>
        <ProductList title="Talvez você goste" products={likelyProducts} />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
