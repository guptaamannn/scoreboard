"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Loader2, User, UserPlus2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Modal from "../shared/Modal";
import { Input } from "../ui/input";
import EmptyMessage from "../shared/Empty";
import { searchUser } from "@/lib/api/user/queries";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LoadingSpinner from "../shared/LoadingSpinner";
import { createFriendAction } from "@/lib/actions/friends";

export default function FriendSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  const {
    data,
    isPending,
    mutate: search,
  } = useMutation({
    mutationFn: async (q: string) => {
      const user = await searchUser(q);
      return user;
    },
  });

  const {
    data: friendRequestData,
    isPending: isPendingFriendRequest,
    mutate: sendFriendRequest,
    isSuccess: isFriendRequestSuccess,
  } = useMutation({
    mutationFn: async (friendId: string) => {
      const friend = await createFriendAction({ user2: friendId });
      return friend;
    },
  });

  return (
    <div>
      <Button
        size={"icon"}
        variant={"secondary"}
        className={cn(className)}
        onClick={() => setOpen(true)}
      >
        <UserPlus2 className="h-5 w-5" />
      </Button>
      <Modal open={open} setOpen={setOpen} title="Add Friend">
        <div className="relative">
          <Input
            placeholder="Username"
            type="text"
            onChange={(e) => search(e.target.value)}
          />
          {isPending && (
            <Loader2 className="absolute right-2 top-2 animate-spin" />
          )}
        </div>

        {data?.users && data?.users.length >= 1 ? (
          <div className="mt-6">
            {data?.users.map((user) => (
              <div key={user.id} className="flex items-center">
                <Avatar>
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback>
                    {user.name ? user.name[0].toUpperCase() : <User />}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="ml-4">{user.name}</p>
                  <p className="ml-4 text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>

                <Button
                  size={"icon"}
                  variant={"secondary"}
                  className="ml-auto"
                  onClick={() => {
                    sendFriendRequest(user.id);
                  }}
                >
                  {isPendingFriendRequest ? (
                    <LoadingSpinner className="h-5 w-5" />
                  ) : (
                    <UserPlus2 className="h-5 w-5" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyMessage message="No users found" />
        )}
      </Modal>
    </div>
  );
}
