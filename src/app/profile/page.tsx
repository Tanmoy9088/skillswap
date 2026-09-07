"use client";

import { useCurrentProfile } from "@/hooks/use-current-profile";
import { useUserSkills } from "@/hooks/skills/useUserSkills";
import { useRemoveSkill } from "@/hooks/skills/useRemoveSkills";
import { Plus, Pencil, X, CircleArrowLeft } from "lucide-react";
import { useGlobalStore } from "@/store/globalState";
import AddSkillModal from "@/components/AddSkillModal";
import EditProfileModal from "@/components/EditProfileModal";
import Image from "next/image";
import Link from "next/link";
import LoadingSkeleton from "@/components/LoadingSkeleton";

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

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-8 overflow-hidden">
      <Link href={"/"}>
        <CircleArrowLeft />
      </Link>
      {/* PROFILE HEADER */}
      <div className="rounded-2xl border bg-white p-8 shadow-sm mt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-indigo-200 text-3xl font-bold text-indigo-700">
              {/* {profile?.name?.charAt(0)?.toUpperCase()} */}
              <Image
                src={profile?.profile_img || "/image.png"}
                alt="img"
                width={50}
                height={40}
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-indigo-200 text-3xl font-bold text-indigo-700"
              />
            </div>

            {/* User information */}
            <div>
              <h1 className="text-3xl font-bold">{profile?.name}</h1>

              <p className="mt-1 text-gray-500">{profile?.email}</p>

              <p className="mt-3 max-w-xl text-gray-600">
                {profile?.bio || "No bio added yet"}
              </p>
            </div>
          </div>

          {/* Edit button */}
          <button
            onClick={openEditProfile}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* SKILLS OFFERED */}
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Skills I Offer</h2>

            <p className="text-sm text-gray-500">
              Skills you can teach other users
            </p>
          </div>

          <button
            onClick={() => openAddSkill("offered")}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Skill
          </button>
        </div>

        {skillsLoading ? (
          <p>Loading skills...</p>
        ) : offeredSkills.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
            No skills offered yet.
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {offeredSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-3 rounded-xl bg-indigo-100 px-4 py-3"
              >
                <div>
                  <p className="font-semibold">{skill.skill_name}</p>

                  <p className="text-xs text-indigo-600">
                    {skill.proficiency_level}
                  </p>
                </div>

                <button
                  disabled={isRemoving}
                  onClick={() => removeSkill(skill.id)}
                  className="rounded-md p-1 text-red-500 hover:bg-red-100 disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SKILLS WANTED */}
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Skills I Want</h2>

            <p className="text-sm text-gray-500">Skills you want to learn</p>
          </div>

          <button
            onClick={() => openAddSkill("wanted")}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <Plus size={18} />
            Add Skill
          </button>
        </div>

        {skillsLoading ? (
          <p>Loading skills...</p>
        ) : wantedSkills.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-gray-500">
            No skills wanted yet.
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {wantedSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-3 rounded-xl bg-green-100 px-4 py-3"
              >
                <div>
                  <p className="font-semibold">{skill.skill_name}</p>

                  {skill.proficiency_level && (
                    <p className="text-xs text-green-700">
                      {skill.proficiency_level}
                    </p>
                  )}
                </div>

                <button
                  disabled={isRemoving}
                  onClick={() => removeSkill(skill.id)}
                  className="rounded-md p-1 text-red-500 hover:bg-red-100 disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <AddSkillModal />
      <EditProfileModal />
    </div>
  );
}
