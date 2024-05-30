"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";

export default function LoginPage() {
  const loginFormSchema = z.object({
    email: z.string().email("Invalid email format."),
    password: z.string(),
    rememberMe: z.boolean().default(false),
  });

  type TLoginFormSchema = z.infer<typeof loginFormSchema>;

  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (values: TLoginFormSchema) => {
    console.log("VALUES", values);
  };

  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center py-32">
        <Card>
          <CardHeader className="items-center">
            <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-full border border-primary">
              <div className="h-16 w-16 bg-[url('/logo192.png')] bg-contain bg-center" />
            </div>
            <div className="">
              <CardTitle className="font-bold text-primary">
                Welcome Back
              </CardTitle>
              <CardDescription>
                Login to your CendMate account to continue
              </CardDescription>
            </div>
            <div className="w-full pb-6 pt-2">
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
                          <Input
                            placeholder="password"
                            {...field}
                            type="password"
                          />
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
            </div>
            <Button type="submit" className="w-full" form="login-form">
              Sign In
            </Button>
            <Button variant={"link"} className="items-end">
              Forgot Password
            </Button>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
