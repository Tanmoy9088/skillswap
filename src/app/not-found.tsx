import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <p className="text-6xl font-bold text-indigo-600">404</p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}