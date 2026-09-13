export type AvailabilitySlot = {
  id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active?: boolean;
};

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);

  return hours * 60 + minutes;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getDateInputValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const dateInputToLocalDate = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

export const isFullSessionWithinSlot = (
  startTime: string,
  durationMinutes: number,
  slot: AvailabilitySlot,
): boolean => {
  const sessionStart = timeToMinutes(startTime);
  const sessionEnd = sessionStart + durationMinutes;

  const availabilityStart = timeToMinutes(slot.start_time);
  const availabilityEnd = timeToMinutes(slot.end_time);

  return sessionStart >= availabilityStart && sessionEnd <= availabilityEnd;
};

export const generateTimeOptions = (
  selectedDate: Date,
  durationMinutes: number,
  availability: AvailabilitySlot[],
): string[] => {
  const dayOfWeek = selectedDate.getDay();

  const slotsForDay = availability.filter(
    (slot) => slot.day_of_week === dayOfWeek,
  );

  const result: string[] = [];

  for (const slot of slotsForDay) {
    const start = timeToMinutes(slot.start_time);
    const end = timeToMinutes(slot.end_time);

    for (let current = start; current + durationMinutes <= end; current += 15) {
      const hours = Math.floor(current / 60);
      const minutes = current % 60;

      result.push(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
      );
    }
  }

  return [...new Set(result)].sort();
};

export const isTimeStillAvailable = (
  selectedDate: Date,
  selectedTime: string,
  durationMinutes: number,
  availability: AvailabilitySlot[],
): boolean => {
  const dayOfWeek = selectedDate.getDay();

  return availability
    .filter((slot) => slot.day_of_week === dayOfWeek)
    .some((slot) =>
      isFullSessionWithinSlot(selectedTime, durationMinutes, slot),
    );
};
