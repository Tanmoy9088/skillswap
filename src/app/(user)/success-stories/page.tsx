"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MessageCircle,
  Quote,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const stories = [
  {
    name: "Aarav Mehta",
    role: "Frontend Developer",
    initials: "AM",
    skill: "React & Next.js",
    learned: "UI/UX Design",
    story:
      "I joined SkillSwap+ to improve my design skills while sharing what I know about frontend development. Finding someone who wanted to learn React made the exchange feel natural and rewarding.",
    result: "Built stronger frontend and design skills",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    initials: "PS",
    skill: "UI/UX Design",
    learned: "JavaScript",
    story:
      "I had always wanted to understand JavaScript better. Through SkillSwap+, I connected with a developer who helped me understand the fundamentals while I shared my design experience.",
    result: "Learned practical JavaScript fundamentals",
  },
  {
    name: "Rahul Sen",
    role: "Photography Enthusiast",
    initials: "RS",
    skill: "Photography",
    learned: "Digital Marketing",
    story:
      "SkillSwap+ helped me turn a hobby into something I could share with others. In return, I learned how to promote my photography work and build a stronger online presence.",
    result: "Connected photography with marketing",
  },
  {
    name: "Ananya Roy",
    role: "Language Learner",
    initials: "AR",
    skill: "English Communication",
    learned: "Public Speaking",
    story:
      "Practicing with another learner made a huge difference. SkillSwap+ gave me a comfortable environment to improve my communication while helping someone else become more confident in English.",
    result: "Improved communication confidence",
  },
];

const stats = [
  {
    value: "Learn",
    label: "New skills from people with real experience",
  },
  {
    value: "Share",
    label: "Knowledge that can help someone else grow",
  },
  {
    value: "Connect",
    label: "With people who share your interests",
  },
  {
    value: "Grow",
    label: "Through meaningful learning experiences",
  },
];

const SuccessStoriesPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Community Stories
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Real people.
              <span className="block text-indigo-600">
                Real skills. Real growth.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              SkillSwap+ is built around people helping people. Explore the
              stories of learners and mentors who are sharing knowledge,
              discovering new skills, and growing together.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
              >
                Start Your Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/skills"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Explore Skills
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-xl font-extrabold text-indigo-600">
                {stat.value}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Member Experiences
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Stories from our community
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Every skill exchange starts with curiosity and ends with someone
              knowing a little more than they did before.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {stories.map((story) => (
              <article
                key={story.name}
                className="group relative rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-200/70 sm:p-8"
              >
                <Quote className="absolute right-7 top-7 h-8 w-8 text-indigo-100" />

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-100">
                    {story.initials}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {story.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {story.role}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold text-indigo-700">
                    Offers: {story.skill}
                  </span>

                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-[11px] font-semibold text-violet-700">
                    Learned: {story.learned}
                  </span>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-600">
                  &quot;{story.story}&quot;
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                  <span className="text-xs font-semibold text-slate-600">
                    {story.result}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                More Than Learning
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Build connections while building skills.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-500">
                SkillSwap+ is not just about completing a lesson. It is about
                creating meaningful interactions between people with different
                experiences, interests, and perspectives.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Learn from experience
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Connect with people who can share practical knowledge and
                      personal experience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Users className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Meet like-minded people
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Find learners and mentors who share your interests and
                      goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Keep the conversation going
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Turn one learning session into lasting connections and
                      future opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      A SkillSwap+ Journey
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      From curiosity to confidence
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                    <Star className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      number: "01",
                      title: "Discover",
                      text: "Find a skill or person that matches what you want to learn.",
                    },
                    {
                      number: "02",
                      title: "Connect",
                      text: "Send a request and start a conversation.",
                    },
                    {
                      number: "03",
                      title: "Learn",
                      text: "Schedule a session around your availability.",
                    },
                    {
                      number: "04",
                      title: "Share",
                      text: "Give your own knowledge back to the community.",
                    },
                  ].map((step) => (
                    <div
                      key={step.number}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                        {step.number}
                      </span>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {step.title}
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-indigo-100 bg-white px-5 py-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Keep growing
                    </p>

                    <p className="text-xs text-slate-400">
                      One skill at a time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 to-violet-600 px-7 py-14 text-center shadow-[0_20px_60px_rgba(79,70,229,0.2)] sm:px-12">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Users className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Your story could be next.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
                Share what you know, learn something new, and become part of a
                community where everyone has something valuable to contribute.
              </p>

              <Link
                href="/signup"
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Join SkillSwap+
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SuccessStoriesPage;
