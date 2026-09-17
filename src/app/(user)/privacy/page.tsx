import Link from "next/link";
import { Lock, Mail, ShieldCheck } from "lucide-react";

const sections = [
  {
    id: "information",
    title: "1. Information We Collect",
    content: [
      "When you use SkillSwap+, we may collect information that you provide directly, such as your name, email address, profile information, skills, descriptions, availability, and other information you choose to add to your account.",
      "We may also collect information related to your use of the platform, including bookings, skill exchanges, session information, token transactions, notifications, and interactions with other users.",
      "Some technical information may be collected automatically, such as device information, browser information, IP address, and basic usage information needed to operate and secure the platform.",
    ],
  },
  {
    id: "usage",
    title: "2. How We Use Your Information",
    content: [
      "We use information to create and manage your account, provide SkillSwap+ services, connect users with relevant skills, facilitate bookings and sessions, and maintain platform functionality.",
      "We may use information to communicate with you about your account, bookings, notifications, security matters, service updates, and support requests.",
      "We may also use information to detect abuse, prevent fraud, protect platform security, troubleshoot problems, and improve the user experience.",
    ],
  },
  {
    id: "profiles",
    title: "3. Profile and Skill Information",
    content: [
      "Information you choose to make part of your SkillSwap+ profile may be visible to other users. This can include your name, profile image, skills, skill descriptions, proficiency information, and other profile details you choose to publish.",
      "You should avoid publishing sensitive personal information in your profile, skill descriptions, messages, or other public areas of the platform.",
      "You are responsible for ensuring that the information you publish is accurate and appropriate for sharing with other users.",
    ],
  },
  {
    id: "sharing",
    title: "4. How We Share Information",
    content: [
      "We do not sell your personal information as part of the normal operation of SkillSwap+.",
      "Information may be shared when necessary to provide platform services, process transactions, facilitate bookings, provide customer support, maintain security, or comply with applicable legal obligations.",
      "Information that you intentionally make public through your profile or other platform features may be accessible to other users.",
    ],
  },
  {
    id: "security",
    title: "5. Data Security",
    content: [
      "We use reasonable technical and organizational measures designed to protect information against unauthorized access, loss, misuse, alteration, or disclosure.",
      "No internet-based service can guarantee absolute security. You are responsible for maintaining the security of your account credentials and should contact us promptly if you believe your account has been compromised.",
    ],
  },
  {
    id: "retention",
    title: "6. Data Retention",
    content: [
      "We retain information for as long as reasonably necessary to provide our services, maintain records, resolve disputes, enforce agreements, meet legal obligations, and protect the platform.",
      "When information is no longer required for these purposes, it may be deleted or anonymized in accordance with our operational practices and applicable requirements.",
    ],
  },
  {
    id: "rights",
    title: "7. Your Choices and Rights",
    content: [
      "Depending on your location and applicable law, you may have rights relating to your personal information, including rights to access, correct, update, or request deletion of certain information.",
      "You can review and update information available through your SkillSwap+ account. For requests that cannot be completed through the platform, you can contact us using the information provided below.",
    ],
  },
  {
    id: "cookies",
    title: "8. Cookies and Similar Technologies",
    content: [
      "SkillSwap+ may use cookies and similar technologies that are necessary for authentication, security, preferences, and platform functionality.",
      "We may also use technical information to understand how the platform is used and improve its performance.",
    ],
  },
  {
    id: "third-party",
    title: "9. Third-Party Services",
    content: [
      "SkillSwap+ may rely on third-party services for infrastructure, authentication, storage, communications, analytics, payments, or other platform functionality.",
      "Those providers may process information on our behalf or independently according to their own terms and privacy policies. We encourage you to review the policies of services you interact with through the platform.",
    ],
  },
  {
    id: "children",
    title: "10. Children",
    content: [
      "SkillSwap+ is not intended for children who are not legally permitted to use online services under the laws applicable to them.",
      "If you believe that a child has provided personal information to us inappropriately, please contact us so that we can review the situation and take appropriate action.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy from time to time as SkillSwap+ evolves or as legal and operational requirements change.",
      "When material changes are made, we may provide notice through the platform or other appropriate communication channels. The updated policy will become effective when published unless otherwise stated.",
    ],
  },
];

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Privacy
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
            This Privacy Policy explains how SkillSwap+ collects, uses,
            protects, and handles information when you use our platform.
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
            <div className="mb-10 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex gap-3">
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
                <p className="text-sm leading-6 text-indigo-900">
                  We aim to collect only the information needed to provide,
                  secure, and improve SkillSwap+ and to give you control over
                  information you choose to share.
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

            <div className="mt-12 border-t border-slate-100 pt-8">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Privacy questions?
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Contact us at{" "}
                    <a
                      href="mailto:privacy@skillswap.com"
                      className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      privacy@skillswap.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-bold text-slate-900">
              Questions about your privacy?
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Our team is here to help.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-100 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            Contact Us
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
