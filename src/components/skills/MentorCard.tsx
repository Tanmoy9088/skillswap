"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { SkillMentor } from "@/types/types/skills";

interface MentorCardProps {
  mentor: SkillMentor;
}

export default function MentorCard({
  mentor,
}: MentorCardProps) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100">
          <Image
            src={mentor.profile_img || "/default-avatar.png"}
            alt={mentor.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-[#17366F]">
            {mentor.name}
          </h3>

          <div className="mt-1 flex items-center gap-1">
            <Star
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm font-semibold text-gray-700">
              {mentor.rating > 0
                ? mentor.rating.toFixed(1)
                : "New"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {mentor.proficiency_level}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#53617A]">
        {mentor.description ||
          mentor.bio ||
          "This mentor hasn't added a description yet."}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">
            Token rate
          </p>

          <p className="font-bold text-[#17366F]">
            {mentor.token_rate} tokens
          </p>
        </div>

        <Link
          href={`/mentors/${mentor.auth_user_id}`}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          View Mentor
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}