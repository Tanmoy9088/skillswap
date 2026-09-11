"use client";

import { ArrowUp, Globe2, Heart, Mail, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "SkillSwap+",
        text: "Learn, teach, and grow with SkillSwap+.",
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-indigo-100 bg-[#FAFAFF]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-violet-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* Main Footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-14">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 shadow-lg shadow-indigo-200 transition-transform duration-200 group-hover:scale-105">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
                  Skill
                  <span className="text-indigo-600">Swap</span>
                  <span className="text-violet-500">+</span>
                </h2>

                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Learn • Teach • Grow
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-500">
              A community where knowledge goes both ways. Share your skills,
              discover new ones, and grow together.
            </p>

            {/* Mini brand badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-[11px] font-semibold text-gray-500">
                Building a community of learners
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-bold text-gray-900">Platform</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/skills"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                Find Skills
              </Link>

              <Link
                href="/mentors"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                Discover Mentors
              </Link>

              <Link
                href="/how-it-works"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                How It Works
              </Link>

              <Link
                href="/pricing"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900">Company</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/success-stories"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                Success Stories
              </Link>

              <Link
                href="/contact"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                Contact Us
              </Link>

              <Link
                href="/help"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                Help Center
              </Link>

              <Link
                href="/about"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Legal / Actions */}
          <div>
            <h3 className="text-sm font-bold text-gray-900">Legal & Support</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/privacy"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="w-fit text-sm text-gray-500 transition-colors hover:translate-x-0.5 hover:text-indigo-600"
              >
                Terms of Service
              </Link>
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share SkillSwap+"
                title="Share SkillSwap+"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Share2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label="Language"
                title="Language"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Globe2 className="h-4 w-4" />
              </button>

              <Link
                href="/contact"
                aria-label="Contact us"
                title="Contact us"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 border-t border-gray-200/70 py-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="font-semibold text-gray-600">
              © {new Date().getFullYear()} SkillSwap+
            </span>

            <span className="hidden text-gray-300 sm:block">•</span>

            <span>The Digital Curator. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              Made with
              <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
              for learners
            </span>

            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              title="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
