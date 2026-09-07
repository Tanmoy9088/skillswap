"use client";

import { ArrowDownLeft, ArrowUpRight, History, Loader2 } from "lucide-react";

import { useTokenTransactions } from "@/hooks/wallet/useTokenTransactions";

const TokenTransactionHistory = () => {
  const { data: transactions, isLoading, isError } = useTokenTransactions();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <History className="h-5 w-5 text-gray-700" />

        <h2 className="text-lg font-semibold text-gray-900">
          Transaction History
        </h2>
      </div>

      {isLoading && (
        <div className="mt-6 flex items-center gap-2 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading transactions...
        </div>
      )}

      {isError && (
        <p className="mt-6 text-sm text-red-600">
          Unable to load transaction history.
        </p>
      )}

      {!isLoading && !isError && transactions?.length === 0 && (
        <div className="mt-6 rounded-xl bg-gray-50 p-6 text-center">
          <p className="font-medium text-gray-700">No transactions yet</p>

          <p className="mt-1 text-sm text-gray-500">
            Your token activity will appear here.
          </p>
        </div>
      )}

      {!isLoading && !isError && transactions && transactions.length > 0 && (
        <div className="mt-5 divide-y divide-gray-100">
          {transactions.map((transaction) => {
            const isEarned =
              transaction.transaction_type === "earned" ||
              transaction.transaction_type === "refund" ||
              transaction.transaction_type === "initial_balance";

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isEarned ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {isEarned ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">
                      {transaction.description ?? transaction.transaction_type}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(transaction.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 font-semibold ${
                    isEarned ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isEarned ? "+" : ""}
                  {transaction.amount}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TokenTransactionHistory;
