"use client";

import { Loader2Icon } from "lucide-react";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "~/actions/new-verification";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function VerificationForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success ?? error) return;

    if (!token) {
      setError("Missing Token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
      >
        <div className="flex w-full items-center justify-center">
          {!success && !error && <Loader2Icon className="animate-spin" />}
          {!success && <FormError message={error} />}

          <FormSuccess message={success} />
        </div>
      </CardWrapper>
    </>
  );
}
