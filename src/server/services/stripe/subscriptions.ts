import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

const PLAN_PRICE_IDS = {
  STARTER: process.env.STRIPE_PRICE_STARTER,
  PROFESSIONAL: process.env.STRIPE_PRICE_PROFESSIONAL,
  ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE
} as const;

export type PlanName = keyof typeof PLAN_PRICE_IDS;

export async function createCheckoutSession(params: {
  customerEmail: string;
  plan: PlanName;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const price = PLAN_PRICE_IDS[params.plan];
  if (!price) {
    throw new Error(`Missing Stripe price id for plan ${params.plan}`);
  }

  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: params.customerEmail,
    line_items: [{ price, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl
  });
}
