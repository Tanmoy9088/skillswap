import Image from "next/image";
import Link from "next/link";
import HeroImg from "../../../public/images/HomePageHero.png";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Code2,
  Globe2,
  GraduationCap,
  PenTool,
  Repeat,
  Star,
  TrendingUp,
} from "lucide-react";

const ecosystemCategories = [
  {
    icon: <Code2 className="h-5 w-5 text-[#4D44E3]" />,
    title: "Coding",
    desc: "React, Python, AWS, Data Science & more.",
  },
  {
    icon: <PenTool className="h-5 w-5 text-[#4D44E3]" />,
    title: "Design",
    desc: "UI/UX, Typography, Motion Graphics.",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-[#4D44E3]" />,
    title: "Marketing",
    desc: "SEO, Content Strategy, Paid Growth.",
  },
  {
    icon: <Globe2 className="h-5 w-5 text-[#4D44E3]" />,
    title: "Languages",
    desc: "Japanese, Spanish, Arabic, Mandarin.",
  },
];

const steps = [
  {
    num: "1",
    title: "Earn as You Teach",
    desc: "Turn your years of experience into credits. Every lesson you give builds your bank for your own future learning goals.",
  },
  {
    num: "2",
    title: "Redeem for Skills",
    desc: "Browse available mentors. Use your earned credits to book one-on-one sessions that fit your schedule.",
  },
  {
    num: "3",
    title: "Skill Verification",
    desc: "Our peer-review and profile systems help you discover people with relevant experience and skills.",
  },
];

export default function SkillSwapLanding() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#FAF8FF] text-[#111827]">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start lg:col-span-6">
            <span className="mb-6 rounded-full bg-[#E7ECF8] px-4 py-1.5 text-xs font-semibold text-[#4F46E5] sm:text-sm">
              The Future of Peer Learning
            </span>

            <h1 className="mb-6 text-4xl font-black leading-[1.08] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[68px]">
              Learn anything,
              <br />
              teach <span className="text-[#4F46E5]">everything.</span>
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg">
              Join the world&apos;s premier peer-to-peer skill-sharing
              community. Exchange your expertise for new skills in a global
              community where knowledge creates opportunity.
            </p>

            <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
              <Link
                href="/signup"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4D44E3] px-7 py-3.5 font-medium text-white shadow-sm transition hover:bg-[#4338CA] sm:w-auto"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/how-it-works"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E9EEFA] px-6 py-3.5 font-medium text-[#4D44E3] transition hover:bg-[#dfe6f7] sm:w-auto"
              >
                How It Works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:col-span-6 lg:justify-end">
            <div className="relative h-130 w-full max-w-122.5 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={HeroImg}
                alt="Students collaborating"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF]">
                  <BadgeCheck className="h-5 w-5 text-[#4D44E3]" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Top Rated Mentor
                  </p>

                  <p className="text-xs font-bold text-gray-800 sm:text-sm">
                    &ldquo;Swapping Python for Pottery changed my life.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto my-6 max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#F8FAFC] p-4 sm:p-5 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <Image
                className="inline-block h-9 w-9 rounded-full object-cover ring-2 ring-white"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                width={36}
                height={36}
                alt="SkillSwap community member"
              />

              <Image
                className="inline-block h-9 w-9 rounded-full object-cover ring-2 ring-white"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                width={36}
                height={36}
                alt="SkillSwap community member"
              />

              <Image
                className="inline-block h-9 w-9 rounded-full object-cover ring-2 ring-white"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100"
                width={36}
                height={36}
                alt="SkillSwap community member"
              />

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4D44E3] text-[11px] font-bold text-white ring-2 ring-white">
                +50k
              </div>
            </div>

            <p className="text-sm font-semibold text-gray-800">
              Trusted by 50,000+ Lifelong Learners
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4 fill-amber-400 stroke-none"
                />
              ))}
            </div>

            <span className="text-sm font-extrabold text-gray-900">4.9/5</span>

            <span className="text-gray-300">|</span>

            <span className="text-xs font-medium text-gray-500 sm:text-sm">
              Community Trust Score
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-4 lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#DBEAFE] bg-[#EFF4FF] p-6 text-center">
                <Clock className="mb-3 h-6 w-6 text-[#4D44E3]" />

                <span className="text-xs font-bold text-gray-800 sm:text-sm">
                  1 Hour Taught
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl bg-[#4D44E3] p-6 text-center text-white shadow-lg shadow-[#4D44E3]/20">
                <Repeat className="mb-3 h-6 w-6" />

                <span className="text-xs font-bold sm:text-sm">
                  1 Credit Earned
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-2xl bg-[#DCE6FB] p-5 text-center">
              <GraduationCap className="h-5 w-5 text-[#3027BF]" />

              <span className="text-sm font-bold text-[#1E293B]">
                1 Credit = 1 Hour Learning Any Skill
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start lg:col-span-6">
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
              Where Time is the{" "}
              <span className="text-[#4D44E3]">Only Currency</span>
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-gray-600 sm:text-base">
              We&apos;ve removed financial barriers to peer learning. SkillSwap+
              operates on a simple credit-based system. When you teach someone,
              you earn credits that can be used to learn from another member of
              the community.
            </p>

            <div className="space-y-3">
              {[
                "No hidden fees or subscriptions",
                "Equal value for all skills",
                "Global network of experts",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-medium text-gray-800"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#4D44E3]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
            Explore our Ecosystem
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            From technical mastery to creative arts, find the skills and people
            you&apos;ve been looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystemCategories.map((category) => (
            <Link
              key={category.title}
              href="/skills"
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF4FF] transition-colors group-hover:bg-indigo-100">
                {category.icon}
              </div>

              <h3 className="mb-1 text-lg font-bold text-gray-900">
                {category.title}
              </h3>

              <p className="text-xs leading-relaxed text-gray-500 sm:text-sm">
                {category.desc}
              </p>

              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-[#4D44E3] opacity-0 transition-opacity group-hover:opacity-100">
                Explore skills
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col items-start">
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#4D44E3] font-bold text-white shadow-sm">
                {step.num}
              </div>

              <h3 className="mb-2 text-lg font-bold text-[#0F172A]">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-gray-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto my-12 max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center rounded-3xl bg-[#483DE0] p-8 text-center text-white sm:p-14">
          <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Ready to unlock your potential?
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-sm text-white/80 sm:text-base">
            Join a collaborative community and start sharing your knowledge,
            discovering new skills, and growing together.
          </p>

          <div className="flex w-full flex-wrap justify-center gap-4 sm:w-auto">
            <Link
              href="/signup"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#483DE0] transition hover:bg-gray-50 sm:w-auto"
            >
              Join the Community
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/mentors"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20 sm:w-auto"
            >
              Browse Experts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
