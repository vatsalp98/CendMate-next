"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import CardWrapper from "./card-wrapper";
import { resetSchema } from "~/schemas";
import type { z } from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "~/components/ui/button";
import { reset } from "~/actions/reset";

export default function ResetForm() {
  type TResetSchema = z.infer<typeof resetSchema>;
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const loginForm = useForm<TResetSchema>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleLogin = async (values: TResetSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={false}
    >
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handleLogin)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              name="email"
              control={loginForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@email.com"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
