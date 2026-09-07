"use client";

import { Coins, Loader2 } from "lucide-react";

import { useTokenBalance } from "@/hooks/wallet/useTokenBalance";

const TokenBalanceCard = () => {
  const { data: balance, isLoading, isError } = useTokenBalance();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Coins className="h-5 w-5 text-yellow-600" />

        <h2 className="text-lg font-semibold text-gray-900">Token Balance</h2>
      </div>

      {isLoading ? (
        <div className="mt-4 flex items-center gap-2 text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading balance...
        </div>
      ) : isError ? (
        <p className="mt-4 text-sm text-red-600">
          Failed to load token balance.
        </p>
      ) : (
        <div className="mt-4">
          <p className="text-3xl font-bold text-gray-900">{balance ?? 0}</p>

          <p className="mt-1 text-sm text-gray-500">available tokens</p>
        </div>
      )}
    </div>
  );
};

export default TokenBalanceCard;
