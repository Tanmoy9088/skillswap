"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCurrentProfile } from "@/hooks/use-current-profile";

export const useActiveAccountGuard = () => {
  const router = useRouter();
  const { data: profile } = useCurrentProfile();

  useEffect(() => {
    if (!profile) return;

    if (profile.is_Active === false) {
      const supabase = createClient();

      const signOut = async () => {
        await supabase.auth.signOut();
        router.replace("/login");
      };

      void signOut();
    }
  }, [profile, router]);
};
