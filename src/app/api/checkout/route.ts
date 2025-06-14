import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { currentUser } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  const { priceId } = await req.json();
  const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/success`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`;

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'User not authenticated.' }, { status: 401 });
  }

  try {
    // 🔥 Step 1: Check if Stripe customer exists OR create one
    let stripeCustomerId = user.privateMetadata?.stripeCustomerId as string | undefined;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0]?.emailAddress,
        metadata: {
          clerkUserId: user.id,
        },
      });

      stripeCustomerId = customer.id;

      // Update the user's metadata in Clerk with Stripe customer ID
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/save-stripe-customer-id`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, stripeCustomerId }),
      });
    }

    // 🔥 Step 2: Create Checkout Session, email locked to customer account
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription', // or 'payment' if using one-time payments
      customer: stripeCustomerId, // 👈 Email is locked to this customer!
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
