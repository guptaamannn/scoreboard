import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Loading() {
  return (
    <div className="grid place-items-center h-full   text-muted-foreground p-4">
      <div role="status">
        <LoadingSpinner className="h-8 w-8" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
