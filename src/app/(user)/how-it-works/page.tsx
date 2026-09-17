import React from "react";
import Image from "next/image";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <section className="px-6 py-24 text-[#113069]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-md bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700">
            THE BARTER ECONOMY REIMAGINED
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Mastery is the
            <br />
            <span className="text-indigo-500">Universal Currency.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[#445D99]">
            SkillSwap+ operates on a circular credit-based system. We&apos;ve
            removed the barrier of money, replacing it with the value of your
            unique expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="rounded-3xl bg-[#f1f3fc] p-9 text-slate-800 lg:col-span-7">
            <h2 className="mb-4 text-2xl font-bold">How to Earn Credits</h2>

            <p className="mb-8 text-slate-500">
              Your knowledge has measurable value. Every hour you spend teaching
              earns you 1 Skill Credit (SC).
            </p>

            <div className="space-y-6">
              <Link
                href="/skills"
                className="group flex gap-4 rounded-2xl p-2 transition hover:bg-white"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  1
                </div>

                <div>
                  <h3 className="font-semibold transition group-hover:text-indigo-600">
                    List Your Expertise
                  </h3>

                  <p className="text-sm text-slate-500">
                    Build your knowledge exchange journey.
                  </p>
                </div>
              </Link>

              <Link
                href="/requests"
                className="group flex gap-4 rounded-2xl p-2 transition hover:bg-white"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  2
                </div>

                <div>
                  <h3 className="font-semibold transition group-hover:text-indigo-600">
                    Accept Swap Requests
                  </h3>

                  <p className="text-sm text-slate-500">
                    Build your knowledge exchange journey.
                  </p>
                </div>
              </Link>

              <Link
                href="/swaps"
                className="group flex gap-4 rounded-2xl p-2 transition hover:bg-white"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  3
                </div>

                <div>
                  <h3 className="font-semibold transition group-hover:text-indigo-600">
                    Host Your Session
                  </h3>

                  <p className="text-sm text-slate-500">
                    Build your knowledge exchange journey.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="relative min-h-100 overflow-hidden rounded-3xl bg-slate-800 lg:col-span-5">
            <Image
              src="/images/Collaborative-learning-environment.png"
              alt="Collaborative learning environment"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="rounded-3xl bg-[#f1f3fc] p-9 text-slate-800 lg:col-span-5">
            <h2 className="text-2xl font-bold">Spend Credits</h2>

            <p className="mt-4 text-slate-500">
              Access the world&apos;s most diverse curriculum. No tuition, just
              trade.
            </p>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow">
              <div className="flex justify-between">
                <span className="text-sm font-semibold">CURRENT BALANCE</span>

                <span className="font-bold text-indigo-600">12.5 SC</span>
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/skills"
                  className="block rounded-lg bg-slate-100 p-3 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  🎨 Oil Painting 101
                </Link>

                <Link
                  href="/skills"
                  className="block rounded-lg bg-slate-100 p-3 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  &lt;/&gt; React Hooks
                </Link>
              </div>
            </div>

            <Link
              href="/skills"
              className="mt-6 inline-flex items-center font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              Explore available skills
              <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="rounded-3xl bg-[#263f70] p-10 text-white lg:col-span-7">
            <h2 className="text-3xl font-bold">The Honor System</h2>

            <p className="mt-5 text-gray-300">
              SkillSwap+ thrives on radical transparency and mutual respect.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-semibold">Proof of Skill</h3>

                <p className="mt-2 text-sm text-gray-300">
                  Curators upload portfolios or certifications.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">The Double-Vibe Check</h3>

                <p className="mt-2 text-sm text-gray-300">
                  Both teacher and learner rate the session.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Escrow Protection</h3>

                <p className="mt-2 text-sm text-gray-300">
                  Credits are held securely until completion.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Resolution Guild</h3>

                <p className="mt-2 text-sm text-gray-300">
                  Fair mediation for disputes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 rounded-[2rem] bg-linear-to-br from-[#4f46e5] to-[#3328a8] px-8 py-20 text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold text-[#FAF6FF]">
            Ready to join the intellectual renaissance?
          </h2>

          <p className="mt-6 text-indigo-100">
            Sign up today and get 2.0 Skill Credits for free.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Join the Community
            </Link>

            <Link
              href="/skills"
              className="rounded-lg border border-indigo-300 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Browse Skills
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
