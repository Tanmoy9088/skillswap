"use client";

import { GraduationCap, Users } from "lucide-react";

const SwapPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#F7F8FD]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="animate-pulse">
          <div className="h-9 w-48 rounded-lg bg-gray-200" />
          <div className="mt-3 h-5 w-80 rounded-md bg-gray-200" />

          <div className="mt-8 inline-flex w-full rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm sm:w-auto">
            <div className="flex min-w-45 items-center justify-center gap-2 rounded-xl bg-gray-200 px-6 py-3">
              <GraduationCap className="h-5 w-5 text-gray-300" />
              <div className="h-4 w-24 rounded bg-gray-300" />
              <div className="h-5 w-6 rounded-full bg-gray-300" />
            </div>

            <div className="flex min-w-45 items-center justify-center gap-2 rounded-xl px-6 py-3">
              <Users className="h-5 w-5 text-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-5 w-6 rounded-full bg-gray-200" />
            </div>
          </div>

          <section className="mt-10">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gray-200" />

                <div>
                  <div className="h-6 w-32 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-40 rounded bg-gray-200" />
                </div>
              </div>

              <div className="h-9 w-24 rounded-full bg-gray-200" />
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="h-48 bg-gray-200" />

                  <div className="space-y-4 p-5">
                    <div className="h-6 w-3/4 rounded bg-gray-200" />

                    <div className="h-4 w-full rounded bg-gray-200" />

                    <div className="h-4 w-2/3 rounded bg-gray-200" />

                    <div className="flex items-center gap-3 pt-2">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />

                      <div className="space-y-2">
                        <div className="h-4 w-28 rounded bg-gray-200" />
                        <div className="h-3 w-20 rounded bg-gray-200" />
                      </div>
                    </div>

                    <div className="h-10 w-full rounded-xl bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SwapPageSkeleton;
