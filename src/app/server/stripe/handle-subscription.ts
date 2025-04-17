import { db } from "@/app/lib/firebase";
import "server-only";
import Stripe from "stripe";
import { handleSendSuccessEmail } from "../email/handle-send-email";

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent,
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Pagamento realizado com sucesso, enviar email para e liberar acesso para o usuário.",
    );

    const metadata = event.data.object.metadata;
    const userId = metadata?.userId;

    if (!userId) {
      console.error("User ID not found in metadata");
      return;
    }

    const userRef = await db.collection("users").doc(userId).get();

    if (!userRef.exists) {
      console.error("User not found");
      return;
    }

    const userEmail = userRef.data()?.email;
    const userName = userRef.data()?.name;

    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
    });

    await handleSendSuccessEmail(userEmail, userName);
  }
}
