import { CompleteFriend } from "@/lib/db/schema/friends";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { getFriendData } from "@/lib/utils";
import { Button } from "../ui/button";
import { UserCheck2 } from "lucide-react";
import { deleteFriendAction, updateFriendAction } from "@/lib/actions/friends";
import { Card } from "../ui/card";
import DeleteButton from "../shared/DeleteButton";

type FriendListTileProps = {
  friend: CompleteFriend;
  userId: string;
};

export default function FriendListTile({
  friend,
  userId,
}: FriendListTileProps) {
  const f = getFriendData({ friend, userId });
  return (
    <Card className="mb-3 flex items-center gap-4 rounded-lg p-4">
      <Avatar>
        <AvatarImage src={f?.image ?? ""} />
        <AvatarFallback className="capitalize">{f.name?.[0]}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 gap-1">
        <div className="font-medium">{f.name}</div>
        <div className="text-sm text-muted-foreground">@{f.username}</div>
        <Badge variant={friend.status === "PENDING" ? "secondary" : "default"}>
          {friend.status}
        </Badge>
      </div>
      <div className="flex gap-2">
        <DeleteButton deleteAction={() => deleteFriendAction(friend.id)} />
        {friend.user1 !== userId && friend.status === "PENDING" && (
          <Button
            size="icon"
            variant="ghost"
            onClick={async () => {
              await updateFriendAction({
                ...friend,
                status: "ACCEPTED",
              });
            }}
          >
            <UserCheck2 className="h-4 w-4 text-green-500" />
          </Button>
        )}
      </div>
    </Card>
  );
}
