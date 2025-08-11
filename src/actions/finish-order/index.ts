"use server"

import { eq } from "drizzle-orm"
import { headers } from "next/headers"

import { db } from "@/db"
import { cartItemTable, cartTable, orderItemTable, orderTable } from "@/db/schema"
import { auth } from "@/lib/auth"

export const finishOrder = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: true
        }
      }
    }
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

if (!cart.shippingAddress) {
    throw new Error("Cart not found");
  }

  const totalPriceInCents = cart.items.reduce((acc, item) => acc + item.productVariant.priceInCents * item.quantity, 0)

  let orderId: string | undefined;
  await db.transaction(async (tx) => {
    console.log("iniciou transaction")
    if (!cart.shippingAddress) {
      throw new Error("Shipping address not found")
    }
    console.log("carrinho existe...")
     const [order] = await tx.insert(orderTable).values({
      email: cart.shippingAddress.email,
      zipCode: cart.shippingAddress.zipCode,
      country: cart.shippingAddress.country,
      phone: cart.shippingAddress.phone,
      cpfOrCnpj: cart.shippingAddress.cpfOrCnpj,
      city: cart.shippingAddress.city,
      complement: cart.shippingAddress.complement,
      neighborhood: cart.shippingAddress.neighborhood,
      number: cart.shippingAddress.number,
      recipientName: cart.shippingAddress.recipientName,
      state: cart.shippingAddress.state,
      street: cart.shippingAddress.street,
      userId: session.user.id,
      totalPriceInCents,
      shippingAddressId: cart.shippingAddress!.id
  }).returning();
  if (!order) {
    console.log("Não criou o pedido")
    throw new Error("Failed to create order")
  }
console.log("criou o pedido")
  const orderItemsPayload: Array<typeof orderItemTable.$inferInsert> = cart.items.map((item) => ({
      orderId: order.id,
      productVariantId: item.productVariant.id,
      quantity: item.quantity,
      priceInCents: item.productVariant.priceInCents
    }))

    orderId = order.id;
  console.log("criou os items do pedido")
  await tx.insert(orderItemTable).values(orderItemsPayload)
  await tx.delete(cartTable).where(eq(cartTable.id, cart.id))
  await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id))
  console.log("Foi deletado com sucesso")
  })

  return {
    orderId
  }
}