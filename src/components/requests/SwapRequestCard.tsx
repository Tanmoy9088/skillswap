"use client";

import Image from "next/image";
import { Check, Clock, Coins, X } from "lucide-react";

import type { SwapRequest } from "@/types/types/swaps";

import { useUpdateSwapRequest } from "@/hooks/skills/useUpdateSwapRequest";
import { useAcceptSwapRequest } from "@/hooks/skills/useAcceptSwapRequest";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface SwapRequestCardProps {
  request: SwapRequest;
}

export default function SwapRequestCard({ request }: SwapRequestCardProps) {
  const updateRequest = useUpdateSwapRequest();
  const acceptRequest = useAcceptSwapRequest();

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const supabase = createClient();

  // Get currently logged-in user's auth ID
  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUserId(user?.id ?? null);
    };

    getCurrentUser();
  }, [supabase]);

  const isRequester = currentUserId === request.requester_auth_user_id;

  const isMentor = currentUserId === request.mentor_auth_user_id;

  const handleReject = async () => {
    try {
      await updateRequest.mutateAsync({
        requestId: request.id,
        status: isRequester ? "cancelled" : "rejected",
      });

      alert(
        isRequester
          ? "Swap request cancelled successfully."
          : "Swap request rejected successfully.",
      );
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to update request.",
      );
    }
  };

  const handleAccept = async () => {
    try {
      await acceptRequest.mutateAsync(request.id);

      alert("Swap accepted and tokens transferred successfully.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to accept swap.");
    }
  };

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        {/* Requester */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={request.requester_profile_img || "/default-avatar.png"}
              alt={request.requester_name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div>
            <h2 className="font-bold text-[#17366F]">
              {request.requester_name}
            </h2>

            <p className="text-sm text-gray-500">
              wants to learn{" "}
              <span className="font-semibold text-indigo-600">
                {request.skill_name}
              </span>
            </p>
          </div>
        </div>

        {/* Status */}
        <div>
          {request.status === "pending" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700">
              <Clock size={14} />
              Pending
            </span>
          ) : request.status === "accepted" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              <Check size={14} />
              Accepted
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
              <X size={14} />
              {request.status}
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      {request.message && (
        <div className="mt-5 rounded-xl bg-[#F7F7FF] p-4">
          <p className="text-sm leading-6 text-[#53617A]">
            &quot;{request.message}&quot;
          </p>
        </div>
      )}

      {/* Details */}
      <div className="mt-5 flex flex-wrap gap-3">
        <span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
          {request.proficiency_level}
        </span>

        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600">
          <Coins size={14} />
          {request.token_rate} tokens
        </span>
      </div>

      {/* Actions */}
      {request.status === "pending" && currentUserId && (
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
          {/* Requester:
              Only show Reject/Cancel */}
          {isRequester && (
            <button
              type="button"
              disabled={updateRequest.isPending}
              onClick={handleReject}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={16} />

              {updateRequest.isPending ? "Cancelling..." : "Reject"}
            </button>
          )}

          {/* Mentor:
              Show Reject + Accept */}
          {isMentor && (
            <>
              <button
                type="button"
                disabled={updateRequest.isPending}
                onClick={handleReject}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={16} />

                {updateRequest.isPending ? "Rejecting..." : "Reject"}
              </button>

              <button
                type="button"
                disabled={acceptRequest.isPending}
                onClick={handleAccept}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={16} />

                {acceptRequest.isPending ? "Accepting..." : "Accept"}
              </button>
            </>
          )}
        </div>
      )}
    </article>
  );
}
