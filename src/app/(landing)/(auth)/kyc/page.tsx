import Script from "next/script";
import KYCCard from "~/app/_components/KYCCard";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";

export default function KycPage() {
  return (
    <>
      <Script src="https://assets.complycube.com/web-sdk/v1/complycube.min.js" />
      <Script
        src="https://assets.complycube.com/web-sdk/v1/style.css"
        rel="stylesheet"
      />
      <MaxWidthWrapper>
        <div className="flex h-[50vh] w-full flex-col items-center justify-center">
          <KYCCard />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
