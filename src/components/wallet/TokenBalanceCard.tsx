"use client";

import { Coins, Loader2, Wallet } from "lucide-react";

import { useTokenBalance } from "@/hooks/wallet/useTokenBalance";

const TokenBalanceCard = () => {
  const { data: balance, isLoading, isError } = useTokenBalance();

  return (
    <div className="h-full rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Current Balance
          </p>

          {isLoading ? (
            <div className="mt-5 flex items-center gap-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading balance...
            </div>
          ) : isError ? (
            <p className="mt-5 text-sm text-red-600">
              Failed to load token balance.
            </p>
          ) : (
            <div className="mt-4 flex items-end gap-2">
              <span className="text-5xl font-bold tracking-tight text-[#193B75] sm:text-6xl">
                {(balance ?? 0).toLocaleString()}
              </span>

              <span className="mb-2 text-xl font-bold text-indigo-600">
                Tokens
              </span>
            </div>
          )}
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-300">
          <Wallet className="h-8 w-8" />
        </div>
      </div>

      {!isLoading && !isError && (
        <>
          <p className="mt-4 max-w-md text-sm leading-6 text-gray-500">
            Use your tokens to book skill sessions with mentors or earn more
            by teaching skills to other members.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
              <Coins className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                SkillSwap+ Tokens
              </p>
              <p className="text-xs text-gray-500">
                Your available learning credits
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TokenBalanceCard;