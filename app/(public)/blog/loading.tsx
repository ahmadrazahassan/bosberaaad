import { Skeleton } from "@/components/ui/misc";

export default function BlogLoading() {
  return (
    <div className="container-site space-y-12 pb-20">
      <Skeleton className="h-4 w-36" />

      <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
        <Skeleton className="h-8 w-40 rounded-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-28 rounded-full" />
        ))}
      </div>

      <Skeleton className="h-64 w-full rounded-3xl" />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
}
