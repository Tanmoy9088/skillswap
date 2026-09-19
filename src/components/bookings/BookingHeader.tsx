import { Calendar } from "lucide-react";
import React from "react";

const BookingHeader = () => {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Calendar className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#17366F]">
              My Bookings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View your upcoming and previous skill sessions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHeader;
