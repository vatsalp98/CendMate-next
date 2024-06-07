import Link from "next/link";
import SignupForm from "~/app/_components/SignupForm";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function OTPPage() {
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
                Onboarding
              </CardTitle>
              <CardDescription>
                Enter your address details to finish setting up your account.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
          <CardFooter className="items-center justify-center">
            <Button></Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}