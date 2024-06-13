import { Suspense } from "react";

import Loading from "@/app/loading";
import GameList from "@/components/games/GameList";
import { getUserAuth } from "@/lib/auth/utils";
import { Player } from "@/lib/db/schema/users";

export const revalidate = 0;

export default async function GamesPage() {
  const { session } = await getUserAuth();

  return (
    <main>
      <div className="relative space-y-4 pt-4">
        <div className="flex items-center space-x-4">
          <h1 className="my-2 text-2xl font-semibold">Scoreboards</h1>
        </div>
        <Suspense fallback={<Loading />}>
          <GameList user={session?.user as Player} />
        </Suspense>
      </div>
    </main>
  );
}
