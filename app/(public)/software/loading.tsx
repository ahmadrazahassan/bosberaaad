import { Skeleton } from "@/components/ui/misc";

export default function DirectoryLoading() {
  return (
    <div className="container-site space-y-12 pb-20">
      <Skeleton className="h-4 w-40" />

      <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
        <Skeleton className="h-8 w-44 rounded-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
        <div className="flex flex-col gap-8">
          {[0, 1, 2].map((group) => (
            <div key={group} className="flex flex-col gap-3">
              <Skeleton className="h-3 w-24" />
              {[0, 1, 2, 3].map((row) => (
                <Skeleton key={row} className="h-9 w-full" />
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="mb-4 h-10 w-full" />
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
