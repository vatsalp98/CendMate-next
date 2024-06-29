import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
  allCurrencies,
  formatCurrency,
  formatMoney,
  validateDecimal,
} from "~/lib/utils";
import { api } from "~/trpc/react";

export default function ForexCard() {
  const {
    data: ratesToUSD,
    isLoading,
    isFetched,
  } = api.exchange.getExchangeRates.useQuery();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromAmount, setFromAmount] = useState(1.0);
  const [toAmount, setToAmount] = useState(1.0);
  const [inverseRate, setInverseRate] = useState(1.0);
  const [convertRate, setConvertRate] = useState(1.0);

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
    defaultValues: {
      from_currency: "USD",
      to_currency: "USD",
    },
  });

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

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
      setConvertRate(toRate);
    } else if (toCurrency === "USD") {
      const result = amount / fromRate;
      setConvertRate(1 / fromRate);
      convertForm.setValue("to_amount", formatMoney(result));
    } else {
      const amountInUSD = amount / fromRate;
      const result = amountInUSD * toRate;
      setConvertRate(toRate / fromRate);
      convertForm.setValue("to_amount", formatMoney(result));
    }
  }
  const submitForm = (values: TConvertFormValues) => {
    console.log("VAlues", values);
  };

  if (isFetched) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Forex Currency Converter</CardTitle>
            <CardDescription>
              Instantly convert currencies with up-to-date exchange rates using
              our real-time Forex Currency Converter. Accurate and convenient
              for all your currency needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...convertForm}>
              <form onSubmit={convertForm.handleSubmit(submitForm)}>
                <div className="flex w-full flex-row gap-4">
                  <FormField
                    name="from_amount"
                    control={convertForm.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>You pay</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value}
                            onChange={(e) => {
                              if (validateDecimal(e.target.value)) {
                                setFromAmount(parseFloat(e.target.value));
                                convertForm.setValue(
                                  "from_amount",
                                  e.target.value,
                                );
                                convert(
                                  convertForm.getValues("from_currency"),
                                  convertForm.getValues("to_currency"),
                                  parseFloat(e.target.value),
                                );
                              } else {
                                convertForm.setError("from_amount", {
                                  message: "Invalid amount entered",
                                });
                              }
                            }}
                            placeholder="1.00"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="from_currency"
                    control={convertForm.control}
                    render={({ field }) => (
                      <FormItem className="w-1/4">
                        <FormLabel>From currency</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            setFromCurrency(value);
                            convertForm.setValue("from_currency", value);
                            convert(
                              value,
                              convertForm.getValues("to_currency"),
                              parseFloat(convertForm.getValues("from_amount")),
                            );
                          }}
                          defaultValue="USD"
                        >
                          <SelectTrigger>
                            <FormControl>
                              <SelectValue placeholder="USD" />
                            </FormControl>
                          </SelectTrigger>
                          <SelectContent>
                            {allCurrencies.map((item) => (
                              <SelectItem value={item} key={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-2 flex w-full flex-row gap-4">
                  <FormField
                    name="to_amount"
                    control={convertForm.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>You get</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1.00" disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="to_currency"
                    control={convertForm.control}
                    render={({ field }) => (
                      <FormItem className="w-1/4">
                        <FormLabel>To currency</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            setToCurrency(value);
                            convertForm.setValue("to_currency", value);
                            convert(
                              convertForm.getValues("from_currency"),
                              value,
                              parseFloat(convertForm.getValues("from_amount")),
                            );
                          }}
                        >
                          <SelectTrigger>
                            <FormControl>
                              <SelectValue placeholder="USD" />
                            </FormControl>
                          </SelectTrigger>
                          <SelectContent>
                            {allCurrencies.map((item) => (
                              <SelectItem value={item} key={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
            <div className="my-5 flex w-full flex-col items-center justify-center rounded-lg border px-4 py-2 shadow-md dark:shadow-gray-800">
              <h2 className="font-semibold text-muted-foreground">
                Conversion rate
              </h2>
              <div className="flex w-full flex-row justify-evenly">
                <strong>
                  {formatCurrency(
                    convertForm.getValues("from_currency"),
                    formatMoney(1),
                  )}{" "}
                  ={" "}
                  {formatCurrency(
                    convertForm.getValues("to_currency"),
                    formatMoney(convertRate),
                  )}
                </strong>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex w-full flex-row">
            <Button className="flex-1">Convert</Button>
          </CardFooter>
        </Card>
      </>
    );
  }
}
