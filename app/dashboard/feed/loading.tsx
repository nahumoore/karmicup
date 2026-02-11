import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6">
      {/* Header */}
      <header className="mb-6 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </header>

      {/* Feed list */}
      <section className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
          >
            <div className="p-4">
              {/* Meta row */}
              <div className="flex items-center gap-2 mb-2.5">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Title */}
              <Skeleton className="h-4 w-full mb-1.5" />
              <Skeleton className="h-4 w-3/4 mb-2.5" />

              {/* Context box */}
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 space-y-1.5 mb-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>

              {/* Author */}
              <Skeleton className="h-3 w-24" />
            </div>

            {/* Action bar */}
            <div className="px-4 py-2.5 bg-stone-50/60 border-t border-stone-100 flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-7 w-28 rounded-lg" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
