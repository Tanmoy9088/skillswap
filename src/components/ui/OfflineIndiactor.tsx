"use client";

import { CheckCircle2, WifiOff } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
};

const getSnapshot = () => navigator.onLine;

const getServerSnapshot = () => true;

const OfflineIndicator = () => {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const [showOnline, setShowOnline] = useState(false);
  const wasOfflineRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOnline) {
      wasOfflineRef.current = true;

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      return;
    }

    if (!wasOfflineRef.current) {
      return;
    }

    wasOfflineRef.current = false;

    timeoutRef.current = window.setTimeout(() => {
          setShowOnline(true);

          timeoutRef.current = window.setTimeout(() => {
            setShowOnline(false);
            timeoutRef.current = null;
          }, 2500);
        }, 0);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isOnline]);

  if (!isOnline) {
    return (
      <div className="fixed inset-x-0 top-0 z-9999 flex items-center justify-center border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 shadow-sm">
        <div className="flex items-center gap-2">
          <WifiOff className="h-4 w-4 shrink-0" />
          <span>
            You are offline. Some SkillSwap+ features may not be available.
          </span>
        </div>
      </div>
    );
  }

  if (showOnline) {
    return (
      <div className="fixed inset-x-0 top-0 z-9999 flex items-center justify-center border-b border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Back online — your connection has been restored.</span>
        </div>
      </div>
    );
  }

  return null;
};

export default OfflineIndicator;
