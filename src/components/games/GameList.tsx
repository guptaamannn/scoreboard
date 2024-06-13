"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { type Game, CompleteGame } from "@/lib/db/schema/games";
import Modal from "@/components/shared/Modal";

import { Button } from "@/components/ui/button";
import { Eye, PlusIcon, Trash2 } from "lucide-react";
import { Player } from "@/lib/db/schema/users";
import GameForm from "./GameForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import { useQuery } from "@tanstack/react-query";
import { getGames } from "@/lib/api/games/queries";
import { deleteGameAction } from "@/lib/actions/games";
import GameListTile from "./GameListTile";
import DeleteButton from "../shared/DeleteButton";

type TOpenModal = (game?: Game) => void;

export default function GameList({ user }: { user: Player }) {
  const [open, setOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const openModal = (game?: Game) => {
    setOpen(true);
    game ? setActiveGame(game) : setActiveGame(null);
  };
  const closeModal = () => {
    setOpen(false);
    refetch();
  };

  const { data, refetch } = useQuery({
    queryKey: ["games"],
    queryFn: async () => await getGames({}),
  });

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeGame ? "Edit Game" : "Create Game"}
        description="Create a new game."
      >
        <GameForm user={user} closeModal={closeModal} />
      </Modal>
      <div className="absolute right-0 top-6">
        <Button onClick={() => openModal()} variant={"secondary"}>
          New Board
        </Button>
      </div>

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Players</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Descriptions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.games.map((game) => (
              <TableRow key={game.id}>
                <TableCell>
                  <div className="flex flex-row-reverse justify-end -space-x-3 space-x-reverse">
                    {game.players.map((p) => (
                      <Avatar key={p.id}>
                        <AvatarImage src={p.image ?? ""} />
                        <AvatarFallback>{p.username![0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {format(game.createdAt, "MMM dd, yyyy")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(game.createdAt, "h:mm a")}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant={game.ended ? "destructive" : "default"}>
                    {game.ended ? "Ended" : "Ongoing"}
                  </Badge>
                </TableCell>
                <TableCell>{game.description}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/games/${game.id}`}>
                      <Eye className="h-4 w-4 text-black" />
                    </Link>
                  </Button>

                  {game.creatorId === user.id && (
                    <DeleteButton
                      deleteAction={() => deleteGameAction(game.id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="md:hidden md:w-0">
        {data?.games.map((game) => <GameListTile key={game.id} game={game} />)}
      </ul>

      {data?.games.length === 0 && <EmptyState openModal={openModal} />}
    </div>
  );
}

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No Scoreboards
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new board.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Scoreboard{" "}
        </Button>
      </div>
    </div>
  );
};
