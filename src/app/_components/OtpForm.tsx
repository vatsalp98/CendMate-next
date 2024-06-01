import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

interface OtpFormProps {
  userId: string;
}

export default function OtpForm({ userId }: OtpFormProps) {
  const otpFormSchema = z.object({
    otp: z.string(),
  });
  const router = useRouter();
  type TOtpFormValues = z.infer<typeof otpFormSchema>;

  const verifyMutation = api.auth.verify.useMutation({
    onSettled: (data) => {
      console.log("SETTLED");
      if (data?.token) {
        router.push("/dashboard");
      }
    },
  });

  const form = useForm<TOtpFormValues>({
    resolver: zodResolver(otpFormSchema),
  });

  const onSubmit = async (values: TOtpFormValues) => {
    console.log("VALUES", values);
    verifyMutation.mutate({
      otp: values.otp,
      userId: userId,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="otp-form">
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Otp Code</FormLabel>
                <FormControl>
                  <Input placeholder="0000" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
