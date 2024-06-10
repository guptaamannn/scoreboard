"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => router.back()}
      className={cn(className)}
    >
      <ChevronLeft />
    </Button>
  );
}
