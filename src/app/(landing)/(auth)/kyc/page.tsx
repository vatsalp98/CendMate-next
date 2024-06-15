import KYCCard from "~/app/_components/KYCCard";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";

export default function KycPage() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="flex h-[50vh] w-full flex-col items-center justify-center">
          <KYCCard />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
