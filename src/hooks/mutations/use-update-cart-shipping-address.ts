import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateCartShippingAddress } from '@/actions/update-cart-shipping-address'
import { type UpdateCartShippingAddressType } from '@/actions/update-cart-shipping-address/schema'

import { getUseCartQueryKey } from '../queries/use-cart'


export const getUpdateCartShippingAddressMutationKey = () => ["update-cart-shipping-address"]

export function useUpdateCartShippingAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    mutationFn: async (data: UpdateCartShippingAddressType) => updateCartShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() })
    },
    onError: () => {
      toast.error('Erro ao atualizar o endereço de entrega')
    },
  })
}
