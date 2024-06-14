import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRightFromSquare,
  Hash,
  LandmarkIcon,
  Loader2,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "~/components/ui/badge";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { isFincraCurrency } from "~/lib/utils";
import { api } from "~/trpc/react";

interface DepositDialogProps {
  currency: string;
  mapleRadAccountNumber: string;
  wallet_id: string;
  refetchTransactions: () => void;
}

export default function DepositDialog({
  currency,
  mapleRadAccountNumber,
  wallet_id,
  refetchTransactions,
}: DepositDialogProps) {
  // const { data: operatorsData, isLoading: operatorsLoading } =
  //   api.payment.fetchProviders.useQuery({
  //     currency,
  //   });

  const fincraDepositFormSchema = z.object({
    amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
      message:
        "Invalid number format. It should have up to two decimal places.",
    }),
  });

  const fincraDepositMutation = api.payment.depositFincra.useMutation({
    onSuccess: () => {
      toast.success("Transaction Initiated succesfully.");
      refetchTransactions();
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  type TFincraDepositFormValues = z.infer<typeof fincraDepositFormSchema>;

  const form = useForm<TFincraDepositFormValues>({
    resolver: zodResolver(fincraDepositFormSchema),
  });

  const onSubmit = (values: TFincraDepositFormValues) => {
    fincraDepositMutation.mutate({
      amount: values.amount,
      wallet_id: wallet_id,
    });
  };

  if (currency === "NGN") {
    return (
      <>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              variant: "outline",
              className: "flex-1 gap-1",
            })}
          >
            <PlusIcon />
            Add
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deposit Amount</DialogTitle>
              <DialogDescription>
                Please send your transfer to the following details to deposit
                money into your wallet.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <div className="flex flex-col gap-2 py-4">
              <div className="flex w-full flex-row items-center justify-between gap-2">
                <h2 className="flex flex-row gap-2 font-semibold text-muted-foreground">
                  <Hash />
                  Account Number
                </h2>
                <Badge className="rounded-sm text-lg">
                  {mapleRadAccountNumber}
                </Badge>
              </div>

              <div className="flex flex-row items-center justify-between gap-2">
                <h2 className="flex flex-row gap-2 font-semibold text-muted-foreground">
                  <LandmarkIcon />
                  Bank Name
                </h2>
                <Badge className="rounded-sm text-lg">
                  9 Payment Service Bank
                </Badge>
              </div>
            </div>
            {/* <DialogFooter className="text-sm font-semibold text-muted-foreground">
              Please make sure the transfer is done with your personal account.
              Sharing this information may result in a banned account.
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  if (isFincraCurrency(currency)) {
    return (
      <>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              variant: "outline",
              className: "flex-1 gap-1",
            })}
          >
            <PlusIcon />
            Add
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deposit Amount</DialogTitle>
              <DialogDescription>
                Follow these steps to deposit money into your wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="flex w-full flex-col py-4">
              {fincraDepositMutation.isPending && (
                <Loader2 className="animate-spin" />
              )}
              {fincraDepositMutation.isSuccess && (
                <div>
                  <div>
                    <strong>Congratulations!</strong> Your pay-in link has been
                    generated succesfully.
                  </div>
                  <div>
                    Please use the following pay-in link to deposit{" "}
                    <strong>{fincraDepositMutation.data.amount}</strong> in your
                    wallet from your <strong>Mobile money</strong> account.
                  </div>
                  <div className="text-sm italic text-muted-foreground">
                    Please note: Some charges make apply from the payment
                    provider.
                  </div>
                  <Link
                    target="_blank"
                    href={fincraDepositMutation.data.link}
                    className="mt-5 flex h-[60px] flex-1 flex-row items-center  justify-center gap-2 rounded-sm border bg-green-200 px-2 text-sm font-semibold text-black hover:underline"
                  >
                    {fincraDepositMutation.data.link} <ArrowUpRightFromSquare />
                  </Link>
                </div>
              )}
              {!fincraDepositMutation.isPending &&
                !fincraDepositMutation.isSuccess && (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      id="deposit-modal"
                    >
                      <FormField
                        name={"amount"}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter amount to deposit"
                              />
                            </FormControl>
                            <FormDescription>
                              Enter the amount you want to deposit.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                )}
            </div>
            <DialogFooter>
              {fincraDepositMutation.isSuccess ? (
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    fincraDepositMutation.reset();
                  }}
                >
                  Deposit Again
                </Button>
              ) : (
                <DialogClose
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Cancel
                </DialogClose>
              )}
              <Button
                form="deposit-modal"
                type="submit"
                disabled={
                  fincraDepositMutation.isPending ||
                  fincraDepositMutation.isSuccess
                }
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
