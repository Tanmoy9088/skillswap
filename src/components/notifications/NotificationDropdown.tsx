"use client";

import {
  CalendarClock,
  Check,
  CheckCheck,
  Clock,
  Coins,
  Handshake,
  Loader2,
  Star,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/notifications/notifications";
import { useNotifications } from "@/hooks/notifications/useNotifications";

interface NotificationDropdownProps {
  onClose?: () => void;
}

const formatNotificationTime = (createdAt: string) => {
  const date = new Date(createdAt);
  const now = new Date();

  const difference = now.getTime() - date.getTime();

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  if (hours < 24) {
    return `${hours}h ago`;
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString();
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "swap_request":
      return Handshake;

    case "swap_accepted":
      return Check;

    case "swap_rejected":
      return X;

    case "schedule_request":
      return CalendarClock;

    case "schedule_confirmed":
      return CalendarClock;

    case "reschedule_proposed":
      return CalendarClock;

    case "reschedule_response":
      return CalendarClock;

    case "swap_started":
      return Clock;

    case "swap_completed":
      return CheckCheck;

    case "rating_received":
      return Star;

    case "token_purchase":
      return Coins;

    default:
      return Clock;
  }
};

const getNotificationIconStyle = (type: string, isRead: boolean) => {
  if (isRead) {
    return "bg-gray-100 text-gray-400";
  }

  switch (type) {
    case "swap_request":
      return "bg-indigo-100 text-indigo-600";

    case "swap_accepted":
      return "bg-green-100 text-green-600";

    case "swap_rejected":
      return "bg-red-100 text-red-600";

    case "schedule_request":
    case "schedule_confirmed":
    case "reschedule_proposed":
    case "reschedule_response":
      return "bg-blue-100 text-blue-600";

    case "swap_started":
      return "bg-amber-100 text-amber-600";

    case "swap_completed":
      return "bg-green-100 text-green-600";

    case "rating_received":
      return "bg-yellow-100 text-yellow-600";

    case "token_purchase":
      return "bg-purple-100 text-purple-600";

    default:
      return "bg-indigo-100 text-indigo-600";
  }
};

const getNotificationRoute = (type: string, relatedId: string | null) => {
  if (!relatedId) {
    return null;
  }

  switch (type) {
    case "swap_request":
      return `/requests?requestId=${relatedId}`;

    case "swap_accepted":
    case "swap_rejected":
    case "swap_cancelled":
      return `/requests?swapId=${relatedId}`;

    case "schedule_request":
    case "schedule_confirmed":
    case "reschedule_proposed":
    case "reschedule_response":
    case "swap_started":
    case "swap_completed":
    case "rating_received":
      return `/swaps/${relatedId}`;

    case "token_purchase":
      return `/tokens`;

    default:
      return null;
  }
};

const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
  const router = useRouter();

  const { data: notifications = [], isLoading, refetch } = useNotifications();

  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  const handleNotificationClick = async (
    notificationId: string,
    type: string,
    isRead: boolean,
  ) => {
    try {
      if (!isRead) {
        await markNotificationAsRead(notificationId);
        await refetch();
      }

      const route = getNotificationRoute(
        type,
        notifications.find((notification) => notification.id === notificationId)
          ?.related_id ?? null,
      );

      if (route) {
        onClose?.();
        router.push(route);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to open notification.",
      );
    }
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) {
      return;
    }

    try {
      setIsMarkingAll(true);

      await markAllNotificationsAsRead();

      await refetch();

      toast.success("All notifications marked as read.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to mark notifications as read.",
      );
    } finally {
      setIsMarkingAll(false);
    }
  };

  return (
    <div className="absolute right-0 top-full z-60 mt-3 w-90 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Notifications</h3>

          <p className="mt-0.5 text-xs text-gray-400">
            {unreadCount > 0
              ? `${unreadCount} unread notification${
                  unreadCount === 1 ? "" : "s"
                }`
              : "You're all caught up"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            disabled={isMarkingAll}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isMarkingAll ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCheck className="h-3.5 w-3.5" />
            )}
            Mark all
          </button>
        )}
      </div>

      <div className="max-h-105 overflow-y-auto">
        {isLoading ? (
          <div className="flex min-h-45 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading notifications...
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex min-h-55 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
              <CheckCheck className="h-6 w-6 text-indigo-500" />
            </div>

            <h4 className="mt-4 text-sm font-bold text-gray-900">
              No notifications
            </h4>

            <p className="mt-1 max-w-60 text-xs leading-5 text-gray-400">
              New activity from your SkillSwap+ account will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() =>
                  handleNotificationClick(
                    notification.id,
                    notification.type,
                    notification.is_read,
                  )
                }
                className={`block w-full border-b border-gray-50 px-5 py-4 text-left transition hover:bg-gray-50 ${
                  !notification.is_read ? "bg-indigo-50/40" : "bg-white"
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative mt-1 shrink-0">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${getNotificationIconStyle(
                        notification.type,
                        notification.is_read,
                      )}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    {!notification.is_read && (
                      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-indigo-600" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-sm ${
                          notification.is_read
                            ? "font-semibold text-gray-700"
                            : "font-bold text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </h4>

                      <span className="shrink-0 text-[10px] text-gray-400">
                        {formatNotificationTime(notification.created_at)}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {notification.message}
                    </p>

                    {!notification.is_read && (
                      <span
                        className="mt-2 inline-flex text-[11px] font-semibold text-indigo-600"
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        Click to open
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="border-t border-gray-100 px-5 py-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-gray-50 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-indigo-50 hover:text-indigo-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
