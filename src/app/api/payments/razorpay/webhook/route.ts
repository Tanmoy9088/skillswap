import { NextResponse } from "next/server";
import crypto from "crypto";

import { supabaseAdmin } from "@/lib/supabase/admin";

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured");
}

const RAZORPAY_WEBHOOK_SECRET: string = webhookSecret;

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-razorpay-signature");
    const eventId = request.headers.get("x-razorpay-event-id");

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Razorpay webhook signature.",
        },
        {
          status: 400,
        },
      );
    }

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Razorpay webhook event ID.",
        },
        {
          status: 400,
        },
      );
    }

    const rawBody = await request.text();

    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    const signaturesMatch =
      generatedSignature.length === signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(signature),
      );

    if (!signaturesMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Razorpay webhook signature.",
        },
        {
          status: 400,
        },
      );
    }

    const payload = JSON.parse(rawBody);

    const eventType = payload?.event;

    if (!eventType) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Razorpay webhook payload.",
        },
        {
          status: 400,
        },
      );
    }

    const { data: existingEvent, error: existingEventError } =
      await supabaseAdmin
        .from("payment_webhook_events")
        .select("id, processed")
        .eq("razorpay_event_id", eventId)
        .maybeSingle();

    if (existingEventError) {
      throw new Error(existingEventError.message);
    }

    if (existingEvent) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        processed: existingEvent.processed,
      });
    }

    const { error: eventInsertError } = await supabaseAdmin
      .from("payment_webhook_events")
      .insert({
        razorpay_event_id: eventId,
        event_type: eventType,
        processed: false,
      });

    if (eventInsertError) {
      if (eventInsertError.code === "23505") {
        return NextResponse.json({
          success: true,
          duplicate: true,
        });
      }

      throw new Error(eventInsertError.message);
    }

    if (eventType !== "payment.captured") {
      await supabaseAdmin
        .from("payment_webhook_events")
        .update({
          processed: true,
          processed_at: new Date().toISOString(),
        })
        .eq("razorpay_event_id", eventId);

      return NextResponse.json({
        success: true,
        ignored: true,
        event: eventType,
      });
    }

    const paymentEntity = payload?.payload?.payment?.entity;

    const razorpayPaymentId = paymentEntity?.id;
    const razorpayOrderId = paymentEntity?.order_id;

    if (!razorpayPaymentId || !razorpayOrderId) {
      throw new Error("Razorpay payment or order ID is missing from webhook.");
    }

    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from("token_purchases")
      .select("id, tokens, razorpay_order_id, razorpay_payment_id, status")
      .eq("razorpay_order_id", razorpayOrderId)
      .maybeSingle();

    if (purchaseError) {
      throw new Error(purchaseError.message);
    }

    if (!purchase) {
      throw new Error("Token purchase not found for Razorpay order.");
    }

    if (purchase.status === "paid") {
      await supabaseAdmin
        .from("payment_webhook_events")
        .update({
          processed: true,
          processed_at: new Date().toISOString(),
        })
        .eq("razorpay_event_id", eventId);

      return NextResponse.json({
        success: true,
        alreadyCompleted: true,
        purchaseId: purchase.id,
      });
    }

    const { data: result, error: completeError } = await supabaseAdmin.rpc(
      "complete_token_purchase_server",
      {
        p_purchase_id: purchase.id,
        p_razorpay_order_id: razorpayOrderId,
        p_razorpay_payment_id: razorpayPaymentId,
        p_razorpay_signature: signature,
      },
    );

    if (completeError) {
      throw new Error(completeError.message);
    }

    await supabaseAdmin
      .from("payment_webhook_events")
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
      })
      .eq("razorpay_event_id", eventId);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Razorpay webhook processing error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Webhook processing failed.",
      },
      {
        status: 500,
      },
    );
  }
}
