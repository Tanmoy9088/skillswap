"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Heart,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe meaningful learning happens when people connect, share knowledge, and support each other.",
  },
  {
    icon: Lightbulb,
    title: "Learn by Sharing",
    description:
      "Everyone has something valuable to teach. SkillSwap+ turns your knowledge into opportunities to learn something new.",
  },
  {
    icon: Heart,
    title: "Built on Trust",
    description:
      "We are creating a respectful environment where learners and mentors can connect with confidence.",
  },
  {
    icon: Sparkles,
    title: "Keep Growing",
    description:
      "Learning never stops. Our platform is designed to help you continuously develop your skills and discover new possibilities.",
  },
];

const features = [
  "Discover people with skills you want to learn",
  "Share the skills and knowledge you already have",
  "Create flexible skill exchange opportunities",
  "Schedule sessions around your availability",
  "Connect through meaningful one-to-one learning",
  "Use tokens to participate in paid learning sessions",
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                <Sparkles className="h-4 w-4" />
                About SkillSwap+
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Learn something new.
                <span className="block text-indigo-600">
                  Share what you know.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
                SkillSwap+ is a skill-sharing platform designed to bring
                learners and mentors together. Instead of learning alone, you
                can connect with people who have the knowledge you are looking
                for while sharing your own skills with others.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/skills"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
                >
                  Explore Skills
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_25px_70px_rgba(15,23,42,0.08)] sm:p-9">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <BookOpen className="h-7 w-7" />
                </div>

                <h2 className="mt-7 text-2xl font-bold tracking-tight text-slate-900">
                  Learning works better together.
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  Whether you are a developer, designer, musician, language
                  learner, photographer, or simply curious about something new,
                  SkillSwap+ gives you a place to share knowledge and find
                  people who can help you grow.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Teach a skill you know",
                    "Learn a skill you want",
                    "Connect with people",
                    "Grow together",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-600" />
                      <span className="text-sm font-semibold text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-indigo-100 bg-white px-5 py-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Users className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      One community
                    </p>
                    <p className="text-xs text-slate-400">
                      Unlimited possibilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Making knowledge easier to share
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-500">
              SkillSwap+ was created around a simple idea: learning should not
              be limited by where you live, what you studied, or how much
              experience you have. Everyone can be both a learner and a teacher.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                How SkillSwap+ Works
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Your skills have value.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-500">
                SkillSwap+ makes it simple to turn your knowledge into
                meaningful connections. Find a skill you want to learn, share a
                skill you are confident in, and build learning relationships
                around your interests.
              </p>

              <Link
                href="/how-it-works"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-700"
              >
                Learn how it works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-9">
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                      {index + 1}
                    </div>

                    <p className="pt-1 text-sm font-semibold leading-6 text-slate-700">
                      {feature}
                    </p>
                  </div>
                ))}
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
                <MessageCircle className="h-6 w-6" />
              </div>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to learn and share?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
                Join a community where your skills can help someone else while
                you discover something new for yourself.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-indigo-50"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/skills"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/15"
                >
                  Explore Skills
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
