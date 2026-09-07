"use client";

import { createElement, Fragment, useState } from "react";
import { Calendar, Loader2, X } from "lucide-react";

import { useScheduleSwapSession } from "@/hooks/skills/useScheduleSwapSession";

interface ScheduleSessionModalProps {
  swapId: string;
  skillName: string;
  onClose: () => void;
}

const ScheduleSessionModal = ({
  swapId,
  skillName,
  onClose,
}: ScheduleSessionModalProps) => {
  const scheduleSession = useScheduleSwapSession();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    const scheduledAt = new Date(`${date}T${time}`);

    if (Number.isNaN(scheduledAt.getTime())) {
      alert("Invalid date or time.");
      return;
    }

    if (scheduledAt.getTime() <= Date.now()) {
      alert("Please choose a future date and time.");
      return;
    }

    try {
      await scheduleSession.mutateAsync({
        swapId,
        scheduledAt: scheduledAt.toISOString(),
      });

      alert("Session scheduled successfully.");
      onClose();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to schedule session."
      );
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" },
    createElement("div", { className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" },
      createElement("div", { className: "flex items-start justify-between" },
        createElement("div", null,
          createElement("div", { className: "flex items-center gap-2" }, createElement(Calendar, { className: "h-5 w-5" }), createElement("h2", { className: "text-xl font-semibold" }, "Schedule Session")),
          createElement("p", { className: "mt-1 text-sm text-gray-500" }, `Schedule your ${skillName} session.`)),
        createElement("button", { type: "button", onClick: onClose, disabled: scheduleSession.isPending, className: "rounded-lg p-2 text-gray-500 hover:bg-gray-100" }, createElement(X, { className: "h-5 w-5" }))),
      createElement("form", { onSubmit: handleSubmit, className: "mt-6 space-y-5" },
        createElement("div", null, createElement("label", { htmlFor: "session-date", className: "mb-2 block text-sm font-medium text-gray-700" }, "Date"), createElement("input", { id: "session-date", type: "date", value: date, onChange: (event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value), min: today, className: "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black", required: true })),
        createElement("div", null, createElement("label", { htmlFor: "session-time", className: "mb-2 block text-sm font-medium text-gray-700" }, "Time"), createElement("input", { id: "session-time", type: "time", value: time, onChange: (event: React.ChangeEvent<HTMLInputElement>) => setTime(event.target.value), className: "w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black", required: true })),
        createElement("div", { className: "flex gap-3" },
          createElement("button", { type: "button", onClick: onClose, disabled: scheduleSession.isPending, className: "flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50" }, "Cancel"),
          createElement("button", { type: "submit", disabled: scheduleSession.isPending, className: "flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50" }, scheduleSession.isPending ? createElement(Fragment, null, createElement(Loader2, { className: "h-4 w-4 animate-spin" }), "Scheduling...") : createElement(Fragment, null, createElement(Calendar, { className: "h-4 w-4" }), "Schedule"))))));
};

export default ScheduleSessionModal;