import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  // const { isLoaded, signIn, setActive } = useSignIn();

  // const [displayOTP, setDisplayOTP] = useState(false);

  // const loginFormSchema = z.object({
  //   email: z.string().email("Please enter a valid email address."),
  //   password: z.string(),
  // });
  // type TLoginFormValues = z.infer<typeof loginFormSchema>;

  // const loginForm = useForm<TLoginFormValues>({
  //   resolver: zodResolver(loginFormSchema),
  //   mode: "onChange",
  // });

  // const otpFormSchema = z.object({
  //   code: z.string().min(6, {
  //     message: "Your otp code needs to be at least 6 characters.",
  //   }),
  // });
  // type TOtpFormValues = z.infer<typeof otpFormSchema>;
  // const otpForm = useForm<TOtpFormValues>({
  //   resolver: zodResolver(otpFormSchema),
  //   mode: "onChange",
  // });

  // const loginSubmit = async (values: TLoginFormValues) => {
  //   if (!isLoaded) {
  //     return null;
  //   }
  //   try {
  //     const resource = await signIn.create({
  //       identifier: values.email,
  //       password: values.password,
  //     });
  //     console.log("Values", resource);
  //   } catch (err) {
  //     toast.error(err);
  //   }
  // };

  return (
    <>
      {/* <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Card>
          <CardHeader>
            <div className="flex w-full flex-row items-center justify-center">
              <Image src="/logo512.png" alt="Logo" width={100} height={100} />
            </div>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login with your email and password to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form
                className="flex flex-col gap-2"
                onSubmit={loginForm.handleSubmit(loginSubmit)}
              >
                <FormField
                  name="email"
                  control={loginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={loginForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-5 flex w-full flex-row">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div> */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <SignIn
          signUpUrl="/sign-up"
          forceRedirectUrl={"/dashboard"}
          appearance={{
            layout: {
              logoImageUrl: "/logo192.png",
              logoPlacement: "inside",
              logoLinkUrl: "/",
            },
            baseTheme: [dark],
          }}
          path="/sign-in"
        />
      </div>
    </>
  );
}
