import AddressForm from "~/app/_components/AddressForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function OTPPage() {
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center py-32">
        <Card>
          <CardHeader className="items-center">
            <div className="mb-2 flex h-24 w-24 items-center justify-center rounded-full border border-primary">
              <div className="h-16 w-16 bg-[url('/logo192.png')] bg-contain bg-center" />
            </div>
            <div className="">
              <CardTitle className="font-bold text-primary">Welcome,</CardTitle>
              <CardDescription>
                We need some information to finish your setup.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <AddressForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
