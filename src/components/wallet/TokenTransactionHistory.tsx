"use client";

import { ArrowDownLeft, ArrowUpRight, History } from "lucide-react";

import { useTokenTransactions } from "@/hooks/wallet/useTokenTransactions";

const TokenTransactionHistory = () => {
  const { data: transactions, isLoading, isError } = useTokenTransactions();

  return (
    <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-indigo-600" />

            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Your recent token transactions.
          </p>
        </div>

        {transactions && transactions.length > 0 && (
          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
            {transactions.length}{" "}
            {transactions.length === 1 ? "Transaction" : "Transactions"}
          </span>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-5 sm:px-8"
            >
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-gray-200" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="px-6 py-12 text-center sm:px-8">
          <p className="text-sm font-medium text-red-600">
            Unable to load transaction history.
          </p>

          <p className="mt-1 text-sm text-gray-500">Please try again later.</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && transactions?.length === 0 && (
        <div className="px-6 py-14 text-center sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
            <History className="h-6 w-6" />
          </div>

          <p className="mt-4 font-semibold text-gray-800">
            No transactions yet
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Your token activity will appear here.
          </p>
        </div>
      )}

      {/* Transactions */}
      {!isLoading && !isError && transactions && transactions.length > 0 && (
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => {
            const isEarned =
              transaction.transaction_type === "earned" ||
              transaction.transaction_type === "refund" ||
              transaction.transaction_type === "initial_balance";

            return (
              <div
                key={transaction.id}
                className="flex flex-col gap-4 px-6 py-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between sm:px-8"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      isEarned
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isEarned ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">
                      {transaction.description ?? transaction.transaction_type}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(transaction.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                    {transaction.transaction_type.replace("_", " ")}
                  </span>

                  <span
                    className={`min-w-20 text-right text-lg font-bold ${
                      isEarned ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isEarned ? "+" : ""}
                    {Number(transaction.amount).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TokenTransactionHistory;
