"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, Search } from "lucide-react";

import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddSkill } from "@/hooks/mentors/skills/useAddSkills";
import { useGlobalStore } from "@/store/globalState";
import { useAvailableSkills } from "@/hooks/mentors/skills/useAvailableSkills";

/*
============================================================
FORM SCHEMA
============================================================

IMPORTANT:

token_rate has been removed.

Pricing now belongs to user_skill_sessions.
*/

const skillSchema = z.object({
  skill_id: z.string().min(1, "Please select a skill"),

  skill_type: z.enum(["offered", "wanted"]),

  proficiency_level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),

  description: z.string().optional(),
});

type SkillFormData = z.infer<typeof skillSchema>;

const AddSkillModal = () => {
  const { mutate: addSkill, isPending } = useAddSkill();

  const isOpen = useGlobalStore((state) => state.isAddSkillOpen);

  const skillType = useGlobalStore((state) => state.skillType);

  const closeAddSkill = useGlobalStore((state) => state.closeAddSkill);

  const { data: skills = [], isLoading: isLoadingSkills } =
    useAvailableSkills();

  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),

    defaultValues: {
      skill_id: "",

      skill_type: skillType,

      proficiency_level: "Beginner",

      description: "",
    },
  });

  /*
  ============================================================
  UPDATE SKILL TYPE
  ============================================================
  */

  useEffect(() => {
    setValue("skill_type", skillType);
  }, [skillType, setValue]);

  /*
  ============================================================
  FILTER SKILLS
  ============================================================
  */

  const filteredSkills = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return skills;
    }

    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchValue),
    );
  }, [skills, search]);

  /*
  ============================================================
  SELECTED SKILL
  ============================================================
  */

  const selectedSkillId = useWatch({ control, name: "skill_id" });

  const selectedSkill = skills.find((skill) => skill.id === selectedSkillId);

  /*
  ============================================================
  CLOSE
  ============================================================
  */

  const handleClose = () => {
    setSearch("");

    reset({
      skill_id: "",

      skill_type: skillType,

      proficiency_level: "Beginner",

      description: "",
    });

    closeAddSkill();
  };

  /*
  ============================================================
  SUBMIT
  ============================================================
  */

  const onSubmit = (data: SkillFormData) => {
    addSkill(data, {
      onSuccess: () => {
        handleClose();
      },

      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Overlay */}

      <div onClick={handleClose} className="absolute inset-0 bg-black/50" />

      {/* Modal */}

      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Skill</h2>

            <p className="text-sm text-gray-500">
              Select a skill from the available skills
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* ================================================= */}
          {/* SELECT SKILL */}
          {/* ================================================= */}

          <div>
            <label className="mb-2 block font-medium text-gray-900">
              Select Skill
            </label>

            <div className="relative mb-3">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search skills..."
                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
              />
            </div>

            {isLoadingSkills ? (
              <div className="rounded-lg border p-4 text-sm text-gray-500">
                Loading skills...
              </div>
            ) : filteredSkills.length === 0 ? (
              <div className="rounded-lg border p-4 text-center text-sm text-gray-500">
                No skills found.
              </div>
            ) : (
              <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border p-2">
                {filteredSkills.map((skill) => {
                  const isSelected = selectedSkillId === skill.id;

                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() =>
                        setValue("skill_id", skill.id, {
                          shouldValidate: true,
                        })
                      }
                      className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {skill.image_url ? (
                          <Image
                            src={skill.image_url}
                            alt={skill.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900">
                          {skill.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {skill.category}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="text-sm font-semibold text-indigo-600">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {errors.skill_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.skill_id.message}
              </p>
            )}
          </div>

          {/* ================================================= */}
          {/* SELECTED SKILL */}
          {/* ================================================= */}

          {selectedSkill && (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <div className="flex items-center gap-3">
                {selectedSkill.image_url && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src={selectedSkill.image_url}
                      alt={selectedSkill.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}

                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedSkill.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {selectedSkill.category}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================================================= */}
          {/* SKILL TYPE */}
          {/* ================================================= */}

          <div>
            <label className="mb-2 block font-medium text-gray-900">
              Skill Type
            </label>

            <select
              {...register("skill_type")}
              value={skillType}
              onChange={(event) =>
                setValue(
                  "skill_type",
                  event.target.value as "offered" | "wanted",
                )
              }
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="offered">Skill I Offer</option>

              <option value="wanted">Skill I Want</option>
            </select>
          </div>

          {/* ================================================= */}
          {/* PROFICIENCY */}
          {/* ================================================= */}

          <div>
            <label className="mb-2 block font-medium text-gray-900">
              Proficiency Level
            </label>

            <select
              {...register("proficiency_level")}
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="Beginner">Beginner</option>

              <option value="Intermediate">Intermediate</option>

              <option value="Advanced">Advanced</option>

              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <div>
            <label className="mb-2 block font-medium text-gray-900">
              Description
            </label>

            <textarea
              {...register("description")}
              rows={3}
              placeholder={
                skillType === "offered"
                  ? "Describe what you can teach..."
                  : "Describe what you want to learn..."
              }
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* ================================================= */}
          {/* BUTTONS */}
          {/* ================================================= */}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending || isLoadingSkills}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-white disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;
