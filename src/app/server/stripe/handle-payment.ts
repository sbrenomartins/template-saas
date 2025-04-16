import { db } from "@/app/lib/firebase";
import "server-only";
import Stripe from "stripe";

export async function handleStripePayment(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Pagamento realizado com sucesso, enviar email para e liberar acesso para o usuário."
    );

    const customerId = event.data.object.customer;

    const userRef = await db
      .collection("users")
      .where("stripeCustomerId", "==", customerId)
      .get();

    if (userRef.empty) {
      console.error("User not found");
      return;
    }

    const userId = userRef.docs[0].id;

    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
    });
  }
}
