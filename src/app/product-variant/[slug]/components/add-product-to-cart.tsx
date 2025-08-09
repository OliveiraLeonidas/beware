"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { addProductToCart } from "@/actions/add-cart-products";
import { Button } from "@/components/ui/button";

interface AddCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddCartButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <Button
      size="lg"
      variant="outline"
      className="rounded-full font-semibold"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="mr-1 animate-spin" />}
      Adicionar ao carrinho
    </Button>
  );
};

export default AddToCartButton;
