import { Skeleton } from "@/components/ui/misc";

export default function ProfileLoading() {
  return (
    <div className="container-site space-y-16 pb-24">
      <Skeleton className="h-4 w-64" />

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <Skeleton className="size-21 rounded-3xl" />
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>

      <Skeleton className="h-14 w-full rounded-2xl" />

      <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-12">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-full" />
          ))}
          <Skeleton className="h-5 w-2/3" />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-80 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
