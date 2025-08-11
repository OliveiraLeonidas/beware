"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false);

  const handleFinishOrder = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("publishable key  is missing");
    }
    const { orderId } = await finishOrderMutation.mutateAsync();

    if (!orderId) {
      throw new Error("Order not found");
    }

    const checkoutSession = await createCheckoutSession({
      orderId,
    });

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Failed to load Stripe");
    }

    await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    setSuccessDialogIsOpen(true);
  };

  return (
    <>
      <Button
        className="w-full cursor-pointer rounded-full"
        disabled={finishOrderMutation.isPending}
        onClick={handleFinishOrder}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finalizar compra
      </Button>

      <Dialog open={successDialogIsOpen} onOpenChange={setSuccessDialogIsOpen}>
        <DialogContent className="text-center">
          <Image
            alt="success"
            src="/illustration.svg"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Pedido efetuado!</DialogTitle>
          <DialogDescription>
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de &quot;Meus Pedidos&quot;.
          </DialogDescription>

          <DialogFooter>
            <Button className="rouded-full" size="lg">
              Ver meus pedidos
            </Button>
            <Button
              asChild
              className="rouded-full"
              size="lg"
              variant={"outline"}
            >
              <Link href={"/"}>Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
