"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
// TODO: nuqs para utilizar urlState com a quantidade
const QuantitySelector = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prev) => (prev < 99 ? prev + 1 : prev));
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
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
    </>
  );
};

export default QuantitySelector;
