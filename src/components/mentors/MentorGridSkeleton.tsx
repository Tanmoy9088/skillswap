export const MentorGridSkeleton = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 animate-pulse rounded-full bg-gray-200" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="mt-5 h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-gray-200" />
        </div>
      ))}
    </div>
  );
};
