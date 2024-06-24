"use client";

import { newPasswordSchema } from "~/schemas";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import type { z } from "zod";
import { useSearchParams } from "next/navigation";
import { newPassword } from "~/actions/new-password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "~/components/ui/button";

export default function NewPasswordForm() {
  type TNewPasswordSchema = z.infer<typeof newPasswordSchema>;
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const newPasswordForm = useForm<TNewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const handleSubmit = async (values: TNewPasswordSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
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
      headerLabel="New password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...newPasswordForm}>
        <form
          onSubmit={newPasswordForm.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              name="password"
              control={newPasswordForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      {...field}
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirm_password"
              control={newPasswordForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      type="password"
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
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
