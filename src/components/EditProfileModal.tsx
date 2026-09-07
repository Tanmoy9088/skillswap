"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImagePlus, X } from "lucide-react";

import { useCurrentProfile } from "@/hooks/use-current-profile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useGlobalStore } from "@/store/globalState";
import { uploadProfileImage } from "@/lib/uploadProfileImage";

interface EditProfileFormData {
  name: string;
  phone: string;
  bio: string;
}

const EditProfileModal = () => {
  // Modal state
  const isOpen = useGlobalStore((state) => state.isEditProfileOpen);

  const closeEditProfile = useGlobalStore((state) => state.closeEditProfile);

  // Image state from Zustand
  const selectedImage = useGlobalStore((state) => state.selectedImage);

  const setSelectedImage = useGlobalStore((state) => state.setSelectedImage);

  const preview = useGlobalStore((state) => state.preview);

  const setPreview = useGlobalStore((state) => state.setPreview);

  const isUploadingImage = useGlobalStore((state) => state.isUploadingImage);

  const setIsUploadingImage = useGlobalStore(
    (state) => state.setIsUploadingImage,
  );

  // Profile
  const { data: profile } = useCurrentProfile();

  // Update mutation
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>();

  // Fill form with existing profile data
  useEffect(() => {
    if (profile && isOpen) {
      reset({
        name: profile.name || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
      });

      setPreview(profile.profile_img || "");
      setSelectedImage(null);
    }
  }, [profile, isOpen, reset, setPreview, setSelectedImage]);

  // Handle image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Optional size validation (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setSelectedImage(file);

    // Create local preview
    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  // Close modal
  const handleClose = () => {
    reset();

    setSelectedImage(null);

    setPreview("");

    closeEditProfile();
  };

  // Submit form
  const onSubmit = async (data: EditProfileFormData) => {
    try {
      let profileImage = profile?.profile_img || "";

      // Upload new image
      if (selectedImage && profile?.auth_user_id) {
        setIsUploadingImage(true);

        profileImage = await uploadProfileImage(
          selectedImage,
          profile.auth_user_id,
        );

        setIsUploadingImage(false);
      }

      // Update profile
      updateProfile(
        {
          name: data.name,
          phone: data.phone,
          bio: data.bio,
          profile_img: profileImage,
        },
        {
          onSuccess: () => {
            setSelectedImage(null);

            closeEditProfile();
          },

          onError: (error) => {
            console.error("Profile update error:", error.message);
          },
        },
      );
    } catch (error) {
      setIsUploadingImage(false);

      console.error("Image upload error:", error);

      alert("Failed to update profile");
    }
  };

  // Don't render if modal is closed
  if (!isOpen) {
    return null;
  }

  const isSaving = isPending || isUploadingImage;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div onClick={handleClose} className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Edit Profile</h2>

            <p className="text-sm text-gray-500">
              Update your profile information
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSaving}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Profile preview"
                className="h-28 w-28 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-indigo-200 text-4xl font-bold text-indigo-700">
                {profile?.name?.charAt(0)?.toUpperCase()}
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              <ImagePlus size={18} />
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {selectedImage && (
              <p className="mt-2 text-xs text-gray-500">{selectedImage.name}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="mb-2 block font-medium">Name</label>

            <input
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block font-medium">Phone</label>

            <input
              {...register("phone")}
              placeholder="Enter your phone number"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="mb-2 block font-medium">Bio</label>

            <textarea
              {...register("bio")}
              rows={4}
              placeholder="Tell others about yourself..."
              className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving}
              className="rounded-lg border px-4 py-2 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploadingImage
                ? "Uploading Image..."
                : isPending
                  ? "Saving..."
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
