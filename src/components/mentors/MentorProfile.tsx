"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Coins, Star } from "lucide-react";

import { useGlobalStore } from "@/store/globalState";

import SwapRequestModal from "./SwapRequestModal";

import type {
  MentorProfile as MentorProfileType,
  MentorSkill,
} from "@/types/types/skills";

interface MentorRating {
  average_rating: number;
  total_ratings: number;
}

interface MentorReview {
  id: string;
  rating: number;
  review: string | null;
  created_at: string;
  reviewer_name: string;
  reviewer_profile_img: string | null;
}

interface MentorProfileProps {
  profile: MentorProfileType;
  skills: MentorSkill[];
  rating: MentorRating;
  reviews?: MentorReview[];
}

export default function MentorProfile({
  profile,
  skills,
  rating,
  reviews = [],
}: MentorProfileProps) {
  const openSwapRequest = useGlobalStore((state) => state.openSwapRequest);

  const offeredSkills = skills.filter(
    (skill) => skill.skill_type === "offered",
  );

  const wantedSkills = skills.filter((skill) => skill.skill_type === "wanted");

  return (
    <main className="min-h-screen bg-[#F7F7FF]">
      {/* Profile Header */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Skills
          </Link>

          <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-center">
            {/* Avatar */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-4 ring-indigo-50">
              <Image
                src={profile.profile_img || "/image.png"}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-[#17366F] md:text-4xl">
                  {profile.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
                  <Star size={15} className="fill-yellow-400 text-yellow-400" />

                  {rating.average_rating > 0
                    ? rating.average_rating.toFixed(1)
                    : "New"}

                  {rating.total_ratings > 0 && (
                    <span className="font-normal text-yellow-600">
                      ({rating.total_ratings})
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-[#53617A]">
                {profile.bio || "This mentor hasn't added a bio yet."}
              </p>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={() => openSwapRequest()}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Request a Swap
            </button>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Offered */}
        <div>
          <h2 className="text-2xl font-bold text-[#17366F]">Skills Offered</h2>

          <p className="mt-2 text-sm text-[#53617A]">
            Skills this mentor can teach.
          </p>

          {offeredSkills.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              No offered skills yet.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {offeredSkills.map((skill) => (
                <SkillItem key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </div>

        {/* Wanted */}
        {wantedSkills.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-[#17366F]">Skills Wanted</h2>

            <p className="mt-2 text-sm text-[#53617A]">
              Skills this mentor wants to learn.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {wantedSkills.map((skill) => (
                <SkillItem key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[#17366F]">
                Mentor Reviews
              </h2>

              <p className="mt-2 text-sm text-[#53617A]">
                Feedback from learners who completed sessions.
              </p>
            </div>

            {rating.total_ratings > 0 && (
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
                <Star size={20} className="fill-yellow-400 text-yellow-400" />

                <span className="text-lg font-bold text-[#17366F]">
                  {rating.average_rating.toFixed(1)}
                </span>

                <span className="text-sm text-gray-500">
                  {rating.total_ratings}{" "}
                  {rating.total_ratings === 1 ? "rating" : "ratings"}
                </span>
              </div>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
              <Star className="mx-auto h-8 w-8 text-gray-300" />

              <p className="mt-3 text-sm font-medium text-gray-600">
                No reviews yet.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Complete a session to leave the first review.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </div>
          )}
        </section>

        <SwapRequestModal
          mentorAuthUserId={profile.auth_user_id}
          skills={skills}
        />
      </section>
    </main>
  );
}

function ReviewItem({ review }: { review: MentorReview }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        {review.reviewer_profile_img ? (
          <Image
            src={review.reviewer_profile_img}
            alt={review.reviewer_name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
            {review.reviewer_name?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1">
          <p className="font-semibold text-gray-900">{review.reviewer_name}</p>

          <div className="mt-1 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                className={
                  star <= review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>

        <span className="text-xs text-gray-400">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
      </div>

      {review.review && (
        <p className="mt-4 text-sm leading-6 text-[#53617A]">
          &quot;{review.review}&quot;
        </p>
      )}
    </article>
  );
}

function SkillItem({ skill }: { skill: MentorSkill }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            {skill.category}
          </span>

          <h3 className="mt-4 text-lg font-bold text-[#17366F]">
            {skill.skill_name}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-1 text-sm font-bold text-[#17366F]">
          <Coins size={16} className="text-indigo-600" />

          {skill.token_rate}
        </div>
      </div>

      <div className="mt-4">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {skill.proficiency_level}
        </span>
      </div>

      {skill.description && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#53617A]">
          {skill.description}
        </p>
      )}
    </article>
  );
}
