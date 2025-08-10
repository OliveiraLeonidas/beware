import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addShippingAddress } from "@/actions/add-shipping-address";
import type { AddShippingAddressInput } from "@/actions/add-shipping-address/schema";

export const getAddShippingAddressMutationKey = () => ["add-shipping-address"] as const;

export function useAddShippingAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getAddShippingAddressMutationKey(),
    mutationFn: async (data: AddShippingAddressInput) => {
      return addShippingAddress(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getAddShippingAddressMutationKey() });
    },
  });
}
