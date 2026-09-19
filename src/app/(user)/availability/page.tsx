"use client";

import { useState } from "react";

import AvailabilityHeader from "@/components/availability/AvailabilityHeader";
import AddAvailabilityForm from "@/components/availability/AddAvailabilityForm";
import AvailabilityInfo from "@/components/availability/AvailabilityInfo";
import AvailabilityList from "@/components/availability/AvailabilityList";
import { useMentorAvailability } from "@/hooks/mentors/useMentorAvailability";

const DAYS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const AvailabilityPage = () => {
  const {
    data: availability,
    isLoading,
    isError,
    error,
    createAvailability,
    isCreating,
    updateAvailabilityStatus,
    isUpdating,
    updateAvailability,
    deleteAvailability,
    isDeleting,
  } = useMentorAvailability();

  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddAvailability = async () => {
    setFormError(null);

    if (!startTime || !endTime) {
      setFormError("Please select both a start and end time.");
      return;
    }

    if (startTime >= endTime) {
      setFormError("End time must be after start time.");
      return;
    }

    try {
      await createAvailability({
        dayOfWeek,
        startTime,
        endTime,
      });

      setStartTime("09:00");
      setEndTime("17:00");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to add availability."
      );
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    setFormError(null);

    try {
      await updateAvailabilityStatus({
        id,
        isActive: !isActive,
      });
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to update availability."
      );
    }
  };

  const handleDelete = async (id: string) => {
    setFormError(null);

    try {
      await deleteAvailability(id);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to delete availability."
      );
    }
  };

  const handleUpdate = async (
    id: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string
  ) => {
    await updateAvailability({
      id,
      dayOfWeek,
      startTime,
      endTime,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <AvailabilityHeader />

        <AddAvailabilityForm
          days={DAYS}
          dayOfWeek={dayOfWeek}
          startTime={startTime}
          endTime={endTime}
          formError={formError}
          isCreating={isCreating}
          onDayChange={setDayOfWeek}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          onSubmit={handleAddAvailability}
        />

        <AvailabilityList
          availability={availability}
          days={DAYS}
          isLoading={isLoading}
          isError={isError}
          error={error}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />

        <AvailabilityInfo />
      </div>
    </main>
  );
};

export default AvailabilityPage;