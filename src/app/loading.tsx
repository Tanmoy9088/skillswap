import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F8FF]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />

      {/* Loading content */}
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 scale-125 rounded-2xl bg-indigo-300/20 blur-xl" />

          {/* Logo container */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 via-indigo-500 to-violet-600 shadow-xl shadow-indigo-200">
            <Sparkles className="h-7 w-7 animate-pulse text-white" />
          </div>

          {/* Loading ring */}
          <div className="absolute -inset-2 animate-spin rounded-[20px] border-2 border-transparent border-t-indigo-400/60" />
        </div>

        {/* Brand */}
        <div className="mt-6 text-center">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            Skill
            <span className="text-indigo-600">Swap</span>
            <span className="text-violet-500">+</span>
          </h1>

          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Learn • Teach • Grow
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-7 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500" />
        </div>

        <p className="mt-3 text-xs font-medium text-gray-400">
          Preparing your experience...
        </p>
      </div>
    </div>
  );
}
