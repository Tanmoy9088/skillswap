"use client";

import NotificationBell from "@/components/notifications/NotificationBell";
import ProfileModal from "@/components/ProfileModal";
import { useNotificationRealtime } from "@/hooks/notifications/useNotificationRealtime";
import { useCurrentProfile } from "@/hooks/use-current-profile";
import { useGlobalStore } from "@/store/globalState";
import { CalendarClock, ChevronDown, Menu, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const { data: profile, isLoading } = useCurrentProfile();

  const openProfile = useGlobalStore((state) => state.openProfile);

  const [showHeader, setShowHeader] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useNotificationRealtime(profile?.auth_user_id);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
        setMobileMenuOpen(false);
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

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Pricing", href: "/pricing" },
    { name: "Find Skills", href: "/skills" },
  ];

  const authenticatedLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Discover Mentors", href: "/mentors" },
    { name: "My Skills", href: "/skills" },
    { name: "Requests", href: "/requests" },
    { name: "Swaps", href: "/swaps" },
    { name: "My Bookings", href: "/bookings" },
    { name: "Wallet", href: "/wallet" },
  ];

  const links = profile ? authenticatedLinks : publicLinks;

  const isLinkActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const isAvailabilityActive =
    pathname === "/availability" || pathname.startsWith("/availability/");

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto mt-3 max-w-375 px-3 sm:px-5 lg:px-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            <div className="flex h-18 items-center px-4 sm:px-6">
              <Link href="/" className="group flex shrink-0 items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-200 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-indigo-200">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>

                <div className="hidden sm:block">
                  <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Skill
                    <span className="text-indigo-600">Swap</span>
                    <span className="text-violet-600">+</span>
                  </h1>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Learn • Teach • Grow
                  </p>
                </div>
              </Link>

              <nav className="mx-auto hidden items-center gap-1 xl:flex">
                {links.map((link) => {
                  const isActive = isLinkActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative rounded-lg px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {link.name}

                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-indigo-600" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="ml-auto hidden shrink-0 items-center gap-2 xl:flex">
                {isLoading ? (
                  <>
                    <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-100" />
                    <div className="h-11 w-11 animate-pulse rounded-full bg-slate-100" />
                  </>
                ) : profile ? (
                  <>
                    <Link
                      href="/availability"
                      className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                        isAvailabilityActive
                          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                      }`}
                    >
                      <CalendarClock
                        className={`h-4 w-4 ${
                          isAvailabilityActive
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-indigo-600"
                        }`}
                      />
                      Availability
                    </Link>

                    <div className="mx-1 h-7 w-px bg-slate-200" />

                    <NotificationBell />

                    <button
                      type="button"
                      onClick={openProfile}
                      className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-1.5 pr-3 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/60 hover:shadow-sm"
                    >
                      <div className="relative">
                        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-indigo-500 to-violet-500 p-0.5">
                          <div className="h-full w-full overflow-hidden rounded-full bg-white">
                            <Image
                              src={profile.profile_img || "/image.png"}
                              alt={profile.name}
                              width={36}
                              height={36}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        </div>

                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                      </div>

                      <div className="max-w-32 text-left">
                        <p className="truncate text-sm font-bold text-slate-900">
                          {profile.name}
                        </p>

                        <p className="truncate text-[10px] text-slate-400">
                          {profile.email}
                        </p>
                      </div>

                      <ChevronDown className="h-4 w-4 text-slate-400 transition-colors group-hover:text-indigo-500" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/signup"
                      className="group rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200"
                    >
                      Get Started
                      <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </>
                )}
              </div>

              <div className="ml-auto flex items-center gap-2 xl:hidden">
                {profile && !isLoading && <NotificationBell />}

                {profile && !isLoading && (
                  <button
                    type="button"
                    onClick={openProfile}
                    className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-indigo-500 to-violet-500 p-0.5"
                    aria-label="Open profile"
                  >
                    <div className="h-full w-full overflow-hidden rounded-full bg-white">
                      <Image
                        src={profile.profile_img || "/image.png"}
                        alt={profile.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  aria-label={
                    mobileMenuOpen
                      ? "Close navigation menu"
                      : "Open navigation menu"
                  }
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="border-t border-slate-100 bg-slate-50/50 px-4 pb-4 pt-3 xl:hidden">
                <nav className="flex flex-col gap-1">
                  {links.map((link) => {
                    const isActive = isLinkActive(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleMobileLinkClick}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-600 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        <span>{link.name}</span>

                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-indigo-600" />
                        )}
                      </Link>
                    );
                  })}

                  {profile && !isLoading && (
                    <Link
                      href="/availability"
                      onClick={handleMobileLinkClick}
                      className={`mt-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                        isAvailabilityActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-600 hover:bg-white hover:text-slate-900"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <CalendarClock className="h-4 w-4" />
                        Availability
                      </span>

                      {isAvailabilityActive && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      )}
                    </Link>
                  )}
                </nav>

                {!profile && !isLoading && (
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
                    <Link
                      href="/login"
                      className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/signup"
                      className="flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-indigo-100"
                    >
                      Get Started
                    </Link>
                  </div>
                )}

                {profile && !isLoading && (
                  <button
                    type="button"
                    onClick={openProfile}
                    className="mt-3 flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-100 hover:bg-indigo-50"
                  >
                    <div className="relative">
                      <Image
                        src={profile.profile_img || "/image.png"}
                        alt={profile.name}
                        width={42}
                        height={42}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-100"
                      />

                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {profile.name}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {profile.email}
                      </p>
                    </div>

                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <ProfileModal />
    </>
  );
};

export default Header;
