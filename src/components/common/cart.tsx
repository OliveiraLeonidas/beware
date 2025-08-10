"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { getCart } from "@/actions/get-cart";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-items";

// Client side fetching

const Cart = () => {
  // TODO: Refact component
  // TODO: handle cart listing when logout
  const { data: cart } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col px-4 pb-4">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full w-full">
              {cart?.items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  productVariantId={item.productVariant.id}
                  productName={item.productVariant.product.name}
                  productVariantName={item.productVariant.name}
                  productVariantImageUrl={item.productVariant.imageUrl}
                  productVariantPriceInCents={item.productVariant.priceInCents}
                  quantity={item.quantity}
                />
              ))}
            </ScrollArea>
          </div>

          {cart?.items && cart.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Entrega</p>
                <p className="uppercase">Grátis</p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-xs font-medium">
                <p>Total</p>
                <p className="uppercase">
                  {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
                </p>
              </div>
              <Separator />
              <Button size={"lg"} className="rounded-full">
                <Link href="/cart/identification">Finalizar a compra</Link>
              </Button>
              <Separator />
              <Button
                size={"lg"}
                variant={"outline"}
                className="rounded-full underline"
              >
                continuar comprando
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
