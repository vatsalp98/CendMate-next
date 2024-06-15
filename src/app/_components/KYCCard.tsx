"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import Image from "next/image";

export default function KYCCard() {
  const router = useRouter();

  const {
    mutate: verifySession,
    isPending: verifyLoading,
    isSuccess: verifySuccess,
  } = api.onboard.verifyKyc.useMutation({
    onSuccess: (data) => {
      router.push(data.redirectUrl);
    },
  });

  return (
    <>
      {!verifySuccess && (
        <Card>
          <CardHeader className="flex w-full flex-col items-center justify-center">
            <Image
              src="/svg/verification.svg"
              alt="Verification SVG"
              width={100}
              height={100}
            />
            <CardTitle className="flex flex-row gap-2">
              KYC Verification
            </CardTitle>
            <CardDescription>
              You will need to verify your documents in order to use our
              website.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-center">
            <Button
              onClick={() => {
                verifySession();
              }}
              disabled={verifyLoading}
            >
              {verifyLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Start Verification"
              )}
            </Button>
          </CardContent>
        </Card>
      )}
      {verifySuccess && <Loader2 className="animate-spin" />}
      <div id="complycube-mount"></div>
    </>
  );
}
