"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";

export const useNotificationRealtime = (userAuthUserId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userAuthUserId) {
      return;
    }

    const supabase = createClient();

    const channel = supabase
      .channel(`notifications-${userAuthUserId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_auth_user_id=eq.${userAuthUserId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["notifications"],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userAuthUserId, queryClient]);
};
