"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
          <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
            <p className="text-6xl font-bold text-red-600">500</p>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              An unexpected error occurred. Please try again.
            </p>

            <button
              onClick={() => reset()}
              className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
