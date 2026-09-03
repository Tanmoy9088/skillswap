"use client";

import {
  LayoutDashboard,
  MonitorCheckIcon,
  ReceiptPoundSterlingIcon,
  SearchSlashIcon,
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
    },
    {
      name: "User Management",
      href: "/admin/dashboard/user-management",
      icon: User2,
    },
    {
      name: "Session Management",
      href: "/admin/dashboard/session-management",
      icon: SearchSlashIcon,
    },
    {
      name: "Skill Management",
      href: "/admin/dashboard/skill-management",
      icon: MonitorCheckIcon,
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: ReceiptPoundSterlingIcon,
    },
  ];

  return (
    <>
      <aside className="fixed top-0 left-0 h-[calc(100vh-3rem)] w-72 bg-[#f2f3ff]">
        <div className="px-6 py-8">
          {/* Brand */}
          <div className="h-20">
            <h1 className="text-2xl font-bold">The Curator </h1>{" "}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-4 pt-4">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;

              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex h-11 items-center gap-3 rounded-lg px-4 transition ${
                    isActive
                      ? "bg-[#4F46E5] font-semibold text-white"
                      : "text-gray-600 hover:bg-[#E2DFFF]"
                  }`}
                >
                  <Icon size={20} />

                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
