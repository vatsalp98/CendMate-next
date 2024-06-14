/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { formatCurrency, numberRegex } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function ExchangeRateTable() {
  const { data: user, isLoading: userLoading } = api.user.getUserDb.useQuery();

  const { data: rateData } = api.exchange.getExchangeRates.useQuery();

  const exchangeRateSchema = z.object({
    EUR: z.string().regex(numberRegex, {
      message: "Invalid exchange rate",
    }),
    GHS: z.string().regex(numberRegex, {
      message: "Invalid exchange rate",
    }),
    GBP: z.string().regex(numberRegex, {
      message: "Invalid exchange rate",
    }),
    KES: z.string().regex(numberRegex, {
      message: "Invalid exchange rate",
    }),
    NGN: z.string().regex(numberRegex, {
      message: "Invalid exchange rate",
    }),
    TZS: z.string().regex(numberRegex, {
      message: "Invalid exchange rate",
    }),
  });

  type TExchangeRateValues = z.infer<typeof exchangeRateSchema>;

  const exchangeMutation = api.exchange.createExchangeRate.useMutation({
    onSuccess: (data) => {
      form.reset();
    },
  });

  const form = useForm<TExchangeRateValues>({
    resolver: zodResolver(exchangeRateSchema),
    mode: "onChange",
    defaultValues: {
      EUR: "0.93",
      GBP: "0.78",
      GHS: "15.03",
      KES: "128.99",
      NGN: "1514.75",
      TZS: "2609.05",
    },
  });

  const formSubmit = (values: TExchangeRateValues) => {
    const filteredValues = (
      Object.keys(form.formState.dirtyFields) as Array<
        keyof TExchangeRateValues
      >
    ).map((value) => ({
      currency: value,
      rate: values[value],
    }));
    exchangeMutation.mutate(filteredValues);
  };

  if (userLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="flex w-full flex-row justify-between">
        <h2 className="font-bold">Currency</h2>
        <div className="mb-2 flex w-1/3 flex-row items-center justify-center">
          <h2 className="flex flex-1 flex-row items-center justify-center font-bold">
            Rate
          </h2>
        </div>
      </div>
      <Separator className="mb-3 mt-1" />
      <div className="mb-2 flex w-full flex-row items-center justify-between">
        <h3 className="text-md font-semibold">United States Dollar (USD)</h3>
        <div className="flex w-1/3 flex-row items-center justify-end gap-2">
          <Input value={formatCurrency("USD", 1)} disabled />
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formSubmit)}
          className="flex flex-col gap-2"
          id="exchange-form"
        >
          <FormField
            name="EUR"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <FormLabel>Euro (EUR)</FormLabel>
                <div className="flex w-1/3 flex-col items-end justify-end gap-1">
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="GBP"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <FormLabel>Great British Pound (GBP)</FormLabel>
                <div className="flex w-1/3 flex-col items-end justify-end gap-1">
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="NGN"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <FormLabel>Nigerian Naira (NGN)</FormLabel>
                <div className="flex w-1/3 flex-col items-end justify-end gap-1">
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="GHS"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <FormLabel>Ghanean Cedis (GHS)</FormLabel>
                <div className="flex w-1/3 flex-col items-end justify-end gap-1">
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="KES"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <FormLabel>Kenyan Shilling (KES)</FormLabel>
                <div className="flex w-1/3 flex-col items-end justify-end gap-1">
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="TZS"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <FormLabel>Tanzanian Shilling (TZS)</FormLabel>
                <div className="flex w-1/3 flex-col items-end justify-end gap-1">
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Separator className="mb-2 mt-3" />
      <div className="text-sm font-semibold text-muted-foreground">
        All exchange rates are in USD.
      </div>

      {user?.role === "ADMIN" && (
        <div className="mt-5 flex w-full flex-row justify-end gap-2">
          <Button variant={"secondary"} disabled={!form.formState.isDirty}>
            Cancel
          </Button>
          <Button
            form="exchange-form"
            type="submit"
            className="gap-1"
            variant={"outline"}
            disabled={!form.formState.isDirty}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
