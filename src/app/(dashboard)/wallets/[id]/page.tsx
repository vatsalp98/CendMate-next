import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import WalletDetails from "~/app/_components/WalletDetailsComponent";

interface WalletDetailsProps {
  params: {
    id: string;
  };
}

export default function WalletDetailPage({ params }: WalletDetailsProps) {
  const { id } = params;

  return (
    <>
      <MaxWidthWrapper>
        <div className={"mt-10"}>
          <WalletDetails id={id} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
