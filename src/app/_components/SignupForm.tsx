"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, User2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PhoneInput } from "~/components/phone-input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();
  const signupFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    recoveryEmail: z.string().email(),
    dob: z.date(),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid Phone Number" }),
    password: z.string(),
    confirmPassword: z.string(),
  });

  type TSignupFormSchema = z.infer<typeof signupFormSchema>;
  const signupMutation = api.auth.signup.useMutation({
    onSuccess: () => {
      toast.success(
        "Please confirm your email by visiting the link in your email then you can login.",
      );
      router.push("/login");
    },
  });
  const form = useForm<TSignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = (values: TSignupFormSchema) => {
    signupMutation.mutate(values);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="flex flex-row items-center gap-2 font-semibold">
          <User2Icon />
          Personal Information
        </h2>
        <Progress value={50} />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="First Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Last Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="recoveryEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Recovery Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Recovery Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
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
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-5"
            type="submit"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
