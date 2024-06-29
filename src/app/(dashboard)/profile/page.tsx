import {
  BellIcon,
  CakeIcon,
  Edit,
  MapIcon,
  MapPin,
  MapPinnedIcon,
  MessageCircleIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
  UserCog2Icon,
} from "lucide-react";
import MaxWidthWrapper from "~/app/_components/MaxWitdhWrapper";
import ProfileInfoItem from "~/app/_components/profile-info-item";
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
import { currentUser } from "~/lib/auth";
import { cn } from "~/lib/utils";

export default async function ProfilePage() {
  const user = await currentUser();

  if (user)
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
                    <AvatarImage
                      src={user?.avatar}
                      alt="user Avatar"
                      className="bg-gray-300 p-1 dark:bg-white"
                    />
                    <AvatarFallback>
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <h3 className="flex flex-row items-center justify-center gap-2 text-xl font-semibold">
                    {user?.firstName} {user?.lastName}
                    {user?.isVerified && <ShieldCheckIcon />}
                  </h3>
                  <ProfileInfoItem
                    icon={<PhoneCallIcon />}
                    title="Phone"
                    value={user.phone}
                  />
                  <ProfileInfoItem
                    icon={<MessageCircleIcon />}
                    title="Email"
                    value={user.email}
                  />
                  <ProfileInfoItem
                    icon={<MapIcon />}
                    title="Address"
                    value={user.address1 + ", " + user.city}
                  />
                  <ProfileInfoItem
                    icon={<MapPin />}
                    title="Postal"
                    value={user.postal}
                  />
                  <ProfileInfoItem
                    icon={<MapPinnedIcon />}
                    title="Country"
                    value={user.country}
                  />
                  <ProfileInfoItem
                    icon={<CakeIcon />}
                    title="Birthday"
                    value={new Date(user.dob!).toLocaleDateString()}
                  />
                  <ProfileInfoItem
                    icon={<BellIcon />}
                    title="Notification"
                    value={user.notificationPreferences.toUpperCase()}
                  />
                  <ProfileInfoItem
                    icon={<UserCog2Icon />}
                    title="Role"
                    value={user.role}
                  />
                  <div className="mt-2 flex w-full flex-row items-center justify-between gap-2 rounded-lg border p-2">
                    <span className="flex flex-row items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <ShieldCheckIcon />
                      2FA Authentication
                    </span>

                    <Badge
                      className={cn(
                        user.isTwoFactorEnabled
                          ? "bg-green-700 text-white"
                          : "",
                        "rounded-sm",
                      )}
                      variant={"secondary"}
                    >
                      {user.isTwoFactorEnabled ? "ON" : "OFF"}
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
