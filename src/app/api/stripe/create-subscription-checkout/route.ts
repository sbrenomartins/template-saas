import { auth } from "@/app/lib/auth";
import stripe from "@/app/lib/stripe";
import { getOrCreateCustomer } from "@/app/server/stripe/get-customer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { testeId } = await request.json();

  const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

  if (!price) {
    return NextResponse.json({ error: "Price not found" }, { status: 500 });
  }

  const session = await auth();
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;

  if (!userId || !userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customerId = await getOrCreateCustomer(userId, userEmail);

  const metadata = {
    testeId,
    price,
    userId,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/payments`,
      metadata,
      customer: customerId,
    });

    if (!session.url) {
      return NextResponse.json(
        {
          error: "Session URL not found",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating payment checkout:", error);
    return NextResponse.json(
      { error: "Error creating subscription checkout" },
      { status: 500 }
    );
  }
}
