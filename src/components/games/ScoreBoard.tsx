"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

import { GameById, GameId } from "@/lib/db/schema/games";
import { Player } from "@/lib/db/schema/users";
import { useGameById } from "@/lib/hooks/useGameById";
import { insertRoundParams } from "@/lib/db/schema/rounds";
import { createRoundAction } from "@/lib/actions/rounds";
import { NewScore } from "@/lib/db/schema/score";
import { cn } from "@/lib/utils";

import Modal from "../shared/Modal";
import BackButton from "../shared/BackButton";
import GameEditForm from "./GameEditForm";
import ScoreTable from "./ScoreTable";

const ScoreBoard = ({
  userId,
  gameId,
  user,
}: {
  userId?: string;
  gameId: GameId;
  user: Player;
}) => {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useGameById(gameId);

  const closeModal = async () => {
    setOpen(false);
    await refetch();
  };

  if (!data) return null;
  const game = data.game;

  return (
    <div className="relative space-y-6">
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add Score"
        description="Add points for each player"
      >
        <ScoreForm game={data.game} closeModal={closeModal} />
      </Modal>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackButton />
              <div className="flex -space-x-3">
                {game?.players.map((p) => (
                  <Avatar key={p.id}>
                    <AvatarImage src={p.image ?? ""} />
                    <AvatarFallback>{p.name![0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
            {user.id === data.game?.creatorId && (
              <GameEditForm game={data.game} refetch={refetch} />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <h1 className="text-2xl font-semibold">{game?.description}</h1>
          <p className="">{format(game!.createdAt, "dd MMM yyyy")}</p>
          <p className="text-sm text-muted-foreground">
            {format(game!.createdAt, "HH:mm a")}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <div className="flex items-center space-x-2">
            <p>Created by: </p>
            <Avatar className="h-8 w-8">
              <AvatarImage src={game?.creator.image ?? ""} />
              <AvatarFallback>{game?.creator.name![0]}</AvatarFallback>
            </Avatar>
            <p>{game?.creator.username}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            {game?.highestWins ? "Highest" : "Lowest"} total wins!
          </p>
        </CardFooter>
        <div
          className={cn("hidden", game?.creatorId === user.id && "md:block")}
        ></div>
      </Card>

      <ScoreTable game={game} />

      {game?.creatorId === userId && !game?.ended && (
        <div className="mt-6 flex w-full justify-end">
          <Button
            variant={"secondary"}
            className=""
            onClick={() => setOpen(true)}
          >
            Add Scores
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;

const ScoreForm = ({
  game,
  closeModal,
}: {
  game: GameById;
  closeModal: () => void;
}) => {
  const handleSubmit = async (data: FormData) => {
    const payload = Object.fromEntries(data.entries());
    const values: NewScore[] = Object.entries(payload).map(([k, v]) => ({
      playerId: k,
      points: Number(v),
      gameId: game?.id!,
    }));

    const roundParsed = await insertRoundParams.safeParseAsync({
      scores: values,
      gameId: game?.id!,
      creatorId: game?.creatorId!,
    });

    if (!roundParsed.success) {
      return;
    }

    await createRoundAction(roundParsed.data);
    closeModal();
  };

  return (
    <form action={handleSubmit}>
      <div>
        {game?.players.map((p) => (
          <div key={p.id} className="my-2 grid grid-cols-3 gap-2">
            <p>{p.username}</p>
            <Input className="col-span-2" name={p.id!} required />
          </div>
        ))}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};
