"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
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
import { getRequiredFieldProperties } from "~/lib/utils";
import { api } from "~/trpc/react";
import CustomFormField from "./CustomFormField";
import { Beneficiary, beneficiaryResponseSchemaObject } from "~/config/models";

interface AddRecipientFormProps {
  currencyCode: string;
  currencySchema: beneficiaryResponseSchemaObject;
}

export default function AddRecipientForm({
  currencyCode,
  currencySchema,
}: AddRecipientFormProps) {
  const { fields: requiredFields, schema: requiredFieldsZodSchema } =
    getRequiredFieldProperties(currencySchema);
  // console.log(requiredFieldsZodSchema);
  const beneficiaryAddForm = useForm<z.infer<typeof requiredFieldsZodSchema>>({
    resolver: zodResolver(requiredFieldsZodSchema),
    defaultValues: {
      routingCodeType1: "TRANSIT NUMBER",
    },
  });

  function onSubmit(values: z.infer<typeof requiredFieldsZodSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <div className="mt-6">
        <Form {...beneficiaryAddForm}>
          <form
            onSubmit={beneficiaryAddForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {requiredFields.map((field) => (
              <CustomFormField
                key={field}
                name={field}
                control={beneficiaryAddForm.control}
                label={
                  currencySchema.properties[field as keyof Beneficiary].title
                }
              />
            ))}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
