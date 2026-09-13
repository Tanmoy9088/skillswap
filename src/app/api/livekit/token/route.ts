import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // --------------------------------------------------
    // 1. Read request body
    // --------------------------------------------------

    const body = await request.json();

    const { swapId } = body;

    if (!swapId) {
      return NextResponse.json(
        {
          error: "swapId is required.",
        },
        {
          status: 400,
        },
      );
    }

    // --------------------------------------------------
    // 2. Create Supabase server client
    // --------------------------------------------------

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },

          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Ignore cookie write errors in this context.
            }
          },
        },
      },
    );

    // --------------------------------------------------
    // 3. Get authenticated Supabase user
    // --------------------------------------------------

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("Supabase auth error:", authError);

      return NextResponse.json(
        {
          error: "Unable to verify authentication.",
        },
        {
          status: 401,
        },
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          error: "You must be logged in to join a session.",
        },
        {
          status: 401,
        },
      );
    }

    // --------------------------------------------------
    // 4. Find the swap
    // --------------------------------------------------

    const { data: swap, error: swapError } = await supabase
      .from("swaps")
      .select(
        `
          id,
          learner_auth_user_id,
          mentor_auth_user_id,
          status,
          skill_name,
          scheduled_at,
          duration_minutes
        `,
      )
      .eq("id", swapId)
      .maybeSingle();

    if (swapError) {
      console.error("Swap lookup error:", swapError);

      return NextResponse.json(
        {
          error: "Unable to verify the swap.",
        },
        {
          status: 500,
        },
      );
    }

    if (!swap) {
      return NextResponse.json(
        {
          error: "Swap not found.",
        },
        {
          status: 404,
        },
      );
    }

    // --------------------------------------------------
    // 5. Verify user is a participant
    // --------------------------------------------------

    const isLearner = swap.learner_auth_user_id === user.id;

    const isMentor = swap.mentor_auth_user_id === user.id;

    if (!isLearner && !isMentor) {
      return NextResponse.json(
        {
          error: "You are not a participant in this session.",
        },
        {
          status: 403,
        },
      );
    }

    // --------------------------------------------------
    // 6. Verify session has started
    // --------------------------------------------------

    if (swap.status !== "in_progress") {
      return NextResponse.json(
        {
          error: "The mentor has not started this session yet.",
        },
        {
          status: 409,
        },
      );
    }

    // --------------------------------------------------
    // 7. Verify LiveKit environment variables
    // --------------------------------------------------

    const livekitUrl = process.env.LIVEKIT_URL;

    const livekitApiKey = process.env.LIVEKIT_API_KEY;

    const livekitApiSecret = process.env.LIVEKIT_API_SECRET;

    if (!livekitUrl || !livekitApiKey || !livekitApiSecret) {
      console.error("LiveKit environment variables are missing.");

      return NextResponse.json(
        {
          error: "LiveKit is not configured correctly.",
        },
        {
          status: 500,
        },
      );
    }

    // --------------------------------------------------
    // 8. Generate room name on the server
    // --------------------------------------------------

    const roomName = `swap-${swap.id}`;

    // --------------------------------------------------
    // 9. Use real Supabase auth user ID
    //    as LiveKit participant identity
    // --------------------------------------------------

    const participantName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email ||
      (isMentor ? "Mentor" : "Learner");

    // --------------------------------------------------
    // 10. Generate LiveKit access token
    // --------------------------------------------------

    const token = new AccessToken(livekitApiKey, livekitApiSecret, {
      identity: user.id,
      name: participantName,
      ttl: "2h",
    });

    token.addGrant({
      roomJoin: true,
      room: roomName,

      // Both mentor and learner can use
      // microphone and camera.
      canPublish: true,

      // Both can see/hear each other.
      canSubscribe: true,

      // Allows LiveKit data messages.
      canPublishData: true,
    });

    const participantToken = await token.toJwt();

    // --------------------------------------------------
    // 11. Return token
    // --------------------------------------------------

    return NextResponse.json({
      success: true,

      serverUrl: livekitUrl,

      participantToken,

      roomName,

      participant: {
        id: user.id,
        role: isMentor ? "mentor" : "learner",
        name: participantName,
      },
    });
  } catch (error) {
    console.error("LiveKit token generation error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate LiveKit token.",
      },
      {
        status: 500,
      },
    );
  }
}
