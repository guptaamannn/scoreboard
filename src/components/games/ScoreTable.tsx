"use client";

import DataTable from "@/components/shared/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GameById } from "@/lib/db/schema/games";
import { CompleteRound } from "@/lib/db/schema/rounds";
import { ColumnDef } from "@tanstack/react-table";
import { CrownIcon } from "lucide-react";

const generateColumns = (game: GameById) => {
  const columns: ColumnDef<CompleteRound>[] = game!.players.map((p, i) => ({
    accessorKey: p.username!,
    header: ({ table }) => {
      const rows = table.getPreFilteredRowModel().rows;
      const playersTotal = game!.players
        .map((_p, _i) => {
          return rows.reduce((acc, row) => {
            return acc + row.original.scores[_i].points;
          }, 0);
        })
        .sort((a, b) => a - b);

      const playerTotal = rows.reduce(
        (acc, row) => acc + row.original.scores[i].points,
        0,
      );

      const lowestScore = playersTotal[0];
      const highestScore = playersTotal.at(-1);

      const winningScore = game?.highestWins ? highestScore : lowestScore;

      const isWinner = playerTotal === winningScore;

      return (
        <div className="pb-2 pt-6">
          <div className="relative flex flex-col items-center">
            <Avatar className="relative">
              <AvatarImage src={p.image ?? ""} />
              <AvatarFallback>{p.name![0]}</AvatarFallback>
            </Avatar>
            <p>{p.username}</p>
            {isWinner && game?.ended && (
              <CrownIcon className="absolute -top-6 left-auto right-auto h-6 w-6 fill-yellow-400 text-yellow-600" />
            )}
          </div>
        </div>
      );
    },
    accessorFn: (p) => p.scores[i].points,
    cell: ({ getValue, row }) => {
      const lowest = row.original.scores.reduce((lowest, current) => {
        return current.points < lowest.points ? current : lowest;
      }, row.original.scores[0]);

      const highest = row.original.scores.reduce((highest, current) => {
        return current.points > highest.points ? current : highest;
      }, row.original.scores[0]);

      const compareScore = game?.highestWins ? highest.points : lowest.points;

      return (
        <p>
          {getValue<number>() === compareScore ? (
            <CrownIcon className="flex h-4 w-full justify-center text-yellow-500" />
          ) : (
            getValue<number>()
          )}
        </p>
      );
    },
    footer: ({ table }) => {
      const total = table
        .getPreFilteredRowModel()
        .rows.reduce((acc, row) => acc + row.original.scores[i].points, 0);
      if (game?.showTotal || game?.ended)
        return <p className="text-center">{total}</p>;
    },
  }));

  const roundNumber: ColumnDef<CompleteRound>[] = [
    {
      header: "#",
      accessorFn: (p, i) => i + 1,
      cell: ({ getValue }) => (
        <p className="text-muted-foreground">{getValue<number>()}</p>
      ),
    },
  ];

  return [...roundNumber, ...columns];
};

export default function ScoreTable({ game }: { game: GameById }) {
  return (
    <DataTable
      columns={generateColumns(game)}
      data={game!.rounds as CompleteRound[]}
    />
  );
}
