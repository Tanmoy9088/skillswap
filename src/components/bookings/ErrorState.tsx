import { XCircle } from "lucide-react";

const ErrorState = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7FF] px-6">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <XCircle className="mx-auto h-10 w-10 text-red-500" />

        <h1 className="mt-4 text-xl font-bold text-gray-900">
          Unable to load bookings
        </h1>

        <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
      </div>
    </main>
  );
};

export default ErrorState;
