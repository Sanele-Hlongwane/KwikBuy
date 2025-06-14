import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(req: NextRequest) {
  // For your use case, GET is probably enough, but add POST if needed
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({ where: { clerkUserId: user.id } });

  if (!dbUser) {
    return NextResponse.json({ message: 'User not found in DB' }, { status: 404 });
  }

  if (dbUser.stripeCustomerId) {
    return NextResponse.json({ customerId: dbUser.stripeCustomerId }, { status: 200 });
  }

  try {
    const customer = await stripe.customers.create({
      email: dbUser.email,
      name: dbUser.name || '',
      metadata: {
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: { clerkUserId: user.id },
      data: { stripeCustomerId: customer.id },
    });

    return NextResponse.json({ customerId: customer.id }, { status: 200 });
  } catch (error) {
    console.error('Stripe customer creation failed:', error);
    return NextResponse.json({ message: 'Stripe error', error }, { status: 500 });
  }
}
