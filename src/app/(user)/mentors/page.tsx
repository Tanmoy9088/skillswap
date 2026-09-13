import type { Metadata } from "next";

import MentorsClient from "./MentorsClient";

export const metadata: Metadata = {
  title: "Find Expert Mentors",
  description:
    "Discover skilled mentors on SkillSwap+. Find people who can help you learn new skills, improve your expertise, and exchange knowledge.",

  alternates: {
    canonical: "/mentors",
  },

  openGraph: {
    type: "website",
    title: "Find Expert Mentors | SkillSwap+",
    description:
      "Discover skilled mentors on SkillSwap+. Find people who can help you learn new skills and improve your expertise.",
    url: "/mentors",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Find Expert Mentors on SkillSwap+",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Find Expert Mentors | SkillSwap+",
    description:
      "Discover skilled mentors on SkillSwap+. Find people who can help you learn new skills and improve your expertise.",
    images: ["/og-image.png"],
  },
};

export default function MentorsPage() {
  return <MentorsClient />;
}
