import type { Metadata } from "next";

import SkillDetailsClient from "./SkillDetailsClient";

interface SkillDetailsPageProps {
  params: Promise<{
    skillName: string;
  }>;
}

export async function generateMetadata({
  params,
}: SkillDetailsPageProps): Promise<Metadata> {
  const { skillName } = await params;

  const decodedSkillName = decodeURIComponent(skillName).trim();

  return {
    title: `${decodedSkillName} Mentors & Skill Exchange`,

    description: `Find mentors, learn ${decodedSkillName}, share your knowledge, and exchange skills with other learners on SkillSwap+.`,

    alternates: {
      canonical: `/skills/${encodeURIComponent(skillName)}`,
    },

    openGraph: {
      type: "website",
      title: `${decodedSkillName} Mentors & Skill Exchange`,
      description: `Find mentors and learn ${decodedSkillName} through SkillSwap+.`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `SkillSwap+ ${decodedSkillName}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${decodedSkillName} Mentors & Skill Exchange`,
      description: `Find mentors and learn ${decodedSkillName} through SkillSwap+.`,
      images: ["/og-image.png"],
    },
  };
}

export default function SkillDetailsPage() {
  return <SkillDetailsClient />;
}
