import UserSettings from "./UserSettings";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import SignOutBtn from "@/components/auth/SignOutBtn";

export default async function Settings() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <main className="relative space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
      </div>
      <div className="space-y-4">
        <UserSettings session={session} />
      </div>
      <SignOutBtn />
    </main>
  );
}
