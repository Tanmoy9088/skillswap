"use client";

import { useCurrentProfile } from "@/hooks/use-current-profile";
import { useLogout } from "@/hooks/use-logout";
import { useGlobalStore } from "@/store/globalState";
import { useQueryClient } from "@tanstack/react-query";
import { CircleUserRound, LogOut, Settings, X } from "lucide-react";
import { useRouter } from "next/navigation";
import AddSkillModal from "./AddSkillModal";
import Image from "next/image";

const ProfileModal = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: profile } = useCurrentProfile();
  console.log("currentProfile:", profile);

  const { mutate: logout, isPending } = useLogout();

  const isProfileOpen = useGlobalStore((state) => state.isProfileOpen);

  const closeProfile = useGlobalStore((state) => state.closeProfile);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.clear();

        closeProfile();

        router.replace("/login");

        router.refresh();
      },

      onError: (error) => {
        console.error("Logout error:", error.message);
      },
    });
  };

  const handleProfilePage = () => {
    closeProfile();
    router.push("/profile");
  };

  if (!isProfileOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100">
      {/* Background overlay */}
      <div onClick={closeProfile} className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div className="absolute right-6 top-20 w-80 rounded-2xl bg-white p-5 shadow-xl">
        {/* Close */}
        <button
          onClick={closeProfile}
          className="absolute right-4 top-4 rounded-lg p-1 hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* User information */}
        <div className="flex items-center gap-3 border-b pb-5">
          {/* Avatar */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200 font-bold text-indigo-700">
            {/* {profile?.name?.charAt(0)?.toUpperCase()} */}
            <Image
              src={profile?.profile_img || "/image.png"}
              alt={profile.name}
              width={30}
              height={30}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200 font-bold text-indigo-700"
            />
          </div>

          <div className="max-w-45">
            <h3 className="truncate font-semibold">{profile?.name}</h3>

            <p className="truncate text-sm text-gray-500">{profile?.email}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={handleProfilePage}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-indigo-50"
          >
            <CircleUserRound size={20} />
            My Profile
          </button>

          <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-indigo-50">
            <Settings size={20} />
            Settings
          </button>

          <div className="my-1 border-t" />

          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut size={20} />

            {isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
      <AddSkillModal />
    </div>
  );
};

export default ProfileModal;
