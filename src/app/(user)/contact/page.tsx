"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our support team is ready to help.",
    value: "support@skillswap.com",
    href: "mailto:support@skillswap.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Monday to Friday, 9 AM to 6 PM.",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "Based in India, connecting learners worldwide.",
    value: "Kolkata, India",
    href: "#",
  },
];

const subjects = [
  "General Inquiry",
  "Technical Support",
  "Account & Profile",
  "Skill Swap",
  "Booking & Sessions",
  "Payments & Tokens",
  "Report an Issue",
  "Other",
];

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              <MessageSquare className="h-4 w-4" />
              We are here to help
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Let&apos;s start a{" "}
              <span className="text-indigo-600">conversation.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
              Have a question about SkillSwap+? Need help with your account,
              booking, or skill exchange? Send us a message and our team will
              get back to you.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-slate-50 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_15px_50px_rgba(15,23,42,0.06)] sm:p-8">
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                    Contact Information
                  </p>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    We&apos;d love to hear from you.
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Whether you are learning, teaching, or simply exploring
                    SkillSwap+, our team is here to make your experience
                    smoother.
                  </p>
                </div>

                <div className="space-y-5">
                  {contactDetails.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        className="group flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/50"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-100 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-900">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.description}
                          </p>

                          <p className="mt-1.5 text-sm font-semibold text-indigo-600">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl bg-linear-to-br from-indigo-600 to-violet-600 p-7 text-white shadow-[0_15px_50px_rgba(79,70,229,0.2)] sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Clock3 className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Support when you need it
                </h3>

                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  Our support team typically responds within 24 hours during
                  business days.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4" />
                  Monday – Friday
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_15px_50px_rgba(15,23,42,0.06)] sm:p-9">
              {submitted ? (
                <div className="flex min-h-120 flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-900">
                    Message sent successfully
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Thank you for contacting SkillSwap+. We&apos;ve received
                    your message and will get back to you as soon as possible.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
                  >
                    Send another message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                      Send a Message
                    </p>

                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                      How can we help?
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Fill out the form below and tell us what you need help
                      with.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Your Name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                          Email Address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Subject
                      </label>

                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      >
                        <option value="">Select a subject</option>

                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        required
                        rows={7}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-200"
                    >
                      Send Message
                      <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <MessageSquare className="h-5 w-5" />
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Looking for quick answers?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Check our help resources for answers to common questions about
            accounts, skill exchanges, bookings, tokens, and sessions.
          </p>

          <a
            href="/how-it-works"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Explore SkillSwap+
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
