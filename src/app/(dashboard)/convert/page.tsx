"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftRightIcon, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
import {
  conversionCurrencies,
  formatMoney,
  getCurrencySymbol,
} from "~/lib/utils";
import { api } from "~/trpc/react";

export default function ConvertPage() {
  const { data: wallets } = api.wallet.getWallets.useQuery();
  const { data: ratesToUSD } = api.exchange.getExchangeRates.useQuery();

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [currentStep, setCurrentStep] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

  const exchangeMutation =
    api.transactions.createTransferTransaction.useMutation({
      onSuccess: () => {
        toast.success("Your amount has been converted.");
        setCurrentStep(2);
      },
    });

  const convertFormSchema = z.object({
    from_currency: z.string(),
    to_currency: z.string(),
    from_amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
    to_amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
  });
  type TConvertFormValues = z.infer<typeof convertFormSchema>;

  const convertForm = useForm<TConvertFormValues>({
    resolver: zodResolver(convertFormSchema),
    mode: "onChange",
  });

  const onSubmit = (values: TConvertFormValues) => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      console.log("VALUES", values);
    }
  };

  function convert(fromCurrency: string, toCurrency: string, amount: number) {
    if (ratesToUSD === undefined) {
      throw new Error(`Rates to USD Null`);
    }

    const fromRate = ratesToUSD[fromCurrency]?.rate;
    const toRate = ratesToUSD[toCurrency]?.rate;

    if (fromRate == null || toRate == null) {
      throw new Error(
        `Exchange rate for ${fromCurrency} or ${toCurrency} is missing.`,
      );
    }

    if (fromCurrency === "USD") {
      const result = amount * toRate;
      convertForm.setValue("to_amount", formatMoney(result));
      setConversionRate(toRate);
    } else if (toCurrency === "USD") {
      const result = amount / fromRate;
      setConversionRate(1 / fromRate);
      convertForm.setValue("to_amount", formatMoney(result));
    } else {
      const amountInUSD = amount / fromRate;
      const result = amountInUSD * toRate;
      setConversionRate(toRate / fromRate);
      convertForm.setValue("to_amount", formatMoney(result));
    }
  }

  if (wallets)
    return (
      <>
        <MaxWidthWrapper>
          <div className="my-6">
            <div>
              <h2 className="text-2xl font-semibold">Convert Currency</h2>
              <span className="text-lg text-muted-foreground">
                Convert currency between your existing wallets.
              </span>
            </div>
          </div>
          <div>
            {currentStep === 2 && (
              <Card>
                <CardHeader className="flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-14 w-14 text-green-500" />
                  <CardTitle>Transfer Complete</CardTitle>
                  <CardDescription>
                    You can check your wallets for the new balances.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-row items-center justify-center gap-2 text-center">
                  <Button
                    variant={"secondary"}
                    className="flex-1"
                    onClick={() => setCurrentStep(0)}
                  >
                    Convert Again
                  </Button>
                  <Link
                    href="/wallets"
                    className={buttonVariants({
                      variant: "secondary",
                      className: "flex-1",
                    })}
                  >
                    View Wallets
                  </Link>
                </CardFooter>
              </Card>
            )}
            {currentStep === 1 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Confirm Details</CardTitle>
                    <CardDescription>
                      Review your transaction details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      Are you sure you want to convert{" "}
                      <strong className="text-primary">
                        {parseFloat(
                          convertForm.getValues("from_amount"),
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}{" "}
                        {fromCurrency}
                      </strong>{" "}
                      to{" "}
                      <strong className="text-primary">
                        {parseFloat(
                          convertForm.getValues("to_amount"),
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}{" "}
                        {toCurrency}
                      </strong>{" "}
                      ?
                    </div>
                    <div className="gap-1 text-sm text-muted-foreground">
                      Conversion rate is <strong>1 {toCurrency}</strong> ={" "}
                      <strong>
                        {conversionRate.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}{" "}
                        {fromCurrency}
                      </strong>
                    </div>
                  </CardContent>
                  <CardFooter className="flex w-full flex-row gap-2">
                    <Button
                      onClick={() => setCurrentStep(0)}
                      variant={"secondary"}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      disabled={exchangeMutation.isPending}
                      onClick={() => {
                        exchangeMutation.mutate({
                          from_amount: parseFloat(
                            convertForm.getValues("from_amount"),
                          ),
                          to_amount: parseFloat(
                            convertForm.getValues("to_amount"),
                          ),
                          to_currency: toCurrency,
                          from_currency: fromCurrency,
                        });
                      }}
                    >
                      {exchangeMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}
            {currentStep === 0 && (
              <Form {...convertForm}>
                <form
                  onSubmit={convertForm.handleSubmit(onSubmit)}
                  id="convert-form"
                >
                  <div className="flex w-full flex-row gap-2">
                    <div className="flex-1">
                      <FormField
                        name="from_currency"
                        control={convertForm.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>From Currency</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                setFromCurrency(value);
                                convertForm.setValue("from_currency", value);
                                convert(
                                  value,
                                  toCurrency,
                                  parseFloat(
                                    convertForm.getValues("from_amount"),
                                  ),
                                );
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {wallets.map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.currency}
                                    className="flex flex-row gap-2"
                                  >
                                    {item.currency} (
                                    {getCurrencySymbol(item.currency)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField
                        name="from_amount"
                        control={convertForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-muted-foreground sm:text-sm">
                                    {getCurrencySymbol(fromCurrency)}
                                  </span>
                                </div>
                                <Input
                                  className="pl-12"
                                  placeholder="00.00"
                                  value={field.value}
                                  onChange={(e) => {
                                    convertForm.setValue(
                                      "from_amount",
                                      e.target.value,
                                    );
                                    convert(
                                      fromCurrency,
                                      toCurrency,
                                      parseFloat(e.target.value),
                                    );
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-row gap-2">
                    <div className="flex-1">
                      <FormField
                        name="to_currency"
                        control={convertForm.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>To Currency</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                setToCurrency(value);
                                convertForm.setValue("to_currency", value);
                                convert(
                                  fromCurrency,
                                  value,
                                  parseFloat(
                                    convertForm.getValues("from_amount"),
                                  ),
                                );
                              }}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {conversionCurrencies(
                                  fromCurrency,
                                  wallets,
                                ).map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.currency}
                                    className="flex flex-row gap-2"
                                  >
                                    {item.currency} (
                                    {getCurrencySymbol(item.currency)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField
                        name="to_amount"
                        control={convertForm.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-muted-foreground sm:text-sm">
                                    {getCurrencySymbol(toCurrency)}
                                  </span>
                                </div>
                                <Input
                                  className="pl-12"
                                  placeholder="00.00"
                                  disabled
                                  value={field.value}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-10 flex w-full flex-row">
                    <Button className="flex-1 gap-2">
                      <ArrowLeftRightIcon />
                      Convert
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            {/* <div className="mt-2 flex flex-row items-center justify-between px-2 text-sm font-semibold text-muted-foreground">
              <div>
                1 {fromCurrency} = {"fromRate.marketRate"} {toCurrency}
              </div>
              <div>Last Updated: {new Date().toLocaleString()}</div>
            </div> */}
          </div>
        </MaxWidthWrapper>
      </>
    );
}
