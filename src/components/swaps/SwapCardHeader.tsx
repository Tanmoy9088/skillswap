import { Coins } from "lucide-react";

import type { Swap } from "@/types/types/swaps";

interface SwapCardHeaderProps {
  swap: Swap;
  isLearner: boolean;
  isMentor: boolean;
  formattedStatus: string;
  statusConfig: {
    badge: string;
  };
}

export default function SwapCardHeader({
  swap,
  isLearner,
  isMentor,
  formattedStatus,
  statusConfig,
}: SwapCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.badge}`}
          >
            {formattedStatus}
          </span>

          {isLearner && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Learning
            </span>
          )}

          {isMentor && (
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
              Teaching
            </span>
          )}
        </div>

        <h3 className="mt-3 truncate text-xl font-bold text-gray-900">
          {swap.skill_name}
        </h3>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm font-bold text-yellow-700">
        <Coins className="h-4 w-4" />

        <span>{swap.session_token_rate ?? swap.token_rate}</span>

        <span className="hidden sm:inline">token</span>
      </div>
    </div>
  );
}
