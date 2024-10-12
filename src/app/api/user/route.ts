import prisma from "@/lib/prisma";
import { validateRoute } from "@/lib/validateRoute";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await validateRoute(async (_, user) => {
    const playlistsCount = await prisma.playList.count({
      where: { userId: user?.id! },
    });

    return NextResponse.json(
      { ...user, playlistsCount },
      {
        status: 200,
      }
    );
  })(request);
  prisma.$disconnect();

  return response;
}
