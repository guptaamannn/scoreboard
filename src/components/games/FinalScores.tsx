"use client";

import { GameById, GameId } from "@/lib/db/schema/games";
import { Player } from "@/lib/db/schema/users";
import { useTotalScores } from "@/lib/hooks/useTotalScore";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import Modal from "../shared/Modal";
import PlayerAvatar from "../shared/PlayerAvatar";
import { Table, TableCell, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";

type FinalPoints = {
  player: Player;
  points: number;
};

export default function FinalScores({
  game,
  gameId,
}: {
  game: GameById;
  gameId: GameId;
}) {
  const { data: totalScores } = useTotalScores(gameId);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  let finalScores: FinalPoints[] = [];

  if (!totalScores) return null;

  if (totalScores?.scores.length > 0) {
    totalScores.scores.forEach((score) => {
      finalScores.push({
        player: game?.players.find((p) => p.id === score.playerId)!,
        points: score._sum.points!,
      });
    });
  }

  if (game?.highestWins) {
    finalScores.reverse();
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm">
        {finalScores[0].player.username} won by{" "}
        {Math.abs(finalScores[1].points - finalScores[0].points)} points
      </p>
      <InfoIcon className="h-4 w-4" onClick={() => setShowLeaderboard(true)} />

      <Modal
        open={showLeaderboard}
        setOpen={setShowLeaderboard}
        title="Leaderboard"
      >
        <div className="space-y-6 pt-6 text-center">
          <div className="grid grid-cols-3">
            {finalScores.length >= 2 && <LeaderStand score={finalScores[1]} />}
            <LeaderStand
              score={finalScores[0]}
              avatarClass="ring-yellow-500 ring-4"
            />
            {finalScores.length >= 3 && <LeaderStand score={finalScores[2]} />}
          </div>
          <div className="text-lg font-semibold">Top Players</div>

          {finalScores.length > 3 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Player</TableCell>
                  <TableCell>Points</TableCell>
                </TableRow>
              </TableHeader>
              {finalScores.slice(3).map((score, i) => (
                <TableRow key={score.player.id}>
                  <TableCell>{i + 4}</TableCell>
                  <TableCell className="inline-flex items-center gap-4">
                    <PlayerAvatar player={score.player} />
                    {score.player.username}
                  </TableCell>
                  <TableCell>{score.points}</TableCell>
                </TableRow>
              ))}
            </Table>
          )}
        </div>
      </Modal>
    </div>
  );
}

function LeaderStand({
  score,
  avatarClass,
  className,
}: {
  score: FinalPoints;
  avatarClass?: string;
  className?: string;
}) {
  return (
    <div
      key={score.player.id}
      className={cn("flex flex-col items-center gap-1", className)}
    >
      <PlayerAvatar
        player={score.player}
        showTooltip
        className={cn("h-16 w-16 border-0", avatarClass)}
      />
      <div className="text-sm font-medium">{score.player.username}</div>
      <div className="text-xs text-muted-foreground">{score.points} points</div>
    </div>
  );
}
