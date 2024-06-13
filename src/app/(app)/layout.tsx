import { getUserAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/QueryProvider";
import Appbar from "@/components/shared/AppBar";
import OnboardingComponent from "@/components/games/Onboard";
import { redirect } from "next/navigation";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await getUserAuth();
  if (!session) await redirect("/sign-in");

  return (
    <main>
      <QueryProvider>
        <div className="flex h-screen flex-col">
          <Appbar />
          <main className="flex-1 overflow-y-auto p-8 pt-2">{children}</main>
          <OnboardingComponent user={session?.user} />
        </div>
        <Toaster />
      </QueryProvider>
    </main>
  );
}
