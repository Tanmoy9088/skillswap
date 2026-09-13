import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

import SkillDetailsClient from "./SkillDetailsClient";

interface SkillDetailsPageProps {
  params: Promise<{
    skillName: string;
  }>;
}

interface SkillSeoData {
  name: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

async function getSkillForSeo(skillName: string): Promise<SkillSeoData | null> {
  try {
    const supabase = await createClient();

    const decodedSkillName = decodeURIComponent(skillName).trim();

    const { data, error } = await supabase
      .from("skills")
      .select("name, description, image_url, is_active")
      .ilike("name", decodedSkillName)
      .eq("is_active", true)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as SkillSeoData;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: SkillDetailsPageProps): Promise<Metadata> {
  const { skillName } = await params;

  const decodedSkillName = decodeURIComponent(skillName).trim();

  const skill = await getSkillForSeo(skillName);

  const actualSkillName = skill?.name || decodedSkillName;

  const description =
    skill?.description?.trim() ||
    `Find mentors, learn ${actualSkillName}, share your knowledge, and exchange skills with other learners on SkillSwap+.`;

  const socialImage = skill?.image_url || "/images/og-image.png";

  return {
    title: `${actualSkillName} Mentors & Skill Exchange`,

    description,

    alternates: {
      canonical: `/skills/${encodeURIComponent(skillName)}`,
    },

    openGraph: {
      type: "website",

      title: `${actualSkillName} Mentors & Skill Exchange`,

      description,

      url: `/skills/${encodeURIComponent(skillName)}`,

      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `SkillSwap+ ${actualSkillName}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: `${actualSkillName} Mentors & Skill Exchange`,

      description,

      images: [socialImage],
    },
  };
}

export default function SkillDetailsPage() {
  return <SkillDetailsClient />;
}
