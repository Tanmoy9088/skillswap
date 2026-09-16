import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { razorpay } from "@/lib/payments/razorpay";

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

    const packageId = body?.packageId;

    if (!packageId || typeof packageId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "A valid token package is required.",
        },
        {
          status: 400,
        },
      );
    }

    const { data: tokenPackage, error: packageError } = await supabase
      .from("token_packages")
      .select("id, name, tokens, price_inr")
      .eq("id", packageId)
      .eq("is_active", true)
      .single();

    if (packageError || !tokenPackage) {
      return NextResponse.json(
        {
          success: false,
          message: "Token package not found.",
        },
        {
          status: 404,
        },
      );
    }

    const amountInPaise = tokenPackage.price_inr * 100;

    const receipt = `token_${user.id.slice(0, 8)}_${Date.now()}`;

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt,
      notes: {
        user_id: user.id,
        package_id: tokenPackage.id,
      },
    });

    const { data: purchase, error: purchaseError } = await supabase
      .from("token_purchases")
      .insert({
        user_auth_user_id: user.id,
        token_package_id: tokenPackage.id,
        tokens: tokenPackage.tokens,
        amount_inr: tokenPackage.price_inr,
        razorpay_order_id: razorpayOrder.id,
        status: "created",
      })
      .select(
        "id, token_package_id, tokens, amount_inr, razorpay_order_id, status",
      )
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create payment record.",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
      purchaseId: purchase.id,
      orderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
      packageName: tokenPackage.name,
      tokens: tokenPackage.tokens,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create Razorpay order.",
        error: error,
      },
      {
        status: 500,
      },
    );
  }
}
