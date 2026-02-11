import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex items-start justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl" />
      </header>

      {/* Stats grid */}
      <section className="grid grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2"
          >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </section>

      {/* Submissions list */}
      <section className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16 rounded-full ml-auto" />
              </div>
              <Skeleton className="h-4 w-full mb-1.5" />
              <Skeleton className="h-4 w-2/3 mb-3" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-12 w-24 rounded-xl" />
                <Skeleton className="h-12 w-24 rounded-xl" />
                <Skeleton className="h-12 w-28 rounded-xl ml-auto" />
              </div>
            </div>
            <div className="px-4 py-2.5 bg-stone-50/60 border-t border-stone-100">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
