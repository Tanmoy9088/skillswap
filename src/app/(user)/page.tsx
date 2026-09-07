import React from "react";
import Image from "next/image";
// import Link from "next/link";
import HeroImg from "../../../public/images/HomePageHero.png";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Repeat,
  GraduationCap,
  CheckCircle2,
  Code2,
  PenTool,
  TrendingUp,
  Globe2,
  Star,
  // Share2,
} from "lucide-react";

export default function SkillSwapLanding() {
  const ecosystemCategories = [
    {
      icon: <Code2 className="w-5 h-5 text-[#4D44E3]" />,
      title: "Coding",
      desc: "React, Python, AWS, Data Science & more.",
    },
    {
      icon: <PenTool className="w-5 h-5 text-[#4D44E3]" />,
      title: "Design",
      desc: "UI/UX, Typography, Motion Graphics.",
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#4D44E3]" />,
      title: "Marketing",
      desc: "SEO, Content Strategy, Paid Growth.",
    },
    {
      icon: <Globe2 className="w-5 h-5 text-[#4D44E3]" />,
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
      desc: "Browse thousands of available mentors. Use your earned credits to book 1-on-1 sessions that fit your schedule.",
    },
    {
      num: "3",
      title: "Skill Verification",
      desc: "Our robust peer-review system and portfolio verification ensure you are learning from real experts in the field.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-[#FAF8FF] text-[#111827] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="bg-[#E7ECF8] text-[#4F46E5] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              The Future of Peer Learning
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-black tracking-tight text-[#0F172A] leading-[1.08] mb-6">
              Learn anything, <br />
              teach <span className="text-[#4F46E5]">everything.</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
              Join the world&apos;s premier peer-to-peer barter network.
              Exchange your expertise for new skills in a global community where
              time is the only currency.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#4D44E3] hover:bg-[#4338CA] text-white font-medium px-7 py-3.5 rounded-xl shadow-sm transition">
                Get Started Free
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E9EEFA] hover:bg-[#dfe6f7] text-[#4D44E3] font-medium px-6 py-3.5 rounded-xl transition">
                How it Works <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-122.5 h-130 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={HeroImg}
                alt="Students collaborating"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Floating Quote Badge */}
              <div className="absolute bottom-5 inset-x-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5 text-[#4D44E3]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Top Rated Mentor
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-gray-800">
                    &ldquo;Swapping Python for Pottery changed my life.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF / TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 my-6">
        <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Avatars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <Image
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                width={20}
                height={20}
                alt="User"
              />
              <Image
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="User"
                width={20}
                height={20}
              />
              <Image
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100"
                alt="User"
                width={20}
                height={20}
              />
              <div className="h-9 w-9 rounded-full ring-2 ring-white bg-[#4D44E3] text-[11px] font-bold text-white flex items-center justify-center">
                +50k
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              Trusted by 50,000+ Lifelong Learners
            </p>
          </div>

          {/* Right Rating */}
          <div className="flex items-center gap-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
              ))}
            </div>
            <span className="font-extrabold text-sm text-gray-900">4.9/5</span>
            <span className="text-gray-300">|</span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              Community Trust Score
            </span>
          </div>
        </div>
      </section>

      {/* 3. TIME AS CURRENCY SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Interactive Flow Visual */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#EFF4FF] border border-[#DBEAFE] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                <Clock className="w-6 h-6 text-[#4D44E3] mb-3" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  1 Hour Taught
                </span>
              </div>

              <div className="bg-[#4D44E3] text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-[#4D44E3]/20">
                <Repeat className="w-6 h-6 mb-3" />
                <span className="text-xs sm:text-sm font-bold">
                  1 Credit Earned
                </span>
              </div>
            </div>

            <div className="bg-[#DCE6FB] rounded-2xl p-5 flex items-center justify-center gap-3 text-center">
              <GraduationCap className="w-5 h-5 text-[#3027bf]" />
              <span className="text-sm font-bold text-[#1E293B]">
                1 Credit = 1 Hour Learning Any Skill
              </span>
            </div>
          </div>

          {/* Explanatory Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-5 tracking-tight">
              Where Time is the{" "}
              <span className="text-[#4D44E3]">Only Currency</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              We&apos;ve removed the financial barriers to education. SkillSwap+
              operates on a simple, fair, credit-based system. When you teach
              someone for an hour, you earn a credit. You can redeem that credit
              to learn anything from anyone else in the community.
            </p>

            <div className="space-y-3">
              {[
                "No hidden fees or subscriptions",
                "Equal value for all skills",
                "Global network of experts",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-sm font-medium text-gray-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#4D44E3]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ECOSYSTEM CARDS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Explore our Ecosystem
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            From technical mastery to creative arts, find the mentor you&apos;ve
            been looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemCategories.map((cat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center mb-5">
                {cat.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {cat.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS / STEPS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <div className="w-9 h-9 rounded-xl bg-[#4D44E3] text-white font-bold flex items-center justify-center mb-5 shadow-sm">
                {step.num}
              </div>
              <h3 className="font-bold text-lg text-[#0F172A] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 my-12">
        <div className="bg-[#483DE0] text-white rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
            Ready to unlock your potential?
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join the world&apos;s most collaborative community and start
            bartering your way to mastery today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white text-[#483DE0] font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition">
              Join the Community
            </button>
            <button className="w-full sm:w-auto border border-white/40 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition">
              Browse Experts
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
