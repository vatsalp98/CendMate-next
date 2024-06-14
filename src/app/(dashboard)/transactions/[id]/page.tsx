import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import TransactionDetailsComponents from "~/app/_components/TransactionDetails";
import { buttonVariants } from "~/components/ui/button";

interface TransactionDetailsPageProps {
  params: {
    id: string;
  };
}

export default function TransactionDetailsPage({
  params: { id },
}: TransactionDetailsPageProps) {
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
          <TransactionDetailsComponents id={id} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
