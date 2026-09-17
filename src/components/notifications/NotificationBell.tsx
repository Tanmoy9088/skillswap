"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import { useNotifications } from "@/hooks/notifications/useNotifications";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: notifications = [] } = useNotifications();

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={
          unreadCount > 0
            ? `${unreadCount} unread notifications`
            : "Notifications"
        }
        aria-expanded={isOpen}
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
          isOpen
            ? "border-indigo-200 bg-indigo-50 text-indigo-600"
            : "border-gray-200 bg-white text-gray-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        }`}
      >
        <Bell
          className={`h-5 w-5 transition-transform duration-200 ${
            unreadCount > 0 ? "animate-pulse" : ""
          }`}
        />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white shadow-sm">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && <NotificationDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default NotificationBell;
