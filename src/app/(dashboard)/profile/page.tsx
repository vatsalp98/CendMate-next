"use client";

import {
  BellIcon,
  CakeIcon,
  Edit,
  Loader2Icon,
  MapIcon,
  MapPin,
  MessageCircleIcon,
  MessageCircleQuestion,
  PhoneCallIcon,
  ShieldCheckIcon,
  UserCog2Icon,
} from "lucide-react";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { api } from "~/trpc/react";

export default function ProfilePage() {
  const { data: userData, isLoading: userLoading } =
    api.user.getUserDb.useQuery();

  if (userLoading) {
    return (
      <>
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </div>
      </>
    );
  }

  if (userData)
    return (
      <>
        <MaxWidthWrapper>
          <div className="mt-6">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex w-full flex-col">
                <h2 className="text-2xl font-bold">Profile</h2>
                <span className="text-muted-foreground">
                  Your user profile Details.
                </span>
              </div>
              <Sheet>
                <SheetTrigger
                  className={buttonVariants({
                    variant: "outline",
                    className: "flex flex-row gap-1",
                  })}
                >
                  <Edit />
                  Edit
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                      You can edit your profile information.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4"></div>
                  <SheetFooter>
                    <SheetClose
                      className={buttonVariants({
                        variant: "link",
                      })}
                    >
                      Cancel
                    </SheetClose>
                    <Button>Save</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
            <Separator className="my-3" />
            <div className="mt-6 flex flex-row gap-6">
              <Card className="flex-1">
                <CardHeader className="flex flex-row items-center justify-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userData.avatar} alt="user Avatar" />
                    <AvatarFallback>
                      {userData.firstName[0]}
                      {userData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <h3 className="flex flex-row items-center justify-center gap-2 text-xl font-semibold">
                    {userData.firstName} {userData.lastName}
                    {userData.isVerified && <ShieldCheckIcon />}
                  </h3>
                  <div className="mt-6 flex w-full flex-row items-center justify-between gap-2">
                    <span className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                      <PhoneCallIcon />
                      Phone
                    </span>
                    <Badge className="rounded-sm">{userData.phone}</Badge>
                  </div>
                  <Separator className="mt-1" />
                  <div className="mt-4 flex w-full flex-row items-center justify-between gap-2">
                    <span className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircleIcon />
                      Email
                    </span>
                    <Badge className="rounded-sm">{userData.email}</Badge>
                  </div>
                  <Separator className="mt-1" />
                  <div className="mt-4 flex w-full flex-row items-center justify-between gap-2">
                    <span className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                      <MapIcon />
                      Address
                    </span>
                    <Badge className="rounded-sm">
                      8888 University Drive East
                    </Badge>
                  </div>
                  <Separator className="mt-1" />
                  <div className="mt-4 flex w-full flex-row items-center justify-between gap-2">
                    <span className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                      <MapPin />
                      Country
                    </span>
                    <Badge className="rounded-sm">Canada</Badge>
                  </div>
                  <Separator className="mt-1" />
                  <div className="mt-4 flex w-full flex-row items-center justify-between gap-2">
                    <span className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                      <CakeIcon />
                      Birthday
                    </span>
                    <Badge className="rounded-sm">
                      {new Date(userData.dob).toLocaleDateString()}
                    </Badge>
                  </div>
                  <Separator className="mt-1" />
                  <div className="mt-4 flex w-full flex-row items-center justify-between gap-2">
                    <span className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                      <BellIcon />
                      Notification
                    </span>
                    <Badge className="rounded-sm">
                      {userData.notificationPreferences.toUpperCase()}
                    </Badge>
                  </div>
                  <Separator className="mt-1" />
                  <div className="mt-4 flex w-full flex-row items-center justify-between gap-2">
                    <span className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                      <UserCog2Icon />
                      Role
                    </span>
                    <Badge className="rounded-sm">{userData.role}</Badge>
                  </div>
                  <Separator className="mt-1" />
                  <div className="mt-4 flex w-full flex-row items-center justify-between gap-2">
                    <span className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircleQuestion />
                      Recovery Email
                    </span>
                    <Badge className="rounded-sm">
                      {userData.recoveryEmail}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </MaxWidthWrapper>
      </>
    );
}
