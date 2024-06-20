import { zodResolver } from "@hookform/resolvers/zod";
import type { ExchangeRate } from "@prisma/client";
import { Loader2, Save } from "lucide-react";
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

interface ExchangeFormProps {
  exchangeRates: ExchangeRate[];
}

export default function ExchangeForm({ exchangeRates }: ExchangeFormProps) {
  const exchangeRateSchema = z.object({
    EUR: z.string().regex(numberRegex, {
      message: "Invalid exchange rate",
    }),
    CAD: z.string().regex(numberRegex, {
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
    onSuccess: () => {
      form.reset();
    },
  });

  const form = useForm<TExchangeRateValues>({
    resolver: zodResolver(exchangeRateSchema),
    mode: "onChange",
    defaultValues: {
      EUR: exchangeRates
        .find((item) => item.currency === "EUR")
        ?.marketRate.toString(),
      CAD: exchangeRates
        .find((item) => item.currency === "CAD")
        ?.marketRate.toString(),
      GBP: exchangeRates
        .find((item) => item.currency === "GBP")
        ?.marketRate.toString(),
      GHS: exchangeRates
        .find((item) => item.currency === "GHS")
        ?.marketRate.toString(),
      KES: exchangeRates
        .find((item) => item.currency === "KES")
        ?.marketRate.toString(),
      NGN: exchangeRates
        .find((item) => item.currency === "NGN")
        ?.marketRate.toString(),
      TZS: exchangeRates
        .find((item) => item.currency === "TZS")
        ?.marketRate.toString(),
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
  return (
    <>
      <div className="mb-2 flex w-full flex-row items-center justify-between">
        <h3 className="text-md font-semibold">United States Dollar (USD)</h3>
        <div className="flex w-1/4 flex-row items-center justify-end gap-2">
          <Input value={formatCurrency("USD", "1")} disabled />
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
                <div className="flex w-1/4 flex-col items-end justify-end gap-1">
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="CAD"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <FormLabel>Canadian Dollars (CAD)</FormLabel>
                <div className="flex w-1/4 flex-col items-end justify-end gap-1">
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
                <div className="flex w-1/4 flex-col items-end justify-end gap-1">
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
                <div className="flex w-1/4 flex-col items-end justify-end gap-1">
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
                <div className="flex w-1/4 flex-col items-end justify-end gap-1">
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
                <div className="flex w-1/4 flex-col items-end justify-end gap-1">
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
                <div className="flex w-1/4 flex-col items-end justify-end gap-1">
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
      <div className="mb-3 flex flex-row items-center justify-between text-sm font-semibold text-muted-foreground">
        <span>All exchange rates are in USD.</span>
        <span>
          Last Updated: {new Date(exchangeRates[0]!.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="mt-2 flex flex-row items-center justify-end gap-2">
        {form.formState.isDirty && (
          <Button variant={"secondary"} onClick={() => form.reset()}>
            Cancel
          </Button>
        )}
        <Button
          form="exchange-form"
          className="gap-1"
          disabled={!form.formState.isDirty || exchangeMutation.isPending}
        >
          {exchangeMutation.isPending ? (
            <Loader2 />
          ) : (
            <>
              <Save />
              Save
            </>
          )}
        </Button>
      </div>
    </>
  );
}
