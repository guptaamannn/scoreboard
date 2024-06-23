"use client";

import { CompleteFriend } from "@/lib/db/schema/friends";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { UserCheck2 } from "lucide-react";
import { deleteFriendAction, updateFriendAction } from "@/lib/actions/friends";
import FriendListTile from "./FriendListTile";
import { getFriendData } from "@/lib/utils";
import DeleteButton from "../shared/DeleteButton";
import PlayerAvatar from "../shared/PlayerAvatar";

export default function FriendsList({
  friends,
  userId,
}: {
  friends: CompleteFriend[];
  userId: string;
}) {
  return (
    <div>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {friends.map((f) => {
              const friendParsed = getFriendData({ friend: f, userId });
              return (
                <TableRow key={f.id}>
                  <TableCell>
                    <PlayerAvatar player={friendParsed} />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{friendParsed.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      @{friendParsed.username}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={f.status === "PENDING" ? "secondary" : "default"}
                    >
                      {f.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <DeleteButton
                        deleteAction={() => deleteFriendAction(f.id)}
                      />
                      {f.user1 !== userId && f.status === "PENDING" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={async () => {
                            await updateFriendAction({
                              ...f,
                              status: "ACCEPTED",
                            });
                          }}
                        >
                          <UserCheck2 className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden">
        {friends.map((f, i) => (
          <FriendListTile key={f.id} friend={f} userId={userId} />
        ))}
      </div>
    </div>
  );
}
