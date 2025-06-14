import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  const dbUser = await prisma.user.findUnique({ where: { clerkUserId: user.id } });
  if (!dbUser) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  if (!dbUser.stripeCustomerId) return NextResponse.json({ message: 'Stripe customer ID missing' }, { status: 400 });

  const { priceId } = await req.json(); // expects { priceId: string } sent from client

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // or 'payment' depending on your use case
      customer: dbUser.stripeCustomerId, // lock user email by passing existing customer
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error('Stripe checkout session creation error:', error);
    return NextResponse.json({ message: 'Checkout session creation failed' }, { status: 500 });
  }
}
