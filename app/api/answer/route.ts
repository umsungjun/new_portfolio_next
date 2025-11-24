import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/server/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, message: "잘못된 ID 값입니다." },
        { status: 400 }
      );
    }

    const data = await prisma.answer.findMany({
      where: { questionId: Number(id) },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `서버 내부 오류가 발생했습니다. ${error}` },
      { status: 500 }
    );
  }
}
