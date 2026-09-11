import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { SkillDiscoveryItem } from "@/types/types/skills";
import { hasCookie } from "cookies-next/client";
import { is } from "zod/v4/locales";

interface SkillCardProps {
  skill: SkillDiscoveryItem;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const skillSlug = encodeURIComponent(skill.skill_name);
  const isAuthenticated = hasCookie("user");
  console.log("isAuthenticated", isAuthenticated);

  return (
    <article className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={isAuthenticated?`/skills/${skillSlug}`:`/login`}>
        <div className="relative h-48 overflow-hidden bg-indigo-50">
          {skill.image_url ? (
            <Image
              src={skill.image_url}
              alt={skill.skill_name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl font-bold text-indigo-200">
              {skill.skill_name.charAt(0).toUpperCase()}
            </div>
          )}

          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#17366F] shadow-sm">
            {skill.category}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <Link href={isAuthenticated?`/skills/${skillSlug}`:`/login`}>
          <h3 className="text-lg font-bold text-[#17366F]">
            {skill.skill_name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#53617A]">
          {skill.description ||
            `Learn ${skill.skill_name} from an experienced curator.`}
        </p>

        <div className="my-5 border-t border-indigo-100" />

        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/mentors/${skill.auth_user_id}`}
            className="flex min-w-0 items-center gap-2"
          >
            <Image
              src={skill.mentor_profile_img || "/image.png"}
              alt={skill.mentor_name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#17366F]">
                {skill.mentor_name}
              </p>

              <p className="text-xs text-[#53617A]">
                {skill.proficiency_level}
              </p>
            </div>
          </Link>

          {/* Rating */}
          <div className="flex shrink-0 items-center gap-1">
            <Star size={15} className="fill-yellow-400 text-yellow-400" />

            <span className="text-sm font-semibold text-yellow-600">
              {skill.average_rating > 0
                ? skill.average_rating.toFixed(1)
                : "New"}
            </span>

            {skill.total_ratings > 0 && (
              <span className="text-xs text-gray-400">
                ({skill.total_ratings})
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="font-bold text-indigo-600">
            {skill.token_rate} Token
            <span className="font-normal text-gray-500"> / hr</span>
          </p>

          <Link
            href={`/skills/${skillSlug}`}
            className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
          >
            Swap
          </Link>
        </div>
      </div>
    </article>
  );
}
