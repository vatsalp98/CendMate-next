"use client";
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
} from "~/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import {
  currencyRegex,
  getCurrencySymbol,
  westernCurrencies,
  getRequiredFieldProperties,
} from "~/lib/utils";

import { Button, buttonVariants } from "~/components/ui/button";

import { Loader2 } from "lucide-react";

import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import {
  beneficiaryPropertySchema,
  beneficiaryResponseSchemaObject,
} from "~/config/models";
import { useState } from "react";
import AddRecipientForm from "~/app/_components/AddRecipientForm";

const currencyFormSchema = z.object({
  currencyCode: z
    .string()
    .regex(
      currencyRegex,
      "This field accepts the 3-letter ISO-4217 currency code.",
    ),
});

export default function NewRecipientPage() {
  const params = useSearchParams();
  const currency = params.get("currency");
  type TCurrenyFormValues = z.infer<typeof currencyFormSchema>;
  const currencyForm = useForm<TCurrenyFormValues>({
    resolver: zodResolver(currencyFormSchema),
    mode: "onChange",
  });

  const {
    data: schemaData,
    isPending: schemaPending,
    mutate: getCurrencySchema,
  } = api.recipient.getBeneficiarySchemaForCurrencyCode.useMutation({
    onSuccess: (data) => {
      setCurrentCurrency(data.currency);
    },
  });

  const [currentCurrency, setCurrentCurrency] = useState("");

  let requiredFields: beneficiaryPropertySchema[];
  const currencySubmit = (values: TCurrenyFormValues) => {
    setCurrentCurrency(values.currencyCode);
    getCurrencySchema(values);
  };

  return (
    <>
      <section>
        <MaxWidthWrapper>
          <div className="py-4">
            <Form {...currencyForm}>
              <form
                onSubmit={currencyForm.handleSubmit(currencySubmit)}
                id="currency-form"
              >
                <FormField
                  name="currencyCode"
                  control={currencyForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency code</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {westernCurrencies.map((currencyCode, index) => (
                            <SelectItem key={index} value={currencyCode}>
                              {getCurrencySymbol(currencyCode)}
                              {"  "}
                              {currencyCode}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>

          <div className="py-4">
            {schemaData && schemaData.schema && (
              <AddRecipientForm
                currencyCode={currentCurrency}
                currencySchema={schemaData.schema}
              />
            )}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
