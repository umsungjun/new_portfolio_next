import { prisma } from "@/lib/server/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.question.findMany({
      select: {
        id: true,
        content: true,
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
