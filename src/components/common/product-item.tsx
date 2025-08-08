import Image from "next/image";
import Link from "next/link";

import type { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  containerClassName?: string;
}
export const ProductItem = ({
  product,
  containerClassName,
}: ProductItemProps) => {
  const firstVariant = product.variants[0];

  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        src={firstVariant.imageUrl}
        width={0}
        height={0}
        sizes="100vw"
        alt={firstVariant.name}
        className="h-auto w-full rounded-3xl"
      />
      <div
        className={cn("flex max-w-[200px] flex-col gap-1", containerClassName)}
      >
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
