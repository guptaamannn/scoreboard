import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/QueryProvider";
import Appbar from "@/components/shared/AppBar";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <main>
      <QueryProvider>
        <div className="flex h-screen flex-col">
          <Appbar />
          <main className="flex-1 overflow-y-auto p-8 pt-2">{children}</main>
        </div>
        <Toaster />
      </QueryProvider>
    </main>
  );
}
