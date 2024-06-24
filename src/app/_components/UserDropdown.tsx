"use client";

import { UserIcon, LogOutIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import { logout } from "~/actions/logout";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { ExtendedUser } from "~/types/auth";

interface UserDropdownProps {
  user: ExtendedUser;
}

export default function UserDropdown({ user }: UserDropdownProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer overflow-visible hover:shadow-md"
        >
          <Avatar className="rounded-full object-cover">
            <AvatarFallback className="font-semibold text-primary">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={{
                  pathname: "/profile",
                }}
                className="font-semibold"
              >
                Profile
              </Link>
              <DropdownMenuShortcut>
                <UserIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            {user?.role === "ADMIN" && (
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/admin" className="font-semibold">
                  Admin dashboard
                </Link>
                <DropdownMenuShortcut>
                  <LayoutDashboardIcon />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className="flex cursor-pointer flex-row justify-between font-semibold text-red-500"
              onClick={async () => {
                await logout();
              }}
            >
              Log out
              <DropdownMenuShortcut>
                <LogOutIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
