"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LiveKitRoom, VideoConference } from "@livekit/components-react";

import "@livekit/components-styles";

import { useSwapById } from "@/hooks/mentors/skills/useSwapById";
import { useCurrentProfile } from "@/hooks/use-current-profile";

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();

  const swapId = params.swapId as string;

  const { data: profile, isLoading: profileLoading } = useCurrentProfile();

  const {
    data: swap,
    isLoading: swapLoading,
    error: swapError,
  } = useSwapById(swapId);

  const [token, setToken] = useState<string | null>(null);

  const [serverUrl, setServerUrl] = useState<string | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const [joinError, setJoinError] = useState<string | null>(null);

  // --------------------------------------------------
  // Generate LiveKit token
  // --------------------------------------------------

  useEffect(() => {
    if (!profile || !swap) {
      return;
    }

    if (swap.status !== "in_progress") {
      return;
    }

    let cancelled = false;

    const connectToSession = async () => {
      try {
        setIsConnecting(true);
        setJoinError(null);

        const response = await fetch("/api/livekit/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            swapId: swap.id,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to connect to session.");
        }

        if (cancelled) {
          return;
        }

        setToken(data.participantToken);
        setServerUrl(data.serverUrl);
      } catch (error) {
        console.error("Session connection error:", error);

        if (!cancelled) {
          setJoinError(
            error instanceof Error ? error.message : "Unable to join session.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsConnecting(false);
        }
      }
    };

    connectToSession();

    return () => {
      cancelled = true;
    };
  }, [profile, swap]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (profileLoading || swapLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-white" />

          <p className="text-sm text-gray-400">Loading session...</p>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Swap error
  // --------------------------------------------------

  if (swapError || !swap) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
          <h1 className="text-2xl font-bold">Session Not Found</h1>

          <p className="mt-3 text-sm text-gray-400">
            We couldn&apos;t find this SkillSwap session.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-6 rounded-xl bg-white px-5 py-2.5 font-medium text-black transition hover:bg-gray-200"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Participant verification
  // --------------------------------------------------

  if (
    !profile ||
    (profile.auth_user_id !== swap.learner_auth_user_id &&
      profile.auth_user_id !== swap.mentor_auth_user_id)
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-red-900 bg-gray-900 p-8 text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>

          <p className="mt-3 text-sm text-gray-400">
            You are not a participant in this session.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-6 rounded-xl bg-white px-5 py-2.5 font-medium text-black"
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Session hasn't started
  // --------------------------------------------------

  if (swap.status !== "in_progress") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
            <span className="text-3xl">⏳</span>
          </div>

          <h1 className="mt-5 text-2xl font-bold">Session Not Started</h1>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            The mentor has not started the session yet. Please wait until the
            mentor starts the session.
          </p>

          <div className="mt-6 rounded-xl bg-gray-800/70 p-4">
            <p className="text-sm text-gray-400">Skill</p>

            <p className="mt-1 font-semibold">{swap.skill_name}</p>

            {swap.duration_minutes && (
              <p className="mt-2 text-sm text-gray-400">
                {swap.duration_minutes} minutes
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-6 rounded-xl bg-white px-5 py-2.5 font-medium text-black transition hover:bg-gray-200"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Token error
  // --------------------------------------------------

  if (joinError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-red-900 bg-gray-900 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <span className="text-3xl">!</span>
          </div>

          <h1 className="mt-5 text-2xl font-bold">Unable to Join</h1>

          <p className="mt-3 text-sm leading-6 text-red-400">{joinError}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-white px-5 py-2.5 font-medium text-black transition hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // Connecting
  // --------------------------------------------------

  if (isConnecting || !token || !serverUrl) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-white" />

          <h1 className="text-xl font-semibold">Connecting to session...</h1>

          <p className="mt-2 text-sm text-gray-500">
            Preparing your camera and microphone.
          </p>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // LiveKit Room
  // --------------------------------------------------

  return (
    <main className="h-screen w-full bg-black">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
        audio={true}
        video={true}
        data-lk-theme="default"
        className="h-full w-full"
        onDisconnected={() => {
          router.push(`/swaps/${swap.id}`);
        }}
      >
        <VideoConference />
      </LiveKitRoom>
    </main>
  );
}
