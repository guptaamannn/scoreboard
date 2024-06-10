import ScoreBoard from "@/components/games/ScoreBoard";
import { getUserAuth } from "@/lib/auth/utils";
import { Player } from "@/lib/db/schema/users";

export default async function GamePage({
  params,
}: {
  params: { gameId: string };
}) {
  const { session } = await getUserAuth();

  return (
    <main className="space-y-6 pt-4">
      <ScoreBoard
        gameId={parseInt(params.gameId)}
        userId={session?.user.id}
        user={session?.user as Player}
      />
    </main>
  );
}
