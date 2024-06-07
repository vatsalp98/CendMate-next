"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "~/components/ui/form";
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
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { toast } from "sonner";

interface CreateWalletFormProps {
  refetch: () => void;
}

export default function CreateWalletForm({ refetch }: CreateWalletFormProps) {
  const walletFormSchema = z.object({
    currency: z.string(),
  });

  const [open, setOpen] = useState(false);

  type TWalletFormValues = z.infer<typeof walletFormSchema>;

  const form = useForm<TWalletFormValues>({
    resolver: zodResolver(walletFormSchema),
  });

  const walletMutation = api.wallet.createWallet.useMutation({
    onSuccess: () => {
      toast.success("Wallet succesfully created.");
      setOpen(false);
      form.reset();
      refetch();
    },
  });

  const onSubmit = (values: TWalletFormValues) => {
    walletMutation.mutate(values);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={buttonVariants({
            className: "flex flex-row gap-1",
          })}
        >
          <PlusIcon />
          Create Wallet
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Wallet</DialogTitle>
            <DialogDescription>
              Select the currency for your new wallet.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} id="wallet-form">
                <FormField
                  name="currency"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a currency for the wallet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="CAD">CAD</SelectItem>
                          <SelectItem value="NGN">NGN</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="KES">KES</SelectItem>
                          <SelectItem value="GHS">GHS</SelectItem>
                          <SelectItem value="TZS">TZS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is the list of supported currencies.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              form={"wallet-form"}
              disabled={walletMutation.isPending}
            >
              {walletMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
