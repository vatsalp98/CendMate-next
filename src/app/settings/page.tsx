import { logout } from "~/actions/logout";
import { Button } from "~/components/ui/button";
import { currentUser } from "~/lib/auth";

export default async function SettingsPage() {
  const session = await currentUser();

  return (
    <>
      <div className="flex w-[100px] flex-row">{JSON.stringify(session)}</div>

      <form action={logout}>
        <Button>Sign Out</Button>
      </form>
    </>
  );
}
