import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import WalletDetails from "~/app/_components/WalletDetailsComponent";
import { buttonVariants } from "~/components/ui/button";

interface WalletDetailsProps {
  params: {
    id: string;
  };
}

export default function WalletDetailPage({ params }: WalletDetailsProps) {
  const { id } = params;

  return (
    <>
      <div>
        <Link
          href={"/dashboard"}
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ChevronLeft />
        </Link>
      </div>
      <MaxWidthWrapper>
        <div className={"mb-10 mt-4"}>
          <WalletDetails id={id} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
