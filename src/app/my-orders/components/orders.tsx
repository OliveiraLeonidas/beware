"use client";

import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCentsToBRL } from "@/helpers/money";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: string;
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="space-y-2 px-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible className="py-0">
              <AccordionItem value="item-1 p-0">
                {order.status === "paid" && (
                  <Badge className="bg-green-600/90 text-xs">Pago</Badge>
                )}
                {order.status === "pending" && (
                  <Badge className="bg-red-500/90 text-xs">Pendente</Badge>
                )}
                <AccordionTrigger className="cursor-pointer p-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm">Pedido feito em: </p>
                    <p>
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-0">
                  {order.items.map((product) => (
                    <div
                      className="my-2 flex items-center justify-between gap-2"
                      key={product.id}
                    >
                      <div className="w-30">
                        <Image
                          width={90}
                          height={90}
                          src={product.imageUrl}
                          alt={product.productName}
                          className="h-full w-full rounded-xl"
                        />
                      </div>

                      <div className="w-full">
                        <p className="text-sm font-semibold">
                          {product.productName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          <span className="font-semibold text-slate-900">
                            cor:{" "}
                          </span>
                          {product.productVariantName}
                        </p>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            <span className="font-semibold text-slate-900">
                              Quantidade:{" "}
                            </span>
                            {product.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="">
                        <p className="font-bold">
                          {formatCentsToBRL(product.priceInCents)}{" "}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Subtotal</p>
                      <p className="text-xs font-medium">
                        {formatCentsToBRL(order.totalPriceInCents)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Frete</p>
                      <p className="text-muted-foreground text-xs">GRÁTIS</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-xs font-medium">
                        {formatCentsToBRL(order.totalPriceInCents)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
