"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Learn the basics and start using SkillSwap+.",
    icon: BookOpen,
    href: "/signup",
  },
  {
    title: "Skills & Profiles",
    description: "Manage your skills, profile and expertise.",
    icon: Sparkles,
    href: "/skills",
  },
  {
    title: "Skill Swaps",
    description: "Understand requests, swaps and exchanges.",
    icon: Users,
    href: "/swaps",
  },
  {
    title: "Bookings & Sessions",
    description: "Schedule and manage your learning sessions.",
    icon: Calendar,
    href: "/bookings",
  },
  {
    title: "Tokens & Wallet",
    description: "Understand tokens, balances and transactions.",
    icon: CreditCard,
    href: "/wallet",
  },
  {
    title: "Safety & Trust",
    description: "Learn about verification, ratings and protection.",
    icon: ShieldCheck,
    href: "/privacy",
  },
];

const popularQuestions = [
  "How does SkillSwap+ work?",
  "How do I add a skill?",
  "How do I request a skill swap?",
  "How do I book a session?",
  "How do tokens work?",
  "How can I become a mentor?",
];

const faqs = [
  {
    category: "Getting Started",
    question: "What is SkillSwap+?",
    answer:
      "SkillSwap+ is a skill-sharing platform where people can teach what they know and learn skills from other members. You can create your skill profile, discover people with relevant expertise, send swap requests and schedule sessions.",
  },
  {
    category: "Getting Started",
    question: "How do I create an account?",
    answer:
      "Select the Sign Up option and complete the registration process. After creating your account, complete your profile and add the skills you want to teach or learn.",
  },
  {
    category: "Getting Started",
    question: "Do I need to teach a skill to use SkillSwap+?",
    answer:
      "You can use SkillSwap+ to discover and learn skills. Adding skills that you can teach helps you participate in the wider skill-sharing community.",
  },
  {
    category: "Skills & Profiles",
    question: "How do I add a skill?",
    answer:
      "Go to your skills section and select the option to add a skill. Choose whether the skill is something you offer or something you want to learn, then provide the requested details.",
  },
  {
    category: "Skills & Profiles",
    question: "Can I offer multiple skills?",
    answer:
      "Yes. You can build a broader skill profile by adding multiple skills that you are comfortable teaching.",
  },
  {
    category: "Skills & Profiles",
    question: "Can I update or remove a skill?",
    answer:
      "Yes. Your skill management area allows you to manage the skills associated with your profile.",
  },
  {
    category: "Skill Swaps",
    question: "What is a skill swap?",
    answer:
      "A skill swap is an exchange where one member provides learning or mentoring around a skill while another member receives that learning experience.",
  },
  {
    category: "Skill Swaps",
    question: "How do I send a swap request?",
    answer:
      "Find a skill or member that matches what you want to learn and use the available request option. The recipient can then review and respond to your request.",
  },
  {
    category: "Skill Swaps",
    question: "Where can I see my requests?",
    answer:
      "Your requests are available from the Requests section of your account.",
  },
  {
    category: "Bookings & Sessions",
    question: "How do I book a session?",
    answer:
      "After a swap has been established, open the relevant swap and use the booking or scheduling option to choose an available session time.",
  },
  {
    category: "Bookings & Sessions",
    question: "Can mentors set their availability?",
    answer:
      "Yes. Mentors can configure their available days and time slots so learners can select suitable session times.",
  },
  {
    category: "Bookings & Sessions",
    question: "Where can I see my upcoming sessions?",
    answer:
      "Your scheduled sessions can be accessed from the Bookings section of your account.",
  },
  {
    category: "Tokens & Wallet",
    question: "What are tokens?",
    answer:
      "Tokens are the platform currency used for supported paid learning sessions. Session options can define how many tokens are required for a particular duration.",
  },
  {
    category: "Tokens & Wallet",
    question: "Where can I see my token balance?",
    answer:
      "You can view your current balance and related wallet information from the Wallet section.",
  },
  {
    category: "Tokens & Wallet",
    question: "How are session token rates determined?",
    answer:
      "Mentors can provide session options with different durations and token rates. Available options are shown when a learner schedules a supported session.",
  },
  {
    category: "Safety & Trust",
    question: "How does SkillSwap+ build trust?",
    answer:
      "SkillSwap+ can use profile information, skill details, verification information, ratings and session history to help members make informed decisions when interacting with other members.",
  },
  {
    category: "Safety & Trust",
    question: "What should I do if I have a problem with another member?",
    answer:
      "Keep communication respectful and use the platform's available request, session and support features. If an issue requires assistance, contact SkillSwap+ support with the relevant details.",
  },
];

const HelpCenter = () => {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return faqs;
    }

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-white text-[#113069]">
      <section className="relative overflow-hidden bg-linear-to-br from-[#eef2ff] via-white to-[#f5f3ff] px-6 pb-20 pt-20">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm">
            <CircleHelp className="h-4 w-4" />
            SkillSwap+ Help Center
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            How can we
            <span className="text-indigo-600"> help you?</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Find answers about your account, skills, swaps, bookings, tokens and
            everything else you need to get the most from SkillSwap+.
          </p>

          <div className="mx-auto mt-10 max-w-3xl">
            <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-indigo-100/40">
              <Search className="ml-4 h-5 w-5 shrink-0 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for answers..."
                className="w-full bg-transparent px-4 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              />

              <button
                type="button"
                className="hidden rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 sm:block"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              Explore Help
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Browse by category
            </h2>

            <p className="mt-3 max-w-2xl text-slate-500">
              Find guidance for the part of SkillSwap+ you want to understand.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {category.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9ff] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              Quick Answers
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Popular questions
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => setSearch(question)}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >
                <span className="pr-4 text-sm font-semibold text-slate-700 group-hover:text-indigo-600">
                  {question}
                </span>

                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
              Frequently Asked Questions
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Find your answer
            </h2>

            {search && (
              <p className="mt-3 text-sm text-slate-500">
                Showing results for &quot;{search}&quot;
              </p>
            )}
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const faqIndex = faqs.indexOf(faq);
                const isOpen = openFaq === faqIndex;

                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faqIndex)}
                      className="flex w-full items-center justify-between gap-6 p-6 text-left"
                    >
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                          {faq.category}
                        </span>

                        <h3 className="mt-2 font-semibold text-slate-900">
                          {faq.question}
                        </h3>
                      </div>

                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180 text-indigo-600" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 px-6 pb-6 pt-5">
                        <p className="text-sm leading-7 text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
                <Search className="mx-auto h-10 w-10 text-slate-400" />

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  No results found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try a different search term or contact our support team.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-linear-to-br from-[#4f46e5] to-[#3328a8] px-8 py-16 text-center shadow-xl shadow-indigo-200/40">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
            <CircleHelp className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            Still need help?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
            Can&apos;t find what you&apos;re looking for? Our support team is
            ready to help you with your SkillSwap+ experience.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Contact Support
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-indigo-300 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HelpCenter;
