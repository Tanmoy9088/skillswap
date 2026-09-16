"use client";

import { Coins, Wallet as WalletIcon } from "lucide-react";

import TokenBalanceCard from "@/components/wallet/TokenBalanceCard";
import TokenPackageList from "@/components/wallet/TokenPackages";
import TokenTransactionHistory from "@/components/wallet/TokenTransactionHistory";

import { useTokenTransactions } from "@/hooks/wallet/useTokenTransactions";
import { useTokenBalance } from "@/hooks/wallet/useTokenBalance";
import { useCurrentProfile } from "@/hooks/use-current-profile";

const Wallet = () => {
  const { data: transactions = [], refetch: refetchTransactions } =
    useTokenTransactions();

  const { refetch: refetchBalance } = useTokenBalance();

  const { data: profile } = useCurrentProfile();

  const tokensEarned = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const tokensSpent = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce(
      (total, transaction) => total + Math.abs(Number(transaction.amount)),
      0,
    );

  const handlePurchaseSuccess = async () => {
    await Promise.all([refetchBalance(), refetchTransactions()]);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <WalletIcon className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                My Wallet
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your tokens and view your transaction history.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TokenBalanceCard />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <WalletStatCard
              label="Tokens Earned"
              value={tokensEarned}
              icon={<Coins className="h-6 w-6" />}
              type="earned"
            />

            <WalletStatCard
              label="Tokens Spent"
              value={tokensSpent}
              icon={<WalletIcon className="h-6 w-6" />}
              type="spent"
            />
          </div>
        </div>

        <div className="mt-8">
          <TokenPackageList
            userName={profile?.name}
            userEmail={profile?.email}
            onPurchaseSuccess={handlePurchaseSuccess}
          />
        </div>

        <div className="mt-8">
          <TokenTransactionHistory />
        </div>

        <section className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
              <Coins className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                How SkillSwap+ tokens work
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use your tokens to book skill sessions with mentors. Earn tokens
                by teaching skills to other members and check your transaction
                history to keep track of your activity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

interface WalletStatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  type: "earned" | "spent";
}

const WalletStatCard = ({ label, value, icon, type }: WalletStatCardProps) => {
  const isEarned = type === "earned";

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            {label}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-[#193B75]">
            {value.toLocaleString()}
          </p>

          <p
            className={`mt-1 text-sm ${
              isEarned ? "text-green-600" : "text-gray-500"
            }`}
          >
            {isEarned
              ? "Tokens added to your wallet"
              : "Tokens used for sessions"}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            isEarned
              ? "bg-green-100 text-green-600"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
