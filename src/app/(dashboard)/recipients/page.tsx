"use client";

import { useState } from "react";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { Button } from "~/components/ui/button";

export default function RecipientsPage() {
  const [step, setStep] = useState("initial");

  return (
    <>
      <section>
        <MaxWidthWrapper>
          <div className="">
            <div className="mt-6 flex w-full flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Your Recipients</h2>
                <span className="text-muted-foreground">
                  List of all your recipients
                </span>
              </div>
              <Button onClick={() => setStep("new")}></Button>
            </div>
            <div>{step === "initial" && <div>Initila</div>}</div>
            <div>
              {step === "new" && (
                <div>
                  {/* Ask Currency */}
                  NEw Reciupient
                  <Button onClick={() => setStep("form")}></Button>
                </div>
              )}
            </div>
            <div>
              {step === "form" && (
                <div>
                  {/* Form Beneficiary*/}
                  NEw Reciupient
                  <Button onClick={() => setStep("form")}></Button>
                </div>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
