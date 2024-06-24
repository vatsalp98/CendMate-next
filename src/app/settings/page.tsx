"use client";

import { logout } from "~/actions/logout";
import { Button } from "~/components/ui/button";
import { useCurrentUser } from "~/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();

  return (
    <>
      {JSON.stringify(user)}

      <Button
        onClick={async () => {
          await logout();
        }}
      >
        Sign Out
      </Button>
    </>
  );
}
