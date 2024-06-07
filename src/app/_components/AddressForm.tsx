"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapIcon } from "lucide-react";
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
import { Progress } from "~/components/ui/progress";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { AddressAutofill, SearchBox } from "@mapbox/search-js-react";
import { env } from "~/env";

export default function AddressForm() {
  const addressFormSchema = z.object({
    address1: z.string(),
    address2: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postal: z.string(),
  });
  type TAddressFormValues = z.infer<typeof addressFormSchema>;

  const form = useForm<TAddressFormValues>({
    resolver: zodResolver(addressFormSchema),
  });

  const onSubmit = (values: TAddressFormValues) => {
    console.log("Values", values);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="flex flex-row items-center gap-2 font-semibold">
          <MapIcon />
          Demographic
        </h2>
        <Progress value={100} />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            name="address1"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address 1</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Address Line 1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="address2"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address 2</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Apartement" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="City" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="state"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="State" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Country" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="postal"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Postal Code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-5">
            Finish
          </Button>
        </form>
      </Form>
    </>
  );
}
