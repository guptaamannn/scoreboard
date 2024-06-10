"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export default function AvatarToggle({
  imageSrc,
  name,
  isToggled,
  value,
  onToggle,
}: {
  imageSrc?: string;
  name: string;
  value: string;
  isToggled: boolean;
  onToggle: () => void;
}) {
  const [toggle, setToggle] = useState<boolean>(isToggled || false);
  return (
    <div className="flex flex-col items-center space-y-2">
      <Avatar
        onClick={() => {
          setToggle((prev) => !prev);
          onToggle();
        }}
        className={cn(
          toggle ? "ring-2 ring-primary" : "ring-0",
          "cursor-pointer "
        )}
      >
        <AvatarImage
          src={imageSrc || undefined}
          className="object-cover object-center"
        />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <p className="text-sm ">{name}</p>
    </div>
  );
}
