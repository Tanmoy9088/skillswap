"use client";

import Image from "next/image";
import { BookOpen, Search, Users, XCircle } from "lucide-react";
import { useMemo } from "react";
import { useAdminSkills } from "@/hooks/admin/useAdminSkills";
import { useDeleteAdminSkill } from "@/hooks/admin/useDeleteAdminSkill";
import { useSkillDiscovery } from "@/store/skillDiscovery";

const AdminSkillsPage = () => {
  const { data: skills, isLoading, isError, error } = useAdminSkills();
  const search = useSkillDiscovery((state) => state.search);
  const setSearch = useSkillDiscovery((state) => state.setSearch);
  const deleteSkill = useDeleteAdminSkill();
  const filteredSkills = useMemo(() => {
    if (!skills) return [];

    const query = search.trim().toLowerCase();

    if (!query) return skills;

    return skills.filter(
      (skill) =>
        skill.skill_name?.toLowerCase().includes(query) ||
        skill.mentor_name?.toLowerCase().includes(query) ||
        skill.category?.toLowerCase().includes(query),
    );
  }, [skills, search]);

  if (isLoading) {
    return (
      <div className="p-6 sm:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-9 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-5 w-80 animate-pulse rounded bg-gray-200" />

          <div className="rounded-2xl border bg-white p-6">
            <div className="mb-6 h-11 w-full animate-pulse rounded-xl bg-gray-100" />

            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 sm:p-8">
        <div className="mx-auto flex min-h-100 max-w-2xl items-center justify-center">
          <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <XCircle className="mx-auto h-12 w-12 text-red-500" />

            <h1 className="mt-4 text-xl font-bold text-gray-900">
              Unable to load skills
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              {error?.message || "Something went wrong while loading skills."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <BookOpen size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Skills Management
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and monitor skills available on SkillSwap+.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Skills</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {skills?.length ?? 0}
                </p>
              </div>

              <BookOpen className="text-indigo-500" size={24} />
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Offered</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {skills?.filter((skill) => skill.skill_type === "offered")
                    .length ?? 0}
                </p>
              </div>

              <Users className="text-green-500" size={24} />
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Wanted</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {skills?.filter((skill) => skill.skill_type === "wanted")
                    .length ?? 0}
                </p>
              </div>

              <BookOpen className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
        {deleteSkill.isError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {deleteSkill.error instanceof Error
              ? deleteSkill.error.message
              : "Failed to delete skill."}
          </div>
        )}
        {/* Skills table */}
        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="border-b p-5 sm:p-6">
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills, mentors or categories..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {!skills || skills.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-300" />

              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                No skills found
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                There are no skills available on the platform yet.
              </p>
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center p-8 text-center">
              <Search className="h-10 w-10 text-gray-300" />

              <h2 className="mt-4 font-semibold text-gray-900">
                No matching skills
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Try searching for a different skill, mentor, or category.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-245 text-left text-sm">
                <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Skill</th>
                    <th className="px-6 py-4 font-semibold">Mentor</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Level</th>
                    <th className="px-6 py-4 font-semibold">Token Rate</th>
                    <th className="px-6 py-4 font-semibold">Created</th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredSkills.map((skill) => (
                    <tr key={skill.id} className="transition hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="max-w-60">
                          <p className="font-semibold text-gray-900">
                            {skill.skill_name || "Unnamed skill"}
                          </p>

                          {skill.description && (
                            <p className="mt-1 truncate text-xs text-gray-500">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={skill.mentor_profile_img || "/image.png"}
                            alt={skill.mentor_name || "Mentor"}
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                          ,
                          <span className="font-medium text-gray-800">
                            {skill.mentor_name || "Unknown user"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            skill.skill_type === "offered"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {skill.skill_type || "Unknown"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {skill.category || "—"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {skill.proficiency_level || "—"}
                      </td>

                      <td className="px-6 py-4 font-semibold text-indigo-600">
                        {skill.token_rate != null
                          ? `${skill.token_rate} tokens`
                          : "—"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {new Date(skill.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          disabled={deleteSkill.isPending}
                          onClick={() => {
                            const confirmed = window.confirm(
                              `Are you sure you want to delete "${skill.skill_name}"?`,
                            );

                            if (!confirmed) return;

                            deleteSkill.mutate(skill.id);
                          }}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deleteSkill.isPending ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSkillsPage;
