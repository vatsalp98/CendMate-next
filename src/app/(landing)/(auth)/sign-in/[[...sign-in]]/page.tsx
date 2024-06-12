import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <>
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
