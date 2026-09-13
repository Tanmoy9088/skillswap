"use client";

import { useParams } from "next/navigation";

import { useMentorProfile } from "@/hooks/skills/useMentorProfile";

import MentorProfile from "@/components/mentors/MentorProfile";

export default function MentorProfileClient() {
  const params = useParams<{ authUserId: string }>();

  const authUserId = params.authUserId
    ? decodeURIComponent(params.authUserId)
    : "";

  const { data, isPending, isError, error } = useMentorProfile(authUserId);

  // Loading
  if (isPending) {
    return (
      <main className="min-h-screen bg-[#F7F7FF] px-6 py-20">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-5 w-32 rounded bg-gray-200" />

          <div className="mt-10 flex items-center gap-6">
            <div className="h-28 w-28 rounded-full bg-gray-200" />

            <div>
              <div className="h-10 w-64 rounded bg-gray-200" />
              <div className="mt-4 h-5 w-96 rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-56 rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Error
  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7FF] px-6">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-red-600">
            Failed to load mentor
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading this mentor."}
          </p>
        </div>
      </main>
    );
  }

  // Mentor not found
  if (!data?.profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7FF] px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#17366F]">
            Mentor not found
          </h1>

          <p className="mt-2 text-gray-500">
            This mentor profile doesn&apos;t exist.
          </p>
        </div>
      </main>
    );
  }

  // Success
  return (
    <MentorProfile
      profile={data.profile}
      skills={data.skills}
      rating={data.rating}
      reviews={data.reviews}
    />
  );
}
