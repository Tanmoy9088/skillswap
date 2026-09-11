"use client";

import {
  BarChart3,
  ChevronRight,
  LayoutDashboard,
  MonitorCheck,
  ReceiptPoundSterling,
  Search,
  ShieldCheck,
  Sparkles,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      description: "Overview & insights",
    },
    {
      name: "User Management",
      href: "/admin/dashboard/user-management",
      icon: User2,
      description: "Manage platform users",
    },
    {
      name: "Session Management",
      href: "/admin/dashboard/session-management",
      icon: Search,
      description: "Monitor swap sessions",
    },
    {
      name: "Skill Management",
      href: "/admin/dashboard/skill-management",
      icon: MonitorCheck,
      description: "Manage listed skills",
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: ReceiptPoundSterling,
      description: "Platform reports",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col overflow-hidden border-r border-indigo-100/70 bg-[#F5F6FF]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="relative flex h-full flex-col">
        {/* Brand */}
        <div className="px-5 pb-5 pt-6">
          <Link
            href="/admin/dashboard"
            className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/70"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 shadow-lg shadow-indigo-200 transition-transform duration-200 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-extrabold tracking-tight text-gray-900">
                The Curator
              </h1>

              <div className="mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-indigo-500" />

                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-500">
                  Admin Console
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-indigo-100 to-transparent" />

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-3 px-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Management
            </p>
          </div>

          <nav className="flex flex-col gap-1.5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;

              const isActive =
                pathname === link.href ||
                (link.href !== "/admin/dashboard" &&
                  pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex min-h-[58px] items-center gap-3 rounded-xl px-3.5 transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-white/90" />
                  )}

                  {/* Icon */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-semibold ${
                        isActive ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {link.name}
                    </p>

                    <p
                      className={`mt-0.5 truncate text-[10px] ${
                        isActive
                          ? "text-indigo-100"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    >
                      {link.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isActive
                        ? "text-white/80"
                        : "text-gray-300 group-hover:translate-x-0.5 group-hover:text-indigo-400"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats / Info */}
          <div className="mt-7">
            <div className="mb-3 px-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Platform
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-white/70 p-4 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-800">
                    Platform Control
                  </p>

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    Monitor SkillSwap+
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />

                <span className="text-[10px] font-semibold text-emerald-700">
                  System operational
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-indigo-100/70 p-4">
          <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                  SkillSwap+
                </p>

                <p className="mt-0.5 text-[10px] text-gray-400">
                  Administration Panel
                </p>
              </div>

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;