"use client";

import { Loader2 } from "lucide-react";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { UserDataTable } from "~/components/ui/user-data-table";
import { user_columns } from "~/config/columns";
import { api } from "~/trpc/react";

export default function AdminUsersPage() {
  const { data: users, isLoading } = api.user.getAllUsers.useQuery();

  return (
    <>
      <MaxWidthWrapper>
        <div className="my-6">
          <div>
            <h2 className="text-2xl font-semibold">All Customers</h2>
            <span className="text-lg text-muted-foreground">
              List of all the customers registered on the website.
            </span>
          </div>

          <div className="mt-4">
            {isLoading && (
              <div className="flex h-screen w-full flex-col items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            )}
            {users && <UserDataTable columns={user_columns} data={users} />}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
