import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    console.log("🚀 Incoming request to /api/post-product");

    // Step 1: Get current authenticated user
    const user = await currentUser();
    if (!user) {
      console.warn("⚠️ Unauthorized: No user found");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.log("✅ Authenticated user:", user.id);

    // Step 2: Parse JSON body
    const body = await req.json();
    console.log("📦 Request body received:", body);

    const { name, description, numericPrice, imageUrls, cities = [], suburbs = [] } = body;

    // Step 3: Validate input
    if (!name || !description || !numericPrice || !imageUrls || !Array.isArray(imageUrls)) {
      console.error("❌ Validation failed: Missing required fields or invalid imageUrls");
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    console.log("✅ Input validation passed");

    // Step 4: Insert product into database
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: numericPrice,
        images: imageUrls, // Ensure your Prisma schema has a 'images' field of type string[]
        cities,
        suburbs,
        userId: user.id, // OPTIONAL: Associate product with the user
      },
    });
    console.log("🎉 Product created in database:", product);

    return NextResponse.json({ product }, { status: 201 });

  } catch (error) {
    console.error("🔥 Product creation error:", error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
