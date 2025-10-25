import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import cart from "@/components/common/cart";
import Footer from "@/components/common/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { formatAddress } from "@/helpers/address";
import { auth } from "@/lib/auth";

import CartSummary from "../cart/components/cart-summary";
import FinishOrderButton from "../cart/confirmation/components/finish-order-button";
import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/authentication");
  }

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <Orders
        orders={orders.map((order) => ({
          id: order.id,
          totalPriceInCents: order.totalPriceInCents,
          status: order.status,
          createdAt: order.createdAt,
          items: order.items.map((item) => ({
            id: item.orderId,
            imageUrl: item.productVariant.imageUrl,
            productName: item.productVariant.product.name,
            productVariantName: item.productVariant.name,
            priceInCents: item.priceInCents,
            quantity: item.quantity,
          })),
        }))}
      />
      <Footer />
    </div>
  );
};

export default MyOrdersPage;
