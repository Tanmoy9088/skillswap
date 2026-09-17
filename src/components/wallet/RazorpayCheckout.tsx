"use client";

import { useState } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutProps {
  packageId: string;
  packageName: string;
  tokens: number;
  priceInr: number;
  userName?: string;
  userEmail?: string;
  onSuccess?: () => void;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

export default function RazorpayCheckout({
  packageId,
  tokens,
  priceInr,
  userName,
  userEmail,
  onSuccess,
}: RazorpayCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay Checkout.");
      }

      const orderResponse = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.message || "Failed to create payment order.");
      }

      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SkillSwap+",
        description: `${orderData.tokens} SkillSwap+ tokens`,
        order_id: orderData.orderId,

        prefill: {
          name: userName,
          email: userEmail,
        },

        theme: {
          color: "#000000",
        },

        handler: async (response) => {
          try {
            const verifyResponse = await fetch(
              "/api/payments/razorpay/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  purchaseId: orderData.purchaseId,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              },
            );

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData.message || "Payment verification failed.",
              );
            }

            toast.success(`${tokens} tokens have been added to your wallet.`);

            onSuccess?.();
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Payment verification failed.",
            );
          } finally {
            setIsLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      setIsLoading(false);

      toast.error(
        error instanceof Error ? error.message : "Unable to start payment.",
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? "Processing..." : `Buy ${tokens} Tokens · ₹${priceInr}`}
    </button>
  );
}
