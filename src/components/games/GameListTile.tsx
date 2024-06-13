import { CompleteGame } from "@/lib/db/schema/games";
import { Card } from "../ui/card";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { ChevronRightIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function GameTile({ game }: { game: CompleteGame }) {
  return (
    <Link href={`/games/${game.id}`} prefetch>
      <Card className="relative flex items-center gap-4 rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="grid flex-1 gap-1.5">
          <div className="text-sm font-medium">
            {format(game.createdAt, "MMM dd, yyyy")}
          </div>
          <p className="text-xs font-light">
            {format(game.createdAt, "h:mm a")}
          </p>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {game.description}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant={game.ended ? "destructive" : "default"}>
              {game.ended ? "Ended" : "Ongoing"}
            </Badge>
            <ChevronRightIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="absolute right-4 top-4 flex flex-row-reverse justify-end -space-x-3 space-x-reverse">
          {game.players.map((p) => (
            <Avatar key={p.id} className="h-8 w-8">
              <AvatarImage src={p.image ?? ""} />
              <AvatarFallback>{p.username![0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </Card>
    </Link>
  );
}
