import { db } from "@/app/lib/firebase";
import "server-only";
import Stripe from "stripe";
import { handleSendCancelEmail } from "../email/handle-send-email";

export async function handleStripeCancelSubscription(
  event: Stripe.CustomerSubscriptionDeletedEvent,
) {
  console.log("Cancelou a assinatura");

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
  const userEmail = userRef.docs[0].data().email;
  const userName = userRef.docs[0].data().name;

  await db.collection("users").doc(userId).update({
    subscriptionStatus: "inactive",
  });

  await handleSendCancelEmail(userEmail, userName);
}
