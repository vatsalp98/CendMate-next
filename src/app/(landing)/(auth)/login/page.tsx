"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import LoginForm from "~/app/_components/LoginForm";
import OtpForm from "~/app/_components/OtpForm";

export default function LoginPage() {
  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState("");

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
              {step === 0 && (
                <LoginForm setUserId={setUserId} setStep={setStep} />
              )}
              {step === 1 && <OtpForm userId={userId} />}
            </div>
            {step === 0 ? (
              <Button type="submit" className="w-full" form="login-form">
                Sign In
              </Button>
            ) : (
              <Button type="submit" form="otp-form" className="w-full">
                Verify
              </Button>
            )}
            <Button variant={"link"} className="items-end">
              Forgot Password
            </Button>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
