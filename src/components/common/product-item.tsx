import Image from "next/image";
import Link from "next/link";

import type { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}
export const ProductItem = ({ product }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  console.log({
    firstVariant,
  });

  return (
    <Link href={"/"} className="flex flex-col gap-4">
      <Image
        src={firstVariant.imageUrl}
        width={150}
        height={150}
        alt={firstVariant.name}
        className="rounded-3xl object-cover"
      />
      <div className="flex max-w-[150px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-sm font-medium">
          {product.description}
        </p>
        <p className="text-muted-foreground truncate text-sm font-medium">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};
