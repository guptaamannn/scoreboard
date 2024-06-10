"use client";

import { useQuery } from "@tanstack/react-query";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";
import { Game, insertGameParams, NewGameParams } from "@/lib/db/schema/games";
import { getAcceptedFriends } from "@/lib/api/friends/queries";
import { Textarea } from "../ui/textarea";
import AvatarSelect from "../shared/AvatarToggle";
import { useState } from "react";
import { Player } from "@/lib/db/schema/users";
import { createGame } from "@/lib/api/games/mutations";
import { createGameAction } from "@/lib/actions/games";

const GameForm = ({
  user,
  closeModal,
}: {
  user: Player;
  closeModal: () => void;
}) => {
  const editing = false;
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<NewGameParams>(insertGameParams);
  const [players, setPlayers] = useState<string[]>([]);

  const {
    data: friendsData,
    isLoading: loadingFriends,
    error: friendsDataError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => await getAcceptedFriends(),
  });

  const handleSubmit = async (data: FormData) => {
    setErrors(null);
    const payload = Object.fromEntries(data.entries());
    const gameParsed = await insertGameParams.safeParseAsync({
      ...payload,
      players,
    });

    if (!gameParsed.success) {
      setErrors(gameParsed?.error.flatten().fieldErrors);
      return;
    }

    const values = gameParsed.data;

    await createGameAction(values).then(() => closeModal());
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className="space-y-8">
      <div>
        <Label className={cn("mb-2 inline-block")}>Game Descriptions</Label>
        <Textarea name="description" className={cn()} />
      </div>

      <div>
        <Label className={cn("mb-4 inline-block")}>Select Players</Label>
        {loadingFriends && <div></div>}
        <div className="grid grid-cols-6">
          {user && (
            <AvatarSelect
              name={"You"}
              value={user.id}
              imageSrc={user.image ?? ""}
              isToggled={players.includes(user.id)}
              onToggle={() => {
                setPlayers((prev) => [...prev, user.id]);
              }}
            />
          )}

          {friendsData &&
            friendsData.friends.map((f) => (
              <AvatarSelect
                key={f.id}
                value={f.id}
                name={f.username!}
                imageSrc={f.image ?? ""}
                onToggle={() => {
                  setPlayers((prev) => [...prev, f.id]);
                }}
                isToggled={players.includes(f.id)}
              />
            ))}
        </div>
        {errors?.players && (
          <div className="mt-2 text-sm text-red-500">{errors?.players[0]}</div>
        )}
      </div>

      <SaveButton editing={editing} errors={hasErrors} />
    </form>
  );
};

export default GameForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating}
      aria-disabled={isCreating || isUpdating}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
