import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server'; // if using webhooks

export async function POST(req: Request) {
  const body = await req.json();

  // Assuming you're sending email from your frontend or webhook
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // Check if the user already exists (Clerk might resend)
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' });
    }

    // Create the user in your database
    const newUser = await prisma.user.create({
      data: { email },
    });

    return NextResponse.json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
