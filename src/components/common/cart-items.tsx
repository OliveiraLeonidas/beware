import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  // const [quantity, setQuantity] = useState<number>(1);

  // const handleIncrement = () => {
  //   setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
  // };

  // const handleDecrement = () => {
  //   setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  // };
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex w-full items-center gap-4">
        <div>
          <Image
            width={86}
            height={86}
            src={productVariantImageUrl}
            alt={productVariantName}
            className="h-full w-full rounded-xl border border-red-600"
          />
        </div>

        <div className="flex flex-col p-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs">{productVariantName}</p>

          <div className="mt-3 flex h-[40px] w-[134px] items-center justify-between rounded-lg">
            <Button variant={"ghost"} onClick={() => {}}>
              <TrashIcon />
            </Button>
            <Button variant={"ghost"} onClick={() => {}}>
              <MinusIcon />
            </Button>
            <p className="px-2 text-xs">{quantity}</p>
            <Button variant={"ghost"} onClick={() => {}}>
              <PlusIcon />
            </Button>
          </div>
        </div>

        <div className="self-end">
          <p className="w-3 font-bold">
            {formatCentsToBRL(productVariantPriceInCents)}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
