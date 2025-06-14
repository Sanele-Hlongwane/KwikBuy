import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1️⃣ Fetch logged-in user from Clerk
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized 🛑' }, { status: 401 });
    }

    const { id: clerkUserId, emailAddresses, imageUrl, firstName, lastName } = user;
    const email = emailAddresses[0]?.emailAddress || '';
    const name = `${firstName || ''} ${lastName || ''}`.trim();

    // 2️⃣ See if the user already exists in Prisma (your DB)
    let dbUser = await prisma.user.findUnique({
      where: { clerkUserId }
    });

    // 3️⃣ If not found, create the user
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkUserId,
          email,
          name,
          imageUrl,
          isActive: true,
          currentPlan: 'free',
        }
      });

      console.log('🚀 New user created in Supabase:', email);
    }

    // 4️⃣ Return user from your DB
    return NextResponse.json({ user: dbUser });

  } catch (err) {
    console.error('💥 Error syncing user:', err);
    return NextResponse.json({ error: 'Server error. Call IT 😂' }, { status: 500 });
  }
}
