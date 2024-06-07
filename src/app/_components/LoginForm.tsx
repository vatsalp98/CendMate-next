"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
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
import { createClient } from "~/lib/supabase/client";
import { api } from "~/trpc/react";

export default function LoginForm() {
  const router = useRouter();
  const loginFormSchema = z.object({
    email: z.string().email("Invalid email format."),
    password: z.string(),
    rememberMe: z.boolean().default(false),
  });

  const loginMutation = api.auth.login.useMutation({
    onSuccess: async (data) => {
      console.log("DATA", data);
      const { session } = data;
      const supabase = createClient();
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
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
          <Button type="submit" className="mt-3 w-full">
            {loginMutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
