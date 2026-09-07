import { create } from "zustand";

type SkillType = "offered" | "wanted";

interface GlobalState {
  // Profile modal
  isProfileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;

  // Edit profile modal
  isEditProfileOpen: boolean;
  openEditProfile: () => void;
  closeEditProfile: () => void;

  // Add skill modal
  isAddSkillOpen: boolean;
  skillType: SkillType;
  openAddSkill: (type: SkillType) => void;
  closeAddSkill: () => void;

  // Image upload
  isUploadingImage: boolean;
  setIsUploadingImage: (value: boolean) => void;

  // Selected image
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;

  // Image preview
  preview: string;
  setPreview: (value: string) => void;

  isSwapRequestOpen: boolean;
  selectedSwapSkillId: string | null;

  openSwapRequest: (skillId?: string) => void;
  closeSwapRequest: () => void;
  setSelectedSwapSkillId: (skillId: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  // Profile
  isProfileOpen: false,
  isSwapRequestOpen: false,

  selectedSwapSkillId: null,

  openProfile: () =>
    set({
      isProfileOpen: true,
    }),

  closeProfile: () =>
    set({
      isProfileOpen: false,
    }),

  // Edit Profile
  isEditProfileOpen: false,

  openEditProfile: () =>
    set({
      isEditProfileOpen: true,
    }),

  closeEditProfile: () =>
    set({
      isEditProfileOpen: false,
    }),

  // Add Skill
  isAddSkillOpen: false,

  skillType: "offered",

  openAddSkill: (type) =>
    set({
      isAddSkillOpen: true,
      skillType: type,
    }),

  closeAddSkill: () =>
    set({
      isAddSkillOpen: false,
    }),

  // Image upload loading
  isUploadingImage: false,

  setIsUploadingImage: (value) =>
    set({
      isUploadingImage: value,
    }),

  // Selected image
  selectedImage: null,

  setSelectedImage: (file) =>
    set({
      selectedImage: file,
    }),

  // Preview
  preview: "",

  setPreview: (value) =>
    set({
      preview: value,
    }),
  openSwapRequest: (skillId) =>
    set({
      isSwapRequestOpen: true,
      selectedSwapSkillId: skillId ?? null,
    }),

  closeSwapRequest: () =>
    set({
      isSwapRequestOpen: false,
      selectedSwapSkillId: null,
    }),

  setSelectedSwapSkillId: (skillId) =>
    set({
      selectedSwapSkillId: skillId,
    }),
}));
