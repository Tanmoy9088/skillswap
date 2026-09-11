"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAddSkill } from "@/hooks/skills/useAddSkills";
import { useGlobalStore } from "@/store/globalState";

const skillSchema = z.object({
  skill_name: z.string().min(2, "Skill name must be at least 2 characters"),
  skill_type: z.enum(["offered", "wanted"]),
  proficiency_level: z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ]),
});

type SkillFormData = z.infer<typeof skillSchema>;

const AddSkillModal = () => {
  const { mutate: addSkill, isPending } = useAddSkill();

  const isOpen = useGlobalStore((state) => state.isAddSkillOpen);
  const skillType = useGlobalStore((state) => state.skillType);
  const closeAddSkill = useGlobalStore((state) => state.closeAddSkill);

  const [skillImage, setSkillImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");

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

  useEffect(() => {
    setValue("skill_type", skillType);
  }, [skillType, setValue]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageError("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be smaller than 5MB.");
      return;
    }

    setSkillImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSkillImage(null);
    setImagePreview(null);
    setImageError("");
  };

  const handleClose = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSkillImage(null);
    setImagePreview(null);
    setImageError("");

    reset();
    closeAddSkill();
  };

  const onSubmit = (data: SkillFormData) => {
    addSkill(
      {
        ...data,
        image: skillImage,
      },
      {
        onSuccess: () => {
          if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
          }

          setSkillImage(null);
          setImagePreview(null);
          setImageError("");

          reset();
          closeAddSkill();
        },
        onError: (error) => {
          console.error(error.message);
        },
      },
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Add Skill
            </h2>

            <p className="text-sm text-gray-500">
              Add a skill to your profile
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Skill Image */}
          <div>
            <label className="mb-2 block font-medium text-gray-900">
              Skill Image
            </label>

            {imagePreview ? (
              <div className="relative overflow-hidden rounded-xl border border-gray-200">
                <Image
                  src={imagePreview}
                  alt="Skill preview"
                  width={500}
                  height={280}
                  className="h-48 w-full object-cover"
                  unoptimized
                />

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute right-3 top-3 rounded-full bg-white p-2 text-gray-700 shadow-md hover:bg-gray-100"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition hover:border-indigo-400 hover:bg-indigo-50">
                <ImagePlus className="mb-2 h-8 w-8 text-gray-400" />

                <span className="text-sm font-medium text-gray-700">
                  Upload skill image
                </span>

                <span className="mt-1 text-xs text-gray-400">
                  JPG, PNG or WebP · Max 5MB
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}

            {imageError && (
              <p className="mt-2 text-sm text-red-500">
                {imageError}
              </p>
            )}
          </div>

          {/* Skill Name */}
          <div>
            <label className="mb-2 block font-medium text-gray-900">
              Skill Name
            </label>

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
            <label className="mb-2 block font-medium text-gray-900">
              Skill Type
            </label>

            <select
              {...register("skill_type")}
              value={skillType}
              onChange={(e) =>
                setValue(
                  "skill_type",
                  e.target.value as "offered" | "wanted",
                )
              }
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="offered">Skill I Offer</option>
              <option value="wanted">Skill I Want</option>
            </select>
          </div>

          {/* Proficiency */}
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