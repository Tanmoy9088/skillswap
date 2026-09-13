export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 0;
  }

  return hours * 60 + minutes;
};

export const formatTime = (time: string): string => {
  if (!time) {
    return "";
  }

  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const getToday = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const createLocalDate = (date: string, time: string): Date => {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  const result = new Date();

  result.setFullYear(year, month - 1, day);
  result.setHours(hours, minutes, 0, 0);

  return result;
};

export interface Availability {
  id: string;
  mentor_auth_user_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
}

export const isTimeWithinAvailability = (
  selectedTime: string,
  selectedAvailability: Availability[],
): boolean => {
  if (!selectedTime || selectedAvailability.length === 0) {
    return false;
  }

  const selectedMinutes = timeToMinutes(selectedTime);

  return selectedAvailability.some((slot) => {
    const startMinutes = timeToMinutes(slot.start_time);
    const endMinutes = timeToMinutes(slot.end_time);

    return (
      selectedMinutes >= startMinutes &&
      selectedMinutes < endMinutes
    );
  });
};