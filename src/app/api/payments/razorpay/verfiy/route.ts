import { NextResponse } from "next/server";
import crypto from "crypto";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { razorpay } from "@/lib/payments/razorpay";

const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

if (!razorpaySecret) {
  throw new Error("RAZORPAY_KEY_SECRET is not configured");
}

const RAZORPAY_KEY_SECRET: string = razorpaySecret;

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "You must be logged in.",
        },
        {
          status: 401,
        },
      );
    }

    const body = await request.json();

    const {
      purchaseId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    if (
      !purchaseId ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment verification data.",
        },
        {
          status: 400,
        },
      );
    }

    const { data: purchase, error: purchaseError } = await supabase
      .from("token_purchases")
      .select(
        "id, user_auth_user_id, tokens, amount_inr, razorpay_order_id, status",
      )
      .eq("id", purchaseId)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json(
        {
          success: false,
          message: "Purchase not found.",
        },
        {
          status: 404,
        },
      );
    }

    if (purchase.user_auth_user_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to verify this purchase.",
        },
        {
          status: 403,
        },
      );
    }

    if (purchase.razorpay_order_id !== razorpayOrderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Razorpay order does not match the purchase.",
        },
        {
          status: 400,
        },
      );
    }

    if (purchase.status === "paid") {
      return NextResponse.json({
        success: true,
        alreadyCompleted: true,
        purchaseId: purchase.id,
        tokens: purchase.tokens,
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${purchase.razorpay_order_id}|${razorpayPaymentId}`)
      .digest("hex");

    const signaturesMatch =
      generatedSignature.length === razorpaySignature.length &&
      crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(razorpaySignature),
      );

    if (!signaturesMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment signature verification failed.",
        },
        {
          status: 400,
        },
      );
    }

    const payment = await razorpay.payments.fetch(razorpayPaymentId);

    if (payment.order_id !== razorpayOrderId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment order does not match the Razorpay order.",
        },
        {
          status: 400,
        },
      );
    }

    if (payment.status !== "captured") {
      return NextResponse.json(
        {
          success: false,
          message: `Payment is not captured. Current status: ${payment.status}`,
        },
        {
          status: 400,
        },
      );
    }

    const { data: result, error: completeError } = await supabaseAdmin.rpc(
      "complete_token_purchase_server",
      {
        p_purchase_id: purchase.id,
        p_razorpay_order_id: purchase.razorpay_order_id,
        p_razorpay_payment_id: razorpayPaymentId,
        p_razorpay_signature: razorpaySignature,
      },
    );

    if (completeError) {
      throw new Error(completeError.message);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Razorpay payment verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Payment verification failed.",
      },
      {
        status: 500,
      },
    );
  }
}
