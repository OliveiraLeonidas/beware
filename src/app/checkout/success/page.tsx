"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutSuccessPage = () => {
  return (
    <div>
      <Dialog open={true}>
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
    </div>
  );
};

export default CheckoutSuccessPage;
