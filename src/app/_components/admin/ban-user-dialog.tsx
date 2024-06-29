import { Ban, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";
import { buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface BanUserDialogProps {
  id: string;
  status: boolean;
  refetch: () => void;
}

export default function BanUserDialog({
  id,
  status,
  refetch,
}: BanUserDialogProps) {
  const { mutate: changeStatus, isPending } = api.admin.banUser.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Customer status changed!");
    },
  });
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({
            variant: status ? "default" : "destructive",
            className: "flex-1 gap-2",
          })}
        >
          {status ? (
            <>
              <ShieldCheck />
              Unban
            </>
          ) : (
            <>
              <Ban className="h-4 w-4" />
              Ban User
            </>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {status
                ? "This will unban the customer making him eligible to use our platform once again."
                : "This will ban the customer from using the website. Please make sure you want to ban this user. "}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              className={buttonVariants({
                variant: status ? "default" : "destructive",
              })}
              onClick={() => {
                changeStatus({
                  id: id,
                  status: !status,
                });
              }}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
