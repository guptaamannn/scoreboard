import { AuthSession, getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Bell, Gamepad2, UsersRound } from "lucide-react";
import { ModeToggle } from "../ui/ThemeToggle";

export default async function Appbar() {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <div className="bg-main flex items-center justify-between px-8 py-4">
      <UserDetails session={session} />

      <div className="flex space-x-3">
        <Link href="/games" prefetch>
          <Button size="icon" variant="secondary">
            <Gamepad2 className="h-5 w-5" />
          </Button>
        </Link>

        <Link href="/friends" prefetch>
          <Button variant="secondary" size="icon">
            <UsersRound className="h-5 w-5" />
          </Button>
        </Link>

        {/* <Button variant="secondary" size="icon">
          <Bell className="h-5 w-5" />
        </Button> */}
        <ModeToggle />
      </div>
    </div>
  );
}

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <Link href="/settings">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback className="border-2 border-border text-muted-foreground">
            {user.name
              ? user.name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
        <div className="">
          <p className="">{user.name ?? "John Doe"}</p>
          <p className="pr-4 text-xs font-light text-muted-foreground">
            @{user.username}
          </p>
        </div>
      </div>
    </Link>
  );
};
