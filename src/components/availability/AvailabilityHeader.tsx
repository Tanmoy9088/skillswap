import { CalendarDays } from "lucide-react";

const AvailabilityHeader = () => {
  return (
    <div>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <CalendarDays className="h-6 w-6" />
      </div>

      <p className="mt-6 text-sm font-semibold text-indigo-600">
        Mentor Settings
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#193B75] sm:text-4xl">
        Your Availability
      </h1>

      <p className="mt-2 max-w-2xl text-gray-500">
        Set the days and times when learners can schedule sessions with you.
      </p>
    </div>
  );
};

export default AvailabilityHeader;