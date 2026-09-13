import type { MetadataRoute } from "next";

import { createClient } from "@/lib/supabase/server";

const siteUrl = "https://skillswap-mu-pied.vercel.app";

interface Skill {
  name: string;
  updated_at?: string | null;
  created_at?: string | null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: skills } = await supabase
    .from("skills")
    .select("name, created_at")
    .eq("is_active", true)
    .order("name");

  const skillUrls: MetadataRoute.Sitemap = ((skills ?? []) as Skill[]).map(
    (skill) => ({
      url: `${siteUrl}/skills/${encodeURIComponent(skill.name)}`,
      lastModified: skill.created_at ? new Date(skill.created_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/mentors`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    ...skillUrls,
  ];
}
