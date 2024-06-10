"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogOverlay } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserAction } from "@/lib/actions/players";
import { AuthSession, SessionUser } from "@/lib/auth/utils";
import {
  Player,
  UpdateUserParams,
  updateUserParams,
} from "@/lib/db/schema/users";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";
import { useRouter } from "next/navigation";
import { User } from "prisma/zod/modelSchema";
import { toast } from "sonner";

type OnboardingProps = {
  user: SessionUser | undefined;
};

export default function OnboardingComponent({ user }: OnboardingProps) {
  const router = useRouter();
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<User>(updateUserParams);

  const onSuccess = () => {
    toast.success("User updated");
    router.push("/games");
  };

  const handleSubmit = (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const userParsed = updateUserParams.safeParse({ ...user, ...payload });
    if (!userParsed.success) {
      setErrors(userParsed.error.formErrors.fieldErrors);
      return;
    }
    const values = userParsed.data;
    try {
      const error = updateUserAction({ ...user, ...values });
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="onboarding-container">
      <Dialog open={user?.username === null}>
        <DialogOverlay>
          <div className="fixed left-[50%] top-[50%] z-50 min-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md border-2 border-black bg-bg p-8 dark:border-white dark:bg-background">
            <h1 className="text-center text-2xl font-semibold">Welcome</h1>
            <h5 className="text-center text-muted-foreground">
              Let&apos;s get started
            </h5>
            <form
              className="mt-5"
              action={handleSubmit}
              onChange={handleChange}
            >
              {/* <div className="mb-3 flex justify-center">
                <Avatar>
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </div> */}

              <div className="mb-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  defaultValue={user?.name ?? ""}
                />
                {errors?.name && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.name[0]}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  defaultValue={user?.username ?? ""}
                />
                {errors?.username && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.username[0]}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </div>
        </DialogOverlay>
      </Dialog>
    </div>
  );
}
