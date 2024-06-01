"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

interface LoginFormProps {
  setStep: (step: number) => void;
  setUserId: (userId: string) => void;
}

export default function LoginForm({ setStep, setUserId }: LoginFormProps) {
  const loginFormSchema = z.object({
    email: z.string().email("Invalid email format."),
    password: z.string(),
    rememberMe: z.boolean().default(false),
  });
  const loginMutation = api.auth.login.useMutation({
    onSettled: (data) => {
      console.log("DATA", data);
      if (data) {
        setUserId(data?.userId);
        setStep(1);
      }
    },
  });

  type TLoginFormSchema = z.infer<typeof loginFormSchema>;

  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (values: TLoginFormSchema) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="login-form">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0 pt-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="">Remember Me</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
