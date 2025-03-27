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
    // Create the Stripe checkout session with email pre-filled
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'zar',
            product_data: {
              name: 'KwikBuy Subscription',
            },
            unit_amount: priceId, // Price in cents (1 ZAR = 100 cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: user.emailAddresses[0]?.emailAddress, // 👈 Autofill the email field in Stripe
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
