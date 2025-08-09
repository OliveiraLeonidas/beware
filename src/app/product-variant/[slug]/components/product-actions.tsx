"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-product-to-cart";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };
  return (
    <>
      <div className="mb-8">
        <div className="space-y-4">
          <h3>Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button variant={"ghost"} onClick={() => handleDecrement()}>
              <MinusIcon />
            </Button>
            <p className="px-2">{quantity}</p>
            <Button variant={"ghost"} onClick={() => handleIncrement()}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button size="lg" className="rounded-full font-semibold">
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
