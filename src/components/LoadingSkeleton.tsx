import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="mx-auto min-h-screen max-w-5xl overflow-hidden p-8">
      {/* Back button skeleton */}
      <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />

      {/* Profile skeleton */}
      <div className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="h-24 w-24 shrink-0 animate-pulse rounded-full bg-gray-200" />

            {/* User information */}
            <div className="space-y-3">
              <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-80 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Edit button */}
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Skills offered skeleton */}
      <div className="mt-8 rounded-2xl border bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-56 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="h-14 w-32 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-14 w-40 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-14 w-36 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Skills wanted skeleton */}
      <div className="mt-8 rounded-2xl border bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="h-14 w-32 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-14 w-40 animate-pulse rounded-xl bg-gray-200" />
          <div className="h-14 w-36 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
