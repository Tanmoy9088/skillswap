interface BookingStepIndicatorProps {
  step: 1 | 2;
}

export default function BookingStepIndicator({
  step,
}: BookingStepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div
        className={`flex items-center gap-2 ${
          step >= 1 ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          1
        </div>

        <span className="font-medium">Session</span>
      </div>

      <div className="w-12 h-px bg-border" />

      <div
        className={`flex items-center gap-2 ${
          step >= 2 ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          2
        </div>

        <span className="font-medium">Schedule</span>
      </div>
    </div>
  );
}
