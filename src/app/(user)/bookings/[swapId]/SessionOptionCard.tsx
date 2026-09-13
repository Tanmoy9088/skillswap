import { Clock, Coins } from "lucide-react";

import type { BookingSessionOption } from "@/types/types/swaps";

interface SessionOptionCardProps {
  option: BookingSessionOption;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
}

export default function SessionOptionCard({
  option,
  isSelected,
  onSelect,
}: SessionOptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`w-full text-left rounded-xl border p-4 transition-all ${
        isSelected
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />

            <span className="font-semibold">
              {option.duration_minutes} minutes
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Coins className="h-4 w-4" />

            <span>{option.token_rate} tokens</span>
          </div>
        </div>

        <div
          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
            isSelected ? "border-primary" : "border-muted-foreground/40"
          }`}
        >
          {isSelected && (
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          )}
        </div>
      </div>
    </button>
  );
}
