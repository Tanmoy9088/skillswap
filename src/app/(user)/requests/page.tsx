"use client";

import { useSwapRequests } from "@/hooks/skills/useSwapRequests";

import SwapRequestCard from "@/components/requests/SwapRequestCard";

export default function RequestsPage() {
  const { data: requests = [], isPending, isError, error } = useSwapRequests();

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#F7F7FF] px-6 py-12">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-9 w-64 rounded bg-gray-200" />

          <div className="mt-8 space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-48 rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7FF] px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-red-600">
            Failed to load requests
          </h1>

          <p className="mt-2 text-sm text-gray-500">{error.message}</p>
        </div>
      </main>
    );
  }

  //   const incomingRequests = requests.filter(
  //     (request) =>
  //       request.mentor_auth_user_id !==
  //       request.requester_auth_user_id
  //   );
  const incomingRequests = requests;
  return (
    <main className="min-h-screen bg-[#F7F7FF] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div>
          <h1 className="text-3xl font-bold text-[#17366F]">Swap Requests</h1>

          <p className="mt-2 text-[#53617A]">
            Manage your learning and teaching requests.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <h2 className="text-xl font-bold text-[#17366F]">
              No swap requests
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your swap requests will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {incomingRequests.map((request) => (
              <SwapRequestCard key={request.id} request={request} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
