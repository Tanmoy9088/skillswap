import { ImageResponse } from "next/og";

import { createClient } from "@/lib/supabase/server";

export const alt = "SkillSwap+ Mentor Profile";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface MentorProfileData {
  profile?: {
    name?: string | null;
    bio?: string | null;
    profile_img?: string | null;
  };
  skills?: Array<{
    skill_name?: string | null;
  }>;
}

export default async function Image({
  params,
}: {
  params: Promise<{ authUserId: string }>;
}) {
  const { authUserId } = await params;

  let data: MentorProfileData | null = null;

  try {
    const supabase = await createClient();

    const { data: mentorData, error } = await supabase.rpc(
      "get_mentor_profile",
      {
        p_auth_user_id: decodeURIComponent(authUserId),
      },
    );

    if (!error && mentorData) {
      data = mentorData as MentorProfileData;
    }
  } catch {
    data = null;
  }

  const mentorName = data?.profile?.name?.trim() || "SkillSwap+ Mentor";

  const profileImage = data?.profile?.profile_img || null;

  const skills = Array.from(
    new Set(
      (data?.skills ?? [])
        .map((skill) => skill.skill_name?.trim())
        .filter((skill): skill is string => Boolean(skill)),
    ),
  ).slice(0, 3);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "60px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 40,
        }}
      >
        <span>SkillSwap+</span>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Mentor image */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#475569",
            overflow: "hidden",
            marginRight: 60,
            flexShrink: 0,
          }}
        >
          {profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profileImage}
              width="280"
              height="280"
              style={{
                objectFit: "cover",
              }}
              alt=""
            />
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: 110,
                fontWeight: 700,
              }}
            >
              {mentorName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Mentor information */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 700,
          }}
        >
          <div
            style={{
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            {mentorName}
          </div>

          <div
            style={{
              fontSize: 30,
              color: "#cbd5e1",
              marginBottom: 30,
            }}
          >
            SkillSwap+ Mentor
          </div>

          {skills.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              {skills.map((skill) => (
                <div
                  key={skill}
                  style={{
                    display: "flex",
                    padding: "12px 20px",
                    borderRadius: 999,
                    background: "#475569",
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #475569",
          paddingTop: 25,
          fontSize: 24,
          color: "#cbd5e1",
        }}
      >
        <span>Learn • Teach • Exchange Skills</span>

        <span>skillswap.vercel.app</span>
      </div>
    </div>,
    {
      width: size.width,
      height: size.height,
    },
  );
}
