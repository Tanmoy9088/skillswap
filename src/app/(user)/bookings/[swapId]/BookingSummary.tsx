import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";

import type { BookingSessionOption } from "@/types/types/swaps";
import {
  dateInputToLocalDate,
  formatDate,
  formatTime,
} from "@/lib/bookingSchedule";

interface BookingSummaryProps {
  skillName: string;
  selectedOption: BookingSessionOption;
  selectedDate: string;
  selectedTime: string;
  isSubmitting: boolean;
  onRequestSession: () => void;
}

export default function BookingSummary({
  skillName,
  selectedOption,
  selectedDate,
  selectedTime,
  isSubmitting,
  onRequestSession,
}: BookingSummaryProps) {
  return (
    <div className="mt-8 rounded-2xl border border-[#193B75]/20 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#193B75] text-white">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Booking Summary</h3>

          <p className="text-sm text-gray-500">
            Review your session before sending the request.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Skill
          </p>

          <p className="mt-1 font-semibold text-gray-900">{skillName}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Duration
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {selectedOption.duration_minutes} minutes
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Token Cost
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {selectedOption.token_rate}{" "}
            {selectedOption.token_rate === 1 ? "token" : "tokens"}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Date &amp; Time
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {formatDate(dateInputToLocalDate(selectedDate))}
          </p>

          <p className="mt-1 text-sm text-gray-600">
            {formatTime(selectedTime)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onRequestSession}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#193B75] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#102B5B] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending Request...
            </>
          ) : (
            <>
              <CalendarDays className="h-4 w-4" />
              Request Session
            </>
          )}
        </button>
      </div>
    </div>
  );
}
