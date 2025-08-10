"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { type AddShippingAddressInput,addShippingAddressSchema } from "./schema";

export async function addShippingAddress(input: AddShippingAddressInput) {
    const session = await auth.api.getSession({
      headers: await headers()
    })
  if (!session?.user?.id) {
    throw new Error("Você precisa estar logado para adicionar um endereço");
  }

  const validatedFields = addShippingAddressSchema.safeParse(input);
  if (!validatedFields.success) {
    throw new Error("Dados inválidos");
  }

  const {
    address,
    cep,
    city,
    complement,
    cpf,
    email,
    fullName,
    neighborhood,
    number,
    phone,
    state,
  } = validatedFields.data;

  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: fullName,
      address,
      street: address,
      number,
      complement,
      city,
      state,
      neighborhood,
      zipCode: cep,
      country: "BR",
      phone,
      email,
      cpfOrCnpj: cpf,
    })
    .returning();

  return shippingAddress;
}
