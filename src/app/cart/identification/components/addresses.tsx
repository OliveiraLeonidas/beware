"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useAddShippingAddress } from "@/hooks/mutations/use-add-shipping-address";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import { useShippingAddresses } from "@/hooks/queries/use-shipping-addresses";

const formSchema = z.object({
  email: z.email("Email inválido"),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  cpf: z.string().min(14, "CPF inválido"),
  phone: z.string().min(1, "Celular é obrigatório"),
  cep: z.string().min(8, "CEP é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z
    .string()
    .min(2, "Estado é obrigatório")
    .max(2, "Use a sigla do estado"),
});

type FormValues = z.infer<typeof formSchema>;

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null;
}

const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );
  const { data: addresses, isLoading: isLoadingAddresses } =
    useShippingAddresses({ initialData: shippingAddresses });
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const addShippingAddressMutation = useAddShippingAddress();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await addShippingAddressMutation.mutateAsync(data);
      toast.success("Endereço adicionado com sucesso!");

      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: result.id,
      });
      form.reset();
      setSelectedAddress(null);
    } catch (error) {
      toast.error("Erro ao adicionar endereço. Tente novamente.");
      console.error(error);
    }
  };

  const handleGoToPayment = async () => {
    if (!selectedAddress || selectedAddress === "add_new") return;

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });
      router.push("/cart/confirmation");
    } catch (error) {
      toast.error("Erro ao adicionar endereço. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>Identificação</CardTitle>
        </CardHeader>

        <CardContent>
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            {isLoadingAddresses ? (
              <div className="text-muted-foreground text-sm">
                Carregando endereços...
              </div>
            ) : addresses && addresses.length > 0 ? (
              <>
                {addresses.map((address) => (
                  <Card key={address.id} className="mb-2">
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          className="cursor-pointer"
                          value={address.id}
                          id={address.id}
                        />
                        <Label
                          htmlFor={address.id}
                          className="flex w-full flex-col items-start"
                        >
                          <p className="text-xs font-semibold">
                            {address.recipientName}
                            {address.street}, {address.number}
                            {address.complement
                              ? `, ${address.complement}`
                              : ""}
                            - {address.neighborhood}
                            {address.city} - {address.state}, {address.zipCode}
                          </p>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : null}

            <Card className="mb-2">
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="cursor-pointer"
                    value="add_new"
                    id="add_new"
                  />
                  <Label htmlFor="add_new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>

          {selectedAddress && selectedAddress !== "add_new" && (
            <Button
              onClick={handleGoToPayment}
              className="mt-4 w-full cursor-pointer"
              disabled={updateCartShippingAddressMutation.isPending}
            >
              {updateCartShippingAddressMutation.isPending
                ? "Processando..."
                : "Ir para pagamento"}
            </Button>
          )}

          {selectedAddress === "add_new" && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu nome completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <PatternFormat
                          customInput={Input}
                          format="###.###.###-##"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="000.000.000-00"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular</FormLabel>
                      <FormControl>
                        <PatternFormat
                          customInput={Input}
                          format="(##) #####-####"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="(00) 00000-0000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <PatternFormat
                          customInput={Input}
                          format="#####-###"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="00000-000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu endereço" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input placeholder="Nº" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input placeholder="Apto, Bloco, etc" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite sua cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="UF" maxLength={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={addShippingAddressMutation.isPending}
                >
                  {addShippingAddressMutation.isPending
                    ? "Salvando..."
                    : "Salvar endereço"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Addresses;
