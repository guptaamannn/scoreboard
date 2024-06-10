"use client";

import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Switch } from "../ui/switch";
import { UpdateGameParams } from "@/lib/db/schema/games";
import { Label } from "../ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateGameAction } from "@/lib/actions/games";
import { toast } from "sonner";

export default function GameEditForm({
  game,
  refetch,
}: {
  game: UpdateGameParams;
  refetch: () => void;
}) {
  const [config, setConfig] = useState(game);

  const mutation = useMutation({
    mutationFn: async () => await updateGameAction(config),
    onSuccess: () => {
      toast.success("Game updated");
      refetch();
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"} size={"icon"}>
          <PencilIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52">
        <p className="font-semibold">Game Settings</p>
        <div className="mt-4 grid grid-cols-3 items-center gap-2">
          <Label className="col-span-2">Show total</Label>
          <Switch
            checked={config.showTotal}
            onCheckedChange={async (v) => {
              setConfig({ ...config, showTotal: v });
              await mutation.mutateAsync();
            }}
          />
          <Label className="col-span-2">Highest wins</Label>
          <Switch
            checked={config.highestWins}
            onCheckedChange={async (v) => {
              setConfig({ ...config, highestWins: v });
              await mutation.mutateAsync();
            }}
          />
          {/* <Label className="col-span-2">Hide opponents</Label>
          <Switch
            checked={config.hideOpponents}
            disabled
            onCheckedChange={async (v) => {
              setConfig({ ...config, hideOpponents: v });
              await mutation.mutateAsync();
            }}
          /> */}
          <Label className="col-span-2">End Game</Label>
          <Switch
            checked={config.ended}
            onCheckedChange={async (v) => {
              setConfig({ ...config, ended: v });
              await mutation.mutateAsync();
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
