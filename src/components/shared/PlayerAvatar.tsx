import { Player } from "@/lib/db/schema/users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

export default function PlayerAvatar({
  player,
  showTooltip,
  className,
}: {
  player: Player;
  showTooltip?: boolean;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar className={cn("cursor-pointer", className)}>
          <AvatarImage src={player.image ?? ""}>
            {/* <Image
              src={player.image ?? ""}
              alt={player.name ?? ""}
              height={40}
              width={40}
            /> */}
          </AvatarImage>
          <AvatarFallback>{player.name![0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      {showTooltip && (
        <TooltipContent>
          <p>{player.name}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
