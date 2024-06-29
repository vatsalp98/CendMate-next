"use client";

import {
  UserIcon,
  LogOutIcon,
  LayoutDashboardIcon,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import { logout } from "~/actions/logout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
            <AvatarImage src={user.avatar} className="rounded-full bg-white" />
            <AvatarFallback className="font-semibold text-primary">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex w-full flex-col">
            {user.firstName} {user.lastName}
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </DropdownMenuLabel>
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

            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={{
                  pathname: "/dashboard",
                }}
                className="font-semibold"
              >
                Home
              </Link>
              <DropdownMenuShortcut>
                <HomeIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            {user?.role === "ADMIN" && (
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/admin/home" className="font-semibold">
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
              <span>Log out</span>
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
