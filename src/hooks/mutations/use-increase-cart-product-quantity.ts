
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-products";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getIncreaseCartProductQuantityMutationQueryKey = (productVariantId: string)  => ["addProductToCart", productVariantId] as const;


export const useIncreaseCartProductQuantityMutation = (productVariantId: string) => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getIncreaseCartProductQuantityMutationQueryKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
}



