import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import WalletList from "~/app/_components/WalletsList";

export default function WalletsPage() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mt-10">
          <div className="">
            <WalletList />
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
