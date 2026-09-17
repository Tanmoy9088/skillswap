import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using SkillSwap+, you agree to these Terms of Service and any policies referenced by them. If you do not agree with these terms, you should not use the platform.",
      "These terms apply to your use of SkillSwap+, including account creation, profiles, skill listings, bookings, sessions, messaging, token-related features, and other platform functionality.",
    ],
  },
  {
    id: "eligibility",
    title: "2. Eligibility and Accounts",
    content: [
      "You must provide accurate information when creating and maintaining your account. You are responsible for keeping your account information current.",
      "You are responsible for activity performed through your account and for maintaining the confidentiality of your authentication credentials.",
      "You must not create an account using false information, impersonate another person, or use another person's account without authorization.",
    ],
  },
  {
    id: "platform",
    title: "3. SkillSwap+ Platform",
    content: [
      "SkillSwap+ provides technology that allows users to discover skills, offer knowledge, request learning opportunities, arrange sessions, and communicate with other users.",
      "SkillSwap+ does not guarantee that a particular user, skill, session, result, or learning experience will meet your expectations.",
      "Users are responsible for evaluating whether another user, skill, or session is appropriate for their individual needs.",
    ],
  },
  {
    id: "user-content",
    title: "4. User Profiles and Content",
    content: [
      "You may create profiles, skill listings, descriptions, images, messages, and other content through the platform.",
      "You retain responsibility for content that you submit. You should only submit content that you have the right to use and share.",
      "You agree not to submit content that is unlawful, fraudulent, abusive, threatening, discriminatory, misleading, invasive of another person's privacy, or otherwise inappropriate for the platform.",
    ],
  },
  {
    id: "sessions",
    title: "5. Sessions and Bookings",
    content: [
      "Users may offer session options with specified durations, token rates, and availability. Other users may request or book those sessions through the platform.",
      "A booking represents an arrangement between the participating users. Users are responsible for attending sessions at the agreed time and following the applicable booking requirements.",
      "Availability and session information should be kept accurate. Users should update their availability when their schedule changes.",
    ],
  },
  {
    id: "tokens",
    title: "6. Tokens and Payments",
    content: [
      "SkillSwap+ may use tokens or other platform mechanisms to facilitate paid learning sessions and related features.",
      "Token balances, rates, transfers, refunds, and other transaction rules are determined by the features available on the platform at the relevant time.",
      "You must not attempt to manipulate token balances, bypass platform transaction mechanisms, or conduct fraudulent transactions.",
    ],
  },
  {
    id: "conduct",
    title: "7. User Conduct",
    content: [
      "You agree to use SkillSwap+ respectfully and lawfully. You must not interfere with the operation or security of the platform.",
      "You must not use the platform to harass, threaten, deceive, exploit, or harm other users.",
      "You must not attempt to gain unauthorized access to accounts, data, systems, or features, or use automated methods to abuse platform functionality.",
    ],
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property",
    content: [
      "SkillSwap+, including its branding, interface, software, design, and platform materials, may be protected by intellectual property laws.",
      "Except as expressly permitted, you may not copy, modify, distribute, sell, reverse engineer, or create derivative works from platform materials.",
      "User-submitted content remains the responsibility of the user who submits it, subject to the rights and permissions necessary for SkillSwap+ to operate the platform.",
    ],
  },
  {
    id: "third-party",
    title: "9. Third-Party Services",
    content: [
      "SkillSwap+ may integrate with or depend on third-party services. Those services may have separate terms and policies.",
      "We are not responsible for the independent operation, availability, policies, or practices of third-party services outside our control.",
    ],
  },
  {
    id: "termination",
    title: "10. Suspension and Termination",
    content: [
      "We may suspend or restrict access to an account or platform feature when reasonably necessary to protect users, maintain security, investigate abuse, enforce these terms, or comply with applicable requirements.",
      "You may stop using SkillSwap+ at any time. Certain provisions of these terms may continue to apply after an account is closed when necessary because of their nature.",
    ],
  },
  {
    id: "disclaimer",
    title: "11. Disclaimers",
    content: [
      "SkillSwap+ is provided on an availability basis, and we do not guarantee that the platform will always be uninterrupted, error-free, secure, or available.",
      "Information provided through SkillSwap+ is not a substitute for professional advice. Users should independently evaluate information received from other users before relying on it.",
    ],
  },
  {
    id: "liability",
    title: "12. Limitation of Liability",
    content: [
      "To the maximum extent permitted by applicable law, SkillSwap+ and its operators will not be responsible for indirect, incidental, special, consequential, or punitive damages arising from use of the platform.",
      "Nothing in these terms is intended to exclude or limit liability where such exclusion or limitation is not permitted by applicable law.",
    ],
  },
  {
    id: "changes",
    title: "13. Changes to These Terms",
    content: [
      "We may update these Terms of Service as SkillSwap+ develops or as operational and legal requirements change.",
      "Updated terms become effective when published unless a different effective date is stated. Your continued use of the platform after an update indicates that you have reviewed the updated terms.",
    ],
  },
];

const TermsPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FileText className="h-7 w-7" />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
            These terms explain the rules and responsibilities that apply when
            using SkillSwap+.
          </p>

          <p className="mt-5 text-xs font-medium text-slate-400">
            Last updated: September 17, 2026
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Contents
              </p>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-xs font-medium leading-5 text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10 lg:p-12">
            <div className="mb-10 rounded-2xl border border-amber-100 bg-amber-50/70 p-5">
              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                <p className="text-sm leading-6 text-amber-900">
                  Please read these terms carefully before using SkillSwap+.
                  They describe important responsibilities and limitations
                  associated with the platform.
                </p>
              </div>
            </div>

            <div className="space-y-10">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4">
                    {section.content.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-slate-600"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 grid gap-4 border-t border-slate-100 pt-8 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <h3 className="mt-3 text-sm font-bold text-slate-900">
                  Use Responsibly
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Use the platform respectfully and lawfully.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <Users className="h-5 w-5 text-indigo-600" />
                <h3 className="mt-3 text-sm font-bold text-slate-900">
                  Respect Others
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Treat other learners and mentors with respect.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <ShieldCheck className="h-5 w-5 text-indigo-600" />
                <h3 className="mt-3 text-sm font-bold text-slate-900">
                  Stay Secure
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Protect your account and personal information.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

              <p className="text-sm leading-6 text-indigo-900">
                By using SkillSwap+, you acknowledge that you have read and
                understood these Terms of Service.
              </p>
            </div>

            <div className="mt-8 flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Questions about these terms?
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Contact us at{" "}
                  <a
                    href="mailto:legal@skillswap.com"
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    legal@skillswap.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-bold text-slate-900">
              Need help understanding something?
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Our support team can help with platform-related questions.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-100 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TermsPage;
