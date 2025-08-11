import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { finishOrder } from "@/actions/finish-order"

import { getUseCartQueryKey } from "../queries/use-cart"

export const getUseFinishOrderMutationKey = () => ["finish-order"]

export const useFinishOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: getUseFinishOrderMutationKey(),
    mutationFn: async () => {
      finishOrder()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() })
      toast.success("Compra finalizada com sucesso", { position: "top-center" })
    }
  })
}