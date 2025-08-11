"use server"

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe"

import { db } from "@/db";
import { orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {type CreateCheckoutSessionSchema,createCheckoutSessionSchema } from "./schema"

export const createCheckoutSession = async (data: CreateCheckoutSessionSchema) => {

  if(!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error("missing keys")
  }

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized")
  }
  const { orderId } = createCheckoutSessionSchema.parse(data);
  
  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: {
        with: {
          product: true
        }
      }
    }
  })

  const order = await db.query.orderTable.findFirst({
    where: eq(orderTable.id, orderId)
  })

  if (!order) {
    throw new Error("Order not found")
  }

  if (order.userId !== session.user.id) {
    throw new Error("Unauthorized")
  }


  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: { orderId },
    line_items: orderItems.map(orderItem => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: `${orderItem.productVariant.product.name} - ${orderItem.productVariant.name}`,
            description: orderItem.productVariant.product.description,
            images: [orderItem.productVariant.imageUrl]
          },
          unit_amount: orderItem.priceInCents // in cents brl
        },
        quantity: orderItem.quantity
      }
    })
  });

  return checkoutSession
}