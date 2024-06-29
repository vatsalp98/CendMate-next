import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SaveIcon, UserCog2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

interface ChangeRoleDialogProps {
  id: string;
  default_role: "ADMIN" | "USER" | "SUPPORT";
  refetch: () => void;
}

export default function ChangeRoleDialog({
  id,
  default_role,
  refetch,
}: ChangeRoleDialogProps) {
  const changeFormSchema = z.object({
    role: z.enum(["ADMIN", "USER", "SUPPORT"]),
  });
  type TChangeFormValues = z.infer<typeof changeFormSchema>;

  const [open, setOpen] = useState(false);
  const { mutate: changeRole, isPending } =
    api.admin.changeUserRole.useMutation({
      onSuccess: () => {
        toast.success("User role changed Succesfully!");
        setOpen(false);
        refetch();
      },
    });

  const changeForm = useForm<TChangeFormValues>({
    resolver: zodResolver(changeFormSchema),
    defaultValues: {
      role: default_role,
    },
  });

  const onSubmit = (values: TChangeFormValues) => {
    changeRole({
      id,
      role: values.role,
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
        <DialogTrigger
          className={buttonVariants({
            className: "flex-1 gap-2",
          })}
        >
          <UserCog2 className="h-4 w-4" />
          Assign Role
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change role</DialogTitle>
            <DialogDescription>
              Assign a new role to the selected customer.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Form {...changeForm}>
              <form onSubmit={changeForm.handleSubmit(onSubmit)} id="role-form">
                <FormField
                  name="role"
                  control={changeForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Role</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="USER">USER</SelectItem>
                          <SelectItem value="SUPPORT">SUPPORT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The new role will be assigned to the customer.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <DialogFooter className="gap-1">
            <DialogClose>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button
              className="gap-2"
              form="role-form"
              type="submit"
              disabled={isPending && !changeForm.formState.isDirty}
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <SaveIcon className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
