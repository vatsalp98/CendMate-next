import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <SignUp
          forceRedirectUrl={"/welcome"}
          appearance={{
            layout: {
              logoImageUrl: "/logo192.png",
              logoPlacement: "inside",
              logoLinkUrl: "/",
            },
            baseTheme: [dark],
          }}
        />
      </div>
    </>
  );
}
