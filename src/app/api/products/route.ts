import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { name, description, price, images } = await req.json(); // 🎯 images is now an array

  try {
    const product = await prisma.product.create({
      data: { 
        name, 
        description, 
        price, 
        images, // 📸 Save the array of image URLs
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error posting product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
