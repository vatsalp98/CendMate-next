import { zodResolver } from "@hookform/resolvers/zod";
import type { ExchangeRate, Wallet } from "@prisma/client";

import { ArrowRight } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { conversionCurrencies } from "~/lib/utils";

interface ConvertFormProps {
  currency: string;
  exchangeRates: ExchangeRate[];
  fromRate: ExchangeRate;
  wallets: Wallet[];
  setFromAmount: (value: string) => void;
  setToAmount: (value: string) => void;
  setToCurrency: (value: string) => void;
  toCurrency: string;
  setStep: (value: string) => void;
  setToRate: (value: number) => void;
}

export default function ConvertForm({
  currency,
  exchangeRates,
  fromRate,
  wallets,
  setFromAmount,
  setToAmount,
  setToCurrency,
  toCurrency,
  setStep,
  setToRate,
}: ConvertFormProps) {
  const [sendAmountDisabled, setSendAmountDisabled] = useState(true);
  const convertFormSchema = z.object({
    from_currency: z.string(),
    to_currency: z.string(),
    send_amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
    receive_amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
  });
  type TConvertFormValues = z.infer<typeof convertFormSchema>;

  const form = useForm<TConvertFormValues>({
    resolver: zodResolver(convertFormSchema),
    defaultValues: {
      from_currency: currency,
    },
    mode: "onChange",
  });

  const onSubmit = (values: TConvertFormValues) => {
    setToCurrency(values.to_currency);
    setFromAmount(values.send_amount);
    setToAmount(values.receive_amount);
    setStep("final");
  };

  const onCurrencySelect = (value: string) => {
    const exchangeRate = exchangeRates.find((item) => item.currency === value);
    if (!exchangeRate) {
      toast.error("Invalid currency selected");
      return null;
    }
    form.setValue("to_currency", value);
    if (value === "USD") {
      setToRate(fromRate.marketRate);
    } else {
      const toRate = (1 / exchangeRate.marketRate) * fromRate.marketRate;
      setToRate(toRate);
    }
    setToCurrency(value);
    setSendAmountDisabled(false);
  };

  const onAmountChange = (value: string) => {
    form.setValue("send_amount", value);
    const fromRate = exchangeRates.find(
      (item) => item.currency === currency,
    )?.marketRate;

    if (toCurrency === "USD") {
      const amountInUSD = (parseFloat(value) / fromRate!) * 0.98;
      form.setValue("receive_amount", amountInUSD.toFixed(2));
    } else {
      const toRate = exchangeRates.find(
        (item) => item.currency === toCurrency,
      )?.marketRate;
      const amountInUSD = parseFloat(value) / fromRate!;
      const converted = amountInUSD * toRate! * 0.98;
      form.setValue("receive_amount", converted.toFixed(2));
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="exchange-form">
          <div className="flex flex-row items-center gap-4">
            <FormField
              name="from_currency"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>From Currency</FormLabel>
                  <FormControl>
                    <Input {...field} disabled value={currency} />
                  </FormControl>
                </FormItem>
              )}
            />
            <ArrowRight className="mt-6 text-primary" />
            <FormField
              name="to_currency"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>To Currency</FormLabel>
                  <Select value={field.value} onValueChange={onCurrencySelect}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {conversionCurrencies(currency, wallets).map((item) => (
                        <SelectItem key={item.id} value={item.currency}>
                          {item.currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-2 flex flex-row items-center gap-4">
            <FormField
              name="send_amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>From Amount</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => onAmountChange(e.target.value)}
                      value={field.value}
                      placeholder="0.00"
                      disabled={sendAmountDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ArrowRight className="mt-6 text-primary" />
            <FormField
              name="receive_amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Receiving Amount</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0.00" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="mt-2 flex flex-row items-center justify-between px-2 text-sm font-semibold text-muted-foreground">
        <div>
          1 USD = {fromRate.marketRate} {currency}
        </div>
        <div>Last Updated: {new Date(fromRate.createdAt).toLocaleString()}</div>
      </div>
      <div className="mt-2 flex flex-row justify-end text-sm italic text-muted-foreground">
        Please note a 2% fee will be applied to the conversion.
      </div>
    </>
  );
}
