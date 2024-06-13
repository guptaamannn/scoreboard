import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CompleteFriend } from "./db/schema/friends";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type Action = "create" | "update" | "delete";

export type OptimisticAction<T> = {
  action: Action;
  data: T;
};

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};

export const getFriendData = ({ friend, userId }: { friend: CompleteFriend, userId: string }) => {
  let f;
  if (userId === friend.user1) {
    f = friend.user2User;
  } else {
    f = friend.user1User;
  }
  return f;
}