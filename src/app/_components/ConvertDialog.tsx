import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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
import { api } from "~/trpc/react";

interface ConvertDialogProps {
  currency: string;
}

export default function ConvertDialog({ currency }: ConvertDialogProps) {
  const convertFormSchema = z.object({
    from_currency: z.string(),
    to_currency: z.string(),
    send_amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
    receive_amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
  });

  const { data: wallets } = api.wallet.getWallets.useQuery();

  type TConvertFormValues = z.infer<typeof convertFormSchema>;

  const form = useForm<TConvertFormValues>({
    resolver: zodResolver(convertFormSchema),
    defaultValues: {
      from_currency: currency,
    },
    mode: "onChange",
  });

  const onSubmit = (values: TConvertFormValues) => {
    console.log("Values", values);
  };

  const onAmountChange = (value: string) => {
    form.setValue("send_amount", value);
    form.setValue("receive_amount", (parseFloat(value) * 1.5).toString());
  };

  if (wallets)
    return (
      <>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              variant: "outline",
              className: "flex-1 gap-1",
            })}
          >
            <RefreshCw />
            Convert
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convert Funds</DialogTitle>
              <DialogDescription>
                Convert your funds into the desired currency here.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {conversionCurrencies(currency, wallets).map(
                                (item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.currency}
                                  >
                                    {item.currency}
                                  </SelectItem>
                                ),
                              )}
                              {/* {wallets
                              ?.filter((wallet) => wallet.currency != currency)
                              .map((item) => (
                                <SelectItem key={item.id} value={item.currency}>
                                  {item.currency}
                                </SelectItem>
                              ))} */}
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
            </div>
            <DialogFooter>
              <DialogClose
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Cancel
              </DialogClose>
              <Button>Convert</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
}
