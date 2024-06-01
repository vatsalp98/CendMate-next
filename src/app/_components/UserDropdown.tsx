import { UserIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
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

export default function UserDropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer overflow-visible hover:shadow-md"
        >
          <Avatar className="rounded-full object-cover">
            <AvatarFallback className="font-semibold text-primary">
              VP
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>vatsalparmar98@gmail.com</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href={{
                  pathname: "/profile",
                  query: {
                    tab: "general",
                  },
                }}
                className="font-semibold"
              >
                Profile
              </Link>
              <DropdownMenuShortcut>
                <UserIcon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* {user.role === "admin" && (
                    <DropdownMenuItem className="cursor-pointer">
                      <Link href="/admin" className="font-semibold">
                        Admin dashboard
                      </Link>
                      <DropdownMenuShortcut>
                        <LayoutDashboardIcon />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  )} */}

            <DropdownMenuItem className="flex cursor-pointer flex-row justify-between font-semibold text-red-500">
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
