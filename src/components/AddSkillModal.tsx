"use client";

import { useAddSkill } from "@/hooks/skills/useAddSkills";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useGlobalStore } from "@/store/globalState";

const skillSchema = z.object({
  skill_name: z.string().min(2, "Skill name must be at least 2 characters"),

  skill_type: z.enum(["offered", "wanted"]),

  proficiency_level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
});

type SkillFormData = z.infer<typeof skillSchema>;

const AddSkillModal = () => {
  const { mutate: addSkill, isPending } = useAddSkill();

  const isOpen = useGlobalStore((state) => state.isAddSkillOpen);

  const skillType = useGlobalStore((state) => state.skillType);

  const closeAddSkill = useGlobalStore((state) => state.closeAddSkill);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),

    defaultValues: {
      skill_name: "",
      skill_type: skillType,
      proficiency_level: "Beginner",
    },
  });

  const handleClose = () => {
    reset();
    closeAddSkill();
  };

  const onSubmit = (data: SkillFormData) => {
    addSkill(data, {
      onSuccess: () => {
        reset();
        closeAddSkill();
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

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Add Skill</h2>

            <p className="text-sm text-gray-500">Add a skill to your profile</p>
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
          {/* Skill Name */}

          <div>
            <label className="mb-2 block font-medium">Skill Name</label>

            <input
              {...register("skill_name")}
              placeholder="Example: React"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500"
            />

            {errors.skill_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.skill_name.message}
              </p>
            )}
          </div>

          {/* Skill Type */}

          <div>
            <label className="mb-2 block font-medium">Skill Type</label>

            <select
              {...register("skill_type")}
              value={skillType}
              onChange={(e) =>
                setValue("skill_type", e.target.value as "offered" | "wanted")
              }
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="offered">Skill I Offer</option>

              <option value="wanted">Skill I Want</option>
            </select>
          </div>

          {/* Proficiency */}

          <div>
            <label className="mb-2 block font-medium">Proficiency Level</label>

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

          {/* Buttons */}

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
              disabled={isPending}
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
