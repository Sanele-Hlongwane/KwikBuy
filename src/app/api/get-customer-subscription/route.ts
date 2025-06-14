import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    console.log("❌ No user signed in.");
    return NextResponse.json({ message: 'You need to sign in first.' }, { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({ where: { clerkUserId: user.id } });

  if (!dbUser) {
    console.log("❌ User not found in database.");
    return NextResponse.json({ message: 'User not found. Please contact support.' }, { status: 404 });
  }

  if (!dbUser.stripeCustomerId) {
    console.log("⚠️ No Stripe customer ID for this user.");
    return NextResponse.json({ message: 'No Stripe customer found for this user.' }, { status: 404 });
  }

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: dbUser.stripeCustomerId,
      status: 'active',
      expand: ['data.default_payment_method'],
      limit: 1,
    });

    const subscription = subscriptions.data[0];

    if (!subscription) {
      console.log("ℹ️ Stripe customer exists but has NO subscription → Free Plan.");
      return NextResponse.json({
        customerId: dbUser.stripeCustomerId,
        currentPlan: "free",
        subscribed: false,
        message: 'You are currently on the Free Plan. Upgrade anytime to unlock premium features.',
      }, { status: 200 });
    }

    const currentPlan = subscription.items.data[0]?.price.nickname || null;

    console.log(`✅ Active subscription found → Plan: ${currentPlan}`);

    return NextResponse.json({
      customerId: dbUser.stripeCustomerId,
      currentPlan,
      subscribed: true,
      message: `You are subscribed to the "${currentPlan}" plan.`,
    }, { status: 200 });
  } catch (error) {
    console.error('🔥 Stripe subscription fetch error:', error);
    return NextResponse.json({ message: 'Something went wrong when checking your subscription.', error }, { status: 500 });
  }
}
