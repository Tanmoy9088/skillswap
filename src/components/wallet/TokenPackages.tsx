"use client";

import { useEffect, useState } from "react";
import { Loader2, Coins } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import RazorpayCheckout from "@/components/wallet/RazorpayCheckout";

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price_inr: number;
}

interface TokenPackageListProps {
  userName?: string;
  userEmail?: string;
  onPurchaseSuccess?: () => void;
}

const TokenPackageList = ({
  userName,
  userEmail,
  onPurchaseSuccess,
}: TokenPackageListProps) => {
  const [packages, setPackages] = useState<TokenPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("token_packages")
          .select("id, name, tokens, price_inr")
          .eq("is_active", true)
          .order("price_inr", {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        setPackages(data ?? []);
      } catch (error) {
        console.error("Failed to load token packages:", error);

        toast.error("Failed to load token packages.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-2xl border border-indigo-100 bg-white">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading token packages...
        </div>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="rounded-2xl border border-indigo-100 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          No token packages are currently available.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          Buy Tokens
        </p>

        <h2 className="mt-2 text-2xl font-bold text-[#193B75]">
          Choose a token package
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Purchase tokens and use them to book skill sessions with mentors.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <Coins className="h-6 w-6" />
              </div>

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                {pkg.name}
              </span>
            </div>

            <div className="mt-6">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight text-[#193B75]">
                  {pkg.tokens}
                </span>

                <span className="mb-1 text-sm font-semibold text-gray-500">
                  Tokens
                </span>
              </div>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                ₹{pkg.price_inr}
              </p>
            </div>

            <div className="mt-6">
              <RazorpayCheckout
                packageId={pkg.id}
                packageName={pkg.name}
                tokens={pkg.tokens}
                priceInr={pkg.price_inr}
                userName={userName}
                userEmail={userEmail}
                onSuccess={onPurchaseSuccess}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TokenPackageList;
