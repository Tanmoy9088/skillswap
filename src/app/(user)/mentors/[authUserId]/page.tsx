import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

import MentorProfileClient from "./MentorProfileClient";

interface MentorProfilePageProps {
  params: Promise<{
    authUserId: string;
  }>;
}

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

async function getMentorForSeo(
  authUserId: string,
): Promise<MentorProfileData | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_mentor_profile", {
      p_auth_user_id: authUserId,
    });

    if (error || !data) {
      return null;
    }

    return data as MentorProfileData;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: MentorProfilePageProps): Promise<Metadata> {
  const { authUserId } = await params;

  const mentorId = decodeURIComponent(authUserId);

  const data = await getMentorForSeo(mentorId);

  const mentorName = data?.profile?.name?.trim();

  const skillNames = Array.from(
    new Set(
      (data?.skills ?? [])
        .map((skill) => skill.skill_name?.trim())
        .filter((skill): skill is string => Boolean(skill)),
    ),
  );

  const skillText = skillNames.slice(0, 3).join(" & ");

  const title = mentorName
    ? skillText
      ? `${mentorName} – ${skillText} Mentor`
      : `${mentorName} – Mentor`
    : "Mentor Profile";

  const description = mentorName
    ? skillText
      ? `Learn ${skillText} from ${mentorName} on SkillSwap+. Explore their skills, expertise, ratings, reviews, and available learning sessions.`
      : `Learn from ${mentorName} on SkillSwap+. Explore their skills, expertise, ratings, reviews, and available learning sessions.`
    : "Discover mentors, skills, ratings, reviews, and learning sessions on SkillSwap+.";

  return {
    title,
    description,

    alternates: {
      canonical: `/mentors/${encodeURIComponent(mentorId)}`,
    },

    openGraph: {
      type: "profile",
      title: `${title} | SkillSwap+`,
      description,
      url: `/mentors/${encodeURIComponent(mentorId)}`,
      images: [
        {
          url: data?.profile?.profile_img || "/og-image.png",
          width: 1200,
          height: 630,
          alt: mentorName
            ? `${mentorName} – SkillSwap+ Mentor`
            : "SkillSwap+ Mentor Profile",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | SkillSwap+`,
      description,
      images: [data?.profile?.profile_img || "/og-image.png"],
    },
  };
}

export default function MentorProfilePage() {
  return <MentorProfileClient />;
}
