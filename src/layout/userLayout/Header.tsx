"use client";

// import Profile from "@/components/Profile";
import ProfileModal from "@/components/ProfileModal";
import { useCurrentProfile } from "@/hooks/use-current-profile";
// import { useLogout } from "@/hooks/use-logout";
import { useGlobalStore } from "@/store/globalState";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  // const router = useRouter();
  const pathname = usePathname();
  // const queryClient = useQueryClient();

  const { data: profile, isLoading } = useCurrentProfile();

  // const { mutate: logout, isPending } = useLogout();

  const [showHeader, setShowHeader] = useState(true);

  // const handleLogout = () => {
  //   logout(undefined, {
  //     onSuccess: () => {
  //       // Clear TanStack Query cache
  //       queryClient.clear();

  //       // Navigate to login
  //       router.replace("/login");

  //       // Refresh Next.js server components/proxy state
  //       router.refresh();
  //     },

  //     onError: (error) => {
  //       console.error("Logout error:", error.message);
  //     },
  //   });
  // };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openProfile = useGlobalStore((state) => state.openProfile);

  const links = [
    { name: "Home", href: "/" },
    { name: "Feature", href: "/feature" },
    { name: "Community", href: "/community" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border bg-white transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex h-19 items-center justify-around">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#4338CA]">
              SkillSwap+
            </h1>
          </div>

          <div className="flex gap-8 text-md font-bold tracking-tighter">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "font-bold text-[#4F46E5] underline underline-offset-4"
                      : "text-gray-500 hover:text-black"
                  }
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-5">
            {isLoading ? (
              <p>Loading...</p>
            ) : profile ? (
              <>
                <div className="flex gap-2 w-full">
                  {" "}
                  <button
                    onClick={openProfile}
                    className="flex justify-center items-center gap-2 h-14 w-14 rounded-full border border-indigo-600 shadow-lg shadow-indigo-100 "
                  >
                    <Image
                      src={profile?.profile_img || "/image.png"}
                      alt={profile.name}
                      width={30}
                      height={30}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200 font-bold text-indigo-700"
                    />
                  </button>
                  <div className="flex flex-col justify-center items-center bg-blue-50 shadow-lg p-2 rounded-xl">
                    <h3 className="font-bold tracking-tigher text-sm">{profile.name}</h3>
                    <h4 className="font-light text-xs">{profile.email}</h4>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">Sign In</Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-linear-to-l from-[#4D44E3] to-[#4034D7] px-5 py-2.5 text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <ProfileModal />
    </>
  );
};

export default Header;
