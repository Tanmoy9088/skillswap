"use client";

import { useParams } from "next/navigation";

import { useSkillDetails } from "@/hooks/skills/useSkillDetails";

import SkillDetails from "@/components/skills/SkillDetails";

export default function SkillDetailsClient() {
  const params = useParams<{ skillName: string }>();

  const skillName = params.skillName
    ? decodeURIComponent(params.skillName)
    : "";

  const { data, isPending, isError, error } = useSkillDetails(skillName);

  // Loading
  if (isPending) {
    return (
      <main className="min-h-screen bg-[#F7F7FF] px-6 py-20">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-5 w-32 rounded bg-gray-200" />

          <div className="mt-8 h-12 max-w-xl rounded bg-gray-200" />

          <div className="mt-5 h-6 max-w-2xl rounded bg-gray-200" />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 rounded-2xl bg-gray-200"
              />
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
            Failed to load skill
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading the skill."}
          </p>

          <p className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
            Requested skill:{" "}
            <span className="font-semibold">{skillName}</span>
          </p>
        </div>
      </main>
    );
  }

  // Skill not found
  if (!data?.skill) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7FF] px-6">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#17366F]">
            Skill not found
          </h1>

          <p className="mt-3 text-gray-500">
            No offered skill was found for:
          </p>

          <p className="mt-2 font-semibold text-indigo-600">
            {skillName}
          </p>
        </div>
      </main>
    );
  }

  // Success
  return (
    <SkillDetails
      skill={data.skill}
      mentors={data.mentors}
    />
  );
}