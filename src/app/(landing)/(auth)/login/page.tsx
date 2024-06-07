import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button, buttonVariants } from "~/components/ui/button";
import LoginForm from "~/app/_components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
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
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <Link
              href={"/sign-up"}
              className={buttonVariants({
                variant: "secondary",
                className: "w-full",
              })}
            >
              Sign Up
            </Link>
            <Button variant={"link"} className="items-end">
              Forgot Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
