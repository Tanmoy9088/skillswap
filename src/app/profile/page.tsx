"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Pencil,
  Plus,
  Sparkles,
  UserRound,
} from "lucide-react";

import { useCurrentProfile } from "@/hooks/use-current-profile";
import { useUserSkills } from "@/hooks/skills/useUserSkills";
import { useRemoveSkill } from "@/hooks/skills/useRemoveSkills";
import { useGlobalStore } from "@/store/globalState";

import AddSkillModal from "@/components/AddSkillModal";
import EditProfileModal from "@/components/EditProfileModal";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SkillProfileCard from "@/components/skills/SkillProfileCard";
import EmptySkills from "@/components/skills/EmptySkills";

export default function ProfilePage() {
  const { data: profile, isLoading: profileLoading } = useCurrentProfile();

  const { data: skills, isLoading: skillsLoading } = useUserSkills();

  const { mutate: removeSkill, isPending: isRemoving } = useRemoveSkill();

  const openAddSkill = useGlobalStore((state) => state.openAddSkill);

  const openEditProfile = useGlobalStore((state) => state.openEditProfile);

  if (profileLoading) {
    return <LoadingSkeleton />;
  }

  const offeredSkills =
    skills?.filter((skill) => skill.skill_type === "offered") || [];

  const wantedSkills =
    skills?.filter((skill) => skill.skill_type === "wanted") || [];

  const totalSkills = skills?.length || 0;

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F8FC]">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-gray-100 transition hover:-translate-x-1 hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back
        </Link>

        {/* Profile Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-sm">
          {/* Banner */}
          <div className="h-32 bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 sm:h-40">
            <div className="absolute right-8 top-6 opacity-20">
              <Sparkles className="h-20 w-20 text-white" />
            </div>
          </div>

          <div className="px-6 pb-7 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              {/* Profile information */}
              <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end">
                {/* Avatar */}
                <div className="relative w-fit">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-indigo-100 shadow-lg">
                    <Image
                      src={profile?.profile_img || "/image.png"}
                      alt={profile?.name || "Profile"}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-[5%] right-[5%] flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-green-500">
                    <CheckCircle2 size={15} className="text-white" />
                  </div>
                </div>

                {/* Name / email */}
                <div className="">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {profile?.name}
                    </h1>

                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      SkillSwap Member
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">{profile?.email}</p>
                </div>
              </div>

              {/* Edit Profile */}
              <button
                type="button"
                onClick={openEditProfile}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <div className="mt-7 max-w-3xl">
              <div className="flex items-center gap-2">
                <UserRound size={16} className="text-indigo-500" />

                <p className="text-sm font-semibold text-gray-700">About me</p>
              </div>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {profile?.bio ||
                  "No bio added yet. Tell the SkillSwap community a little about yourself."}
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {/* Total Skills */}
          <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-900">
              {totalSkills}
            </p>

            <p className="text-sm text-gray-500">Total Skills</p>
          </div>

          {/* Skills Offered */}
          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <Sparkles className="h-5 w-5 text-green-600" />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-900">
              {offeredSkills.length}
            </p>

            <p className="text-sm text-gray-500">Skills Offered</p>
          </div>

          {/* Skills Wanted */}
          <div className="col-span-2 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm sm:col-span-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <BookOpen className="h-5 w-5 text-purple-600" />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-900">
              {wantedSkills.length}
            </p>

            <p className="text-sm text-gray-500">Skills Wanted</p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* Skills I Offer */}
        {/* ========================================================= */}

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Skills I Offer
                </h2>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Skills you can teach to other members.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openAddSkill("offered")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>

          {skillsLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          ) : offeredSkills.length === 0 ? (
            <EmptySkills type="offered" onAdd={() => openAddSkill("offered")} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offeredSkills.map((skill) => (
                <SkillProfileCard
                  key={skill.id}
                  skill={skill}
                  type="offered"
                  isRemoving={isRemoving}
                  onRemove={() => removeSkill(skill.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* Skills I Want */}
        {/* ========================================================= */}

        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100">
                  <BookOpen className="h-4 w-4 text-green-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  Skills I Want
                </h2>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Skills you want to learn from other members.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openAddSkill("wanted")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>

          {skillsLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          ) : wantedSkills.length === 0 ? (
            <EmptySkills type="wanted" onAdd={() => openAddSkill("wanted")} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wantedSkills.map((skill) => (
                <SkillProfileCard
                  key={skill.id}
                  skill={skill}
                  type="wanted"
                  isRemoving={isRemoving}
                  onRemove={() => removeSkill(skill.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modals */}
      <AddSkillModal />
      <EditProfileModal />
    </main>
  );
}
