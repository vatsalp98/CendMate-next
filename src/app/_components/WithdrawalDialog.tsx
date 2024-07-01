import {
  ArrowDown,
  Banknote,
  CheckCircle2Icon,
  Loader2,
  Phone,
  ReceiptText,
} from "lucide-react";
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
  cn,
  formatCurrency,
  getCallingCodeByCurrency,
  getCurrencySymbol,
  numberRegex,
} from "~/lib/utils";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { api } from "~/trpc/react";
import type { MobileMoneyOperator } from "~/config/models";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Image from "next/image";
import { Checkbox } from "~/components/ui/checkbox";
import { toast } from "sonner";

interface WithdrawalDialogProps {
  currency: string;
}

const amountSchema = z.object({
  amount: z.string().regex(numberRegex, {
    message: "Amount invalid",
  }),
});

const reviewSchema = z.object({
  confirm: z.boolean().refine((val) => val, {
    message: "You must confirm to proceed",
  }),
});

const operatorSchema = z.object({
  operator: z.string().min(1, "Please select an operator"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(15, "Phone number max length 15")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

export default function FincraWithdrawalDialog({
  currency,
}: WithdrawalDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [apiResponse, setApiResponse] = useState<MobileMoneyOperator[]>([]);
  const [withdrawDone, setWithdrawDone] = useState(false);
  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: "Amount",
      schema: amountSchema,
    },
    { title: "Phone Number", schema: operatorSchema },
    {
      title: "Review",
      schema: reviewSchema,
    },
  ];

  const currentSchema = steps[currentStep]!.schema;

  const methods = useForm<z.infer<typeof currentSchema>>({
    resolver: zodResolver(currentSchema),
    mode: "onChange",
  });

  const operatorsMutation = api.withdrawal.fetchProviders.useMutation();
  const withdrawMutation = api.withdrawal.initiateWithdrawal.useMutation({
    onSuccess: () => {
      toast.success("Your Payout has been initiated.");
      setWithdrawDone(true);
    },
    onError: (error) => {
      toast.error(error.message);
      methods.reset();
      setOpen(false);
    },
  });

  const onSubmit = async () => {
    if (currentStep === 0) {
      // ... (fetch API data as before)
      const operators = await operatorsMutation.mutateAsync({ currency });
      setApiResponse(operators);
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Assuming apiResponse.operators is an array of strings
      //   setSelectedOperator(data.operator); // Store the selected operator
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Handle final confirmation and transfer, include operator and phone number
      const amount = methods.getValues("amount");
      const phoneNumber = methods.getValues("phoneNumber");
      withdrawMutation.mutate({
        amount: amount,
        phoneNumber: phoneNumber,
        operator: selectedOperator,
        currency: currency,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
        <DialogTrigger
          className={buttonVariants({
            variant: "outline",
            className: "flex-1 gap-1",
          })}
        >
          <ArrowDown />
          Withdraw
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw funds</DialogTitle>
            <DialogDescription>
              Follow theses steps to withdraw funds from your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-row items-center justify-evenly">
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                currentStep === 0 ? "text-primary" : "text-muted-foreground",
              )}
            >
              <h2>Amount</h2>
              <Banknote />
            </div>
            <hr className="w-[50px] border" />
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                currentStep === 1 ? "text-primary" : "text-muted-foreground",
              )}
            >
              <h2>Phone</h2>
              <Phone />
            </div>
            <hr className="w-[50px] border" />
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1",
                currentStep === 2 ? "text-primary" : "text-muted-foreground",
              )}
            >
              <h2>Review</h2>
              <ReceiptText />
            </div>
          </div>
          <div className="py-4">
            {withdrawDone && (
              <div className="flex flex-col items-center justify-center rounded-lg border px-2 py-4">
                <div>
                  <CheckCircle2Icon className="h-16 w-16 text-green-700" />
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <h2 className="text-xl font-semibold">
                    Your Pay-Out was Initiated!
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Payout initiated! You&apos;ll receive a confirmation email
                    once your funds have been transferred.
                  </span>
                </div>
              </div>
            )}
            {!withdrawDone && (
              <Form {...methods}>
                <form
                  onSubmit={methods.handleSubmit(onSubmit)}
                  id="withdraw-dialog"
                  className="flex flex-col gap-2"
                >
                  {currentStep === 0 && (
                    <FormField
                      control={methods.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-muted-foreground sm:text-sm">
                                  {getCurrencySymbol(currency)}
                                </span>
                              </div>
                              <Input
                                placeholder="Enter amount"
                                {...field}
                                className="pl-11"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {currentStep === 1 && (
                    <div>
                      <FormField
                        control={methods.control}
                        name="operator"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Operator</FormLabel>
                            <Select
                              onValueChange={(value: string) => {
                                setSelectedOperator(value);
                                field.onChange(value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Operator" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Supported Operators</SelectLabel>
                                  {apiResponse?.map((operator) => (
                                    <SelectItem
                                      key={operator.name}
                                      value={operator.value}
                                    >
                                      <div className="flex flex-row items-center gap-2">
                                        <Image
                                          src={operator.icon}
                                          alt="Operator Icon"
                                          width={30}
                                          height={30}
                                        />
                                        <span className="font-semibold">
                                          {operator.name}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={methods.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500 sm:text-sm">
                                    {getCallingCodeByCurrency(currency)}
                                  </span>
                                </div>
                                <Input
                                  className="pl-14"
                                  type="tel"
                                  placeholder="Enter phone number"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="px-2">
                      <div className="flex flex-row gap-2">
                        <h2 className="text-muted-foreground">Amount: </h2>
                        <span className="font-semibold">
                          {formatCurrency(
                            currency,
                            methods.getValues("amount"),
                          )}
                        </span>
                      </div>
                      <div className="flex flex-row gap-2">
                        <h2 className="text-muted-foreground">Operator: </h2>
                        <span className="font-semibold">
                          {selectedOperator}
                        </span>
                      </div>
                      <div className="flex flex-row gap-2">
                        <h2 className="text-muted-foreground">Phone: </h2>
                        <span className="font-semibold">
                          {getCallingCodeByCurrency(currency)}
                          {methods.getValues("phoneNumber")}
                        </span>
                      </div>
                      <FormField
                        name="confirm"
                        control={methods.control}
                        render={({ field }) => (
                          <FormItem className="mt-4 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Confirm the details of the transactions.
                              </FormLabel>
                              <FormDescription>
                                Make sure all the details are correct, you
                                cannot change them later.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </form>
              </Form>
            )}
          </div>
          {withdrawDone && (
            <Button
              variant={"link"}
              onClick={() => {
                methods.reset();
                setCurrentStep(0);
                setWithdrawDone(false);
              }}
            >
              Withdraw Again
            </Button>
          )}
          {!withdrawDone && (
            <DialogFooter className="gap-2">
              {currentStep === 0 && (
                <DialogClose>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              )}
              {(currentStep === 1 || currentStep === 2) && (
                <Button
                  variant="secondary"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              )}

              {(currentStep === 0 || currentStep === 1) && (
                <Button
                  type="submit"
                  form="withdraw-dialog"
                  disabled={operatorsMutation.isPending}
                >
                  {operatorsMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Next"
                  )}
                </Button>
              )}

              {currentStep === 2 && (
                <Button
                  type="submit"
                  form="withdraw-dialog"
                  disabled={withdrawMutation.isPending}
                >
                  {withdrawMutation.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Withdraw"
                  )}
                </Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
