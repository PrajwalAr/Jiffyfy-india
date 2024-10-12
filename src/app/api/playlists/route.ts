import prisma from "@/lib/prisma";
import { PlayList } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const playlists: PlayList[] = await prisma.playList.findMany({});
  return NextResponse.json(playlists, { status: 200 });
}
