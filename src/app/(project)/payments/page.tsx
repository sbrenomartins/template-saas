"use client";

import { useStripe } from "@/app/hooks/useStripe";

export default function PaymentsPage() {
  const {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  } = useStripe();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold mb-4">Payments</h1>
      <button
        className="border rounded-sm px-1 cursor-pointer"
        onClick={() => createPaymentStripeCheckout({ testeId: 123 })}
      >
        Gerar pagamento com Stripe
      </button>
      <button
        className="border rounded-sm px-1 cursor-pointer"
        onClick={() => createSubscriptionStripeCheckout({ testeId: 123 })}
      >
        Gerar assinatura com Stripe
      </button>
      <button
        className="border rounded-sm px-1 cursor-pointer"
        onClick={() => handleCreateStripePortal()}
      >
        Gerar portal de pagamentos
      </button>
    </div>
  );
}
