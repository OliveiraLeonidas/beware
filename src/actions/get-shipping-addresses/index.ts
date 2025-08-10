"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getShippingAddresses() {
  const session = await auth.api.getSession( {
    headers: await headers()
  });
  
  if (!session?.user?.id) {
    throw new Error("Você precisa estar logado para ver seus endereços");
  }

  const addresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
    orderBy: (addresses) => [addresses.createdAt],
  });

  return addresses;
}
