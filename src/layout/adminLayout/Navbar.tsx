"use client";

import Image from "next/image";
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLogout } from "@/hooks/use-logout";

const Navbar = () => {
  const router = useRouter();
  const { mutate: logoutMutate, isPending: isLoggingOut } = useLogout();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        console.error("Logout error:", error.message);
      },
    });
  };

  return (
    <header className="fixed left-72 right-0 top-0 z-50 h-16 border-b border-gray-200/70 bg-[#FAF8FF]/95 px-5 backdrop-blur-md">
      <div className="flex h-full items-center justify-between">
        {/* Left: Search */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search sessions, users, or skills..."
              className="h-10 w-[320px] rounded-xl border border-transparent bg-[#EAEDFF] pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-indigo-200 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-white hover:text-gray-900 hover:shadow-sm"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#FAF8FF]" />
          </button>

          {/* Settings */}
          <button
            type="button"
            aria-label="Settings"
            onClick={() => router.push("/admin/settings")}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-white hover:text-gray-900 hover:shadow-sm"
          >
            <Settings size={19} />
          </button>

          <div className="mx-1 h-8 w-px bg-gray-200" />

          {/* Admin profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-white"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-indigo-100 ring-2 ring-indigo-100">
                <Image
                  src="/image.png"
                  alt="Admin profile"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              </div>

              {/* Admin info */}
              <div className="hidden text-left sm:block">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Admin Panel
                  </h2>

                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                </div>

                <p className="text-xs text-gray-500">System Administrator</p>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  showProfileMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-200/50">
                <div className="border-b border-gray-100 px-3 py-3">
                  <p className="text-sm font-semibold text-gray-900">
                    System Administrator
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Administrator account
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/admin/settings")}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" />

                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
