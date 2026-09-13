"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { hasCookie } from "cookies-next/client";

import type { SkillDiscoveryItem } from "@/types/types/skills";

interface SkillCardProps {
  skill: SkillDiscoveryItem;
}

export default function SkillCard({ skill }: SkillCardProps) {
  const isAuthenticated = hasCookie("user");

  const skillName = skill.skill_name || "Untitled Skill";

  // Clicking the card will open this specific mentor
  const mentorUrl = isAuthenticated
    ? `/mentors/${skill.auth_user_id}`
    : "/login";

  const rating = Number(skill.average_rating ?? 0);
  const totalRatings = Number(skill.total_ratings ?? 0);
  const tokenRate = Number(skill.token_rate ?? 0);

  return (
    <Link
      href={mentorUrl}
      className="block"
    >
      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        {/* Skill Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          {skill.image_url ? (
            <Image
              src={skill.image_url}
              alt={skillName}
              fill
              className="object-cover transition duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-sm text-gray-400">
                No image available
              </span>
            </div>
          )}

          {/* Category */}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur">
            {skill.category || "Skill"}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Skill Name */}
          <h2 className="line-clamp-1 text-lg font-semibold text-gray-900 transition group-hover:text-indigo-600">
            {skillName}
          </h2>

          {/* Description */}
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
            {skill.description ||
              `Learn ${skillName} from an experienced mentor.`}
          </p>

          {/* Mentor */}
          <div className="mt-4 flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
              {skill.mentor_profile_img ? (
                <Image
                  src={skill.mentor_profile_img}
                  alt={skill.mentor_name || "Mentor"}
                  fill
                  className="object-cover"
                  sizes="40px"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-400">
                  {skill.mentor_name?.charAt(0)?.toUpperCase() || "M"}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {skill.mentor_name || "Unknown Mentor"}
              </p>

              <p className="text-xs text-gray-500">
                {skill.proficiency_level || "Beginner"}
              </p>
            </div>
          </div>

          {/* Rating + Token Rate */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1">
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="text-sm font-medium text-gray-800">
                {rating.toFixed(1)}
              </span>

              <span className="text-xs text-gray-400">
                ({totalRatings})
              </span>
            </div>

            <div className="text-sm font-semibold text-indigo-600">
              {tokenRate} tokens
            </div>
          </div>

          {/* Button */}
          <div className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-indigo-700">
            {isAuthenticated
              ? `View ${skill.mentor_name || "Mentor"}`
              : "Login to View"}
          </div>
        </div>
      </article>
    </Link>
  );
}