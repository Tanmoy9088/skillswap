"use client";

import Image from "next/image";
import { BookOpen, Power, Search, XCircle } from "lucide-react";
import { useMemo } from "react";

import { useAdminSkills } from "@/hooks/admin/useAdminSkills";
import { useDeleteAdminSkill } from "@/hooks/admin/useDeleteAdminSkill";
import { useSkillDiscovery } from "@/store/skillDiscovery";

import AdminSessionsSkeleton from "@/components/admin/sessions/AdminSessionsSkeleton";

const AdminSkillsPage = () => {
  const { data: skills, isLoading, isError, error } = useAdminSkills();

  const search = useSkillDiscovery((state) => state.search);
  const setSearch = useSkillDiscovery((state) => state.setSearch);

  const deleteSkill = useDeleteAdminSkill();

  const filteredSkills = useMemo(() => {
    if (!skills) {
      return [];
    }

    const query = search.trim().toLowerCase();

    if (!query) {
      return skills;
    }

    return skills.filter(
      (skill) =>
        skill.name?.toLowerCase().includes(query) ||
        skill.category?.toLowerCase().includes(query) ||
        skill.description?.toLowerCase().includes(query),
    );
  }, [skills, search]);

  const totalSkills = skills?.length ?? 0;

  const activeSkills = skills?.filter((skill) => skill.is_active).length ?? 0;

  const inactiveSkills =
    skills?.filter((skill) => !skill.is_active).length ?? 0;

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <AdminSessionsSkeleton />
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
                Manage the master skills available on SkillSwap+.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Total */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Skills</p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {totalSkills}
                </p>
              </div>

              <BookOpen className="text-indigo-500" size={24} />
            </div>
          </div>

          {/* Active */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {activeSkills}
                </p>
              </div>

              <Power className="text-green-500" size={24} />
            </div>
          </div>

          {/* Inactive */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive</p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {inactiveSkills}
                </p>
              </div>

              <Power className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        {/* Delete error */}
        {deleteSkill.isError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {deleteSkill.error instanceof Error
              ? deleteSkill.error.message
              : "Failed to deactivate skill."}
          </div>
        )}

        {/* Skills table */}
        <div className="rounded-2xl border bg-white shadow-sm">
          {/* Search */}
          <div className="border-b p-5 sm:p-6">
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search skills or categories..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Empty */}
          {!skills || skills.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-300" />

              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                No skills found
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                There are no master skills available on the platform yet.
              </p>
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center p-8 text-center">
              <Search className="h-10 w-10 text-gray-300" />

              <h2 className="mt-4 font-semibold text-gray-900">
                No matching skills
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Try searching for a different skill or category.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-215 text-left text-sm">
                <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Skill</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Description</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Created</th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredSkills.map((skill) => (
                    <tr key={skill.id} className="transition hover:bg-gray-50">
                      {/* Skill */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {skill.image_url ? (
                            <Image
                              src={skill.image_url}
                              alt={skill.name}
                              width={44}
                              height={44}
                              className="h-11 w-11 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600">
                              {skill.name?.charAt(0).toUpperCase() || "S"}
                            </div>
                          )}

                          <div className="max-w-55">
                            <p className="font-semibold text-gray-900">
                              {skill.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                          {skill.category || "—"}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="max-w-90 px-6 py-4">
                        <p className="truncate text-gray-600">
                          {skill.description || "No description"}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            skill.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              skill.is_active ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />

                          {skill.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                        {new Date(skill.created_at).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        {skill.is_active ? (
                          <button
                            type="button"
                            disabled={deleteSkill.isPending}
                            onClick={() => {
                              const confirmed = window.confirm(
                                `Are you sure you want to deactivate "${skill.name}"?`,
                              );

                              if (!confirmed) {
                                return;
                              }

                              deleteSkill.mutate(skill.id);
                            }}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deleteSkill.isPending
                              ? "Deactivating..."
                              : "Deactivate"}
                          </button>
                        ) : (
                          <span className="text-xs font-medium text-gray-400">
                            Inactive
                          </span>
                        )}
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
