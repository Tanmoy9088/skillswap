const AdminSessionsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-4 w-72 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200" />
      </div>

      {/* Stats skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-8 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Sessions skeleton */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="h-11 w-full max-w-xl animate-pulse rounded-xl bg-gray-200" />
          <div className="h-11 w-36 animate-pulse rounded-xl bg-gray-200" />
        </div>

        <div className="overflow-hidden p-6">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-6 border-b pb-4"
              >
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="ml-auto h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSessionsSkeleton;
