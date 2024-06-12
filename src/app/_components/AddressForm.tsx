"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, UserCog2Icon } from "lucide-react";
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
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddressForm() {
  const router = useRouter();
  const addressFormSchema = z.object({
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postal: z.string(),
    dob: z.date(),
  });
  type TAddressFormValues = z.infer<typeof addressFormSchema>;

  const form = useForm<TAddressFormValues>({
    resolver: zodResolver(addressFormSchema),
  });

  const onboardMutation = api.user.onBoardUser.useMutation({
    onSuccess: () => {
      router.push("/dashboard?new=true");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const today = new Date();
  const seventeenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  const onSubmit = (values: TAddressFormValues) => {
    console.log("Here");
    onboardMutation.mutate(values);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="flex flex-row items-center gap-2 font-semibold">
          <UserCog2Icon />
          Onboarding
        </h2>
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            name="dob"
            control={form.control}
            render={({ field }) => (
              <FormItem {...field} className="my-2 flex w-full flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          field.value.toLocaleDateString()
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      toYear={seventeenYearsAgo.getFullYear()}
                      disabled={(date) =>
                        date > seventeenYearsAgo ||
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button
            type="submit"
            className="mt-5"
            disabled={onboardMutation.isPending}
          >
            {onboardMutation.isPending ? <Loader2 /> : "Finish"}
          </Button>
        </form>
      </Form>
    </>
  );
}
