"use client";

import { CompleteFriend } from "@/lib/db/schema/friends";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Trash2, UserCheck2 } from "lucide-react";
import { deleteFriendAction, updateFriendAction } from "@/lib/actions/friends";

export default function FriendsList({
  friends,
  userId,
}: {
  friends: CompleteFriend[];
  userId: String;
}) {
  return (
    <div>
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
            let friend;
            if (userId === f.user1) {
              friend = f.user2User;
            } else {
              friend = f.user1User;
            }

            return (
              <TableRow key={f.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={friend.image ?? undefined}
                      alt={`${friend.name} avatar`}
                    />
                    <AvatarFallback>{friend.name?.[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{friend.name}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">@{friend.username}</span>
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
                    <Button
                      size="icon"
                      variant={"ghost"}
                      onClick={async () => {
                        await deleteFriendAction(f.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
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
  );
}
