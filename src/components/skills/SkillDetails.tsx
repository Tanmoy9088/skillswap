"use client";

import Link from "next/link";
import { ArrowLeft, Coins, Users } from "lucide-react";
import type {
  SkillDetails as SkillDetailsType,
  SkillDiscoveryItem,
} from "@/types/types/skills";
import MentorCard from "../mentors/MentorCard";

interface SkillDetailsProps {
  skill: SkillDetailsType;
  mentors: SkillDiscoveryItem[];
}

export default function SkillDetails({ skill, mentors }: SkillDetailsProps) {
  return (
    <main className="min-h-screen bg-[#F7F7FF]">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Skills
          </Link>

          <div className="mt-8 max-w-4xl">
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-indigo-600">
              {skill.category || "Skill"}
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#17366F] md:text-5xl">
              {skill.skill_name}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#53617A]">
              {skill.description ||
                `Learn ${skill.skill_name} from experienced mentors through SkillSwap+.`}
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-[#F7F7FF] px-5 py-3">
                <Coins size={20} className="text-indigo-600" />

                <div>
                  <p className="text-xs text-gray-400">Starting rate</p>

                  <p className="font-bold text-[#17366F]">
                    {skill.token_rate} tokens
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-[#F7F7FF] px-5 py-3">
                <Users size={20} className="text-indigo-600" />

                <div>
                  <p className="text-xs text-gray-400">Available mentors</p>

                  <p className="font-bold text-[#17366F]">{mentors.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-[#17366F] md:text-3xl">
            Learn from skilled mentors
          </h2>

          <p className="mt-2 text-[#53617A]">
            Choose a mentor and exchange value for knowledge.
          </p>
        </div>

        {mentors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <h3 className="text-lg font-bold text-[#17366F]">
              No mentors available yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Check back later for mentors offering this skill.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
