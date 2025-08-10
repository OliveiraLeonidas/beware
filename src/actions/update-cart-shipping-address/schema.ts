import { z } from 'zod'

export const updateCartShippingAddressSchema = z.object({
  shippingAddressId: z.string(),
})

export type UpdateCartShippingAddressType = z.infer<typeof updateCartShippingAddressSchema>
