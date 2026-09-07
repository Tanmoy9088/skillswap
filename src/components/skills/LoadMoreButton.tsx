"use client";

import { Loader2 } from "lucide-react";

import { useSkillDiscovery } from "@/hooks/skills/useSkillDiscovery";

export default function LoadMoreButton() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSkillDiscovery();

  if (!data) {
    return null;
  }

  const loadedItems = data.pages.reduce(
    (total, page) => total + page.items.length,
    0,
  );

  const total = data.pages[0]?.total ?? 0;

  if (loadedItems >= total || !hasNextPage) {
    return null;
  }

  return (
    <div className="flex justify-center pb-8">
      <button
        type="button"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className="inline-flex min-w-56 items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-6 py-3 font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isFetchingNextPage ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Loading...
          </>
        ) : (
          "Load More Discoveries"
        )}
      </button>
    </div>
  );
}
