import { cn } from "@/lib/utils";
import { Bird } from "lucide-react";

export default function EmptyMessage({
  className,
  message,
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div className={cn("flex flex-col py-4 space-y-4", className)}>
      <Bird className="h-10 w-10 text-muted-foreground" />
      <h4 className="font-semibold text-muted-foreground">
        Nothing to see here!
      </h4>
      <p className="text-muted-foreground font-light text-sm">{message}</p>
    </div>
  );
}
