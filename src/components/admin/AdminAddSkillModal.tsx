"use client";

import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { useCreateAdminSkill } from "@/hooks/admin/useCreateAdminSkill";

interface AdminAddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Technology",
  "Design",
  "Business",
  "Marketing",
  "Finance",
  "Language",
  "Music",
  "Fitness",
  "Education",
  "Other",
];

export default function AdminAddSkillModal({
  isOpen,
  onClose,
}: AdminAddSkillModalProps) {
  const { mutateAsync: createSkill, isPending } = useCreateAdminSkill();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Skill name is required.");
      return;
    }

    if (!category.trim()) {
      setError("Category is required.");
      return;
    }

    if (image) {
      if (!image.type.startsWith("image/")) {
        setError("Please select a valid image.");
        return;
      }

      if (image.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB.");
        return;
      }
    }

    try {
      await createSkill({
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        image,
      });

      setName("");
      setCategory("Technology");
      setDescription("");
      setImage(null);
      setError("");

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create skill.");
    }
  };

  const handleClose = () => {
    if (isPending) return;

    setName("");
    setCategory("Technology");
    setDescription("");
    setImage(null);
    setError("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add New Skill
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a skill to the platform catalog.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Skill Name */}
          <div>
            <label
              htmlFor="skill-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Skill Name
            </label>

            <input
              id="skill-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. React.js"
              disabled={isPending}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="skill-category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <select
              id="skill-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isPending}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="skill-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="skill-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this skill is about..."
              rows={4}
              disabled={isPending}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
            />
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="skill-image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Skill Image
            </label>

            <label
              htmlFor="skill-image"
              className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 px-4 py-4 transition hover:border-blue-400 hover:bg-blue-50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <ImageIcon className="h-5 w-5 text-gray-500" />
              </div>

              <div className="min-w-0 flex-1">
                {image ? (
                  <>
                    <p className="truncate text-sm font-medium text-gray-800">
                      {image.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {(image.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-700">
                      Choose an image
                    </p>

                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG, WEBP — max 5MB
                    </p>
                  </>
                )}
              </div>
            </label>

            <input
              id="skill-image"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              disabled={isPending}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImage(file);
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Adding..." : "Add Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
