import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProductQuantityMutation } from "@/hooks/mutations/use-decrease-cart-product-quantity";
import { useIncreaseCartProductQuantityMutation } from "@/hooks/mutations/use-increase-cart-product-quantity";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation =
    useDecreaseCartProductQuantityMutation(id);
  const increaseCartProductQuantityMutation =
    useIncreaseCartProductQuantityMutation(productVariantId);

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho");
      },
      onError: () => {
        toast.error("Erro ao remover produto");
      },
    });
  };

  const handleDecreaseClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto diminuida.");
      },
    });
  };

  const handleIncreaseClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto adicionado.");
      },
    });
  };

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
            <Button variant={"ghost"} onClick={handleDeleteClick}>
              <TrashIcon />
            </Button>
            <Button variant={"ghost"} onClick={handleDecreaseClick}>
              <MinusIcon />
            </Button>
            <p className="px-2 text-xs">{quantity}</p>
            <Button variant={"ghost"} onClick={handleIncreaseClick}>
              <PlusIcon />
            </Button>
          </div>
        </div>

        <div className="self-end">
          <p className="font-bold">
            {formatCentsToBRL(productVariantPriceInCents)}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
