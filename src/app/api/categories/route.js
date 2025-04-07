import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error('Database Error:', {
      message: err.message,
      stack: err.stack
    });
    return new NextResponse(
      JSON.stringify({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined 
      }), 
      { status: 500 }
    );
  }
};