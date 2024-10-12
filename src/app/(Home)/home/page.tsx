import prisma from "@/lib/prisma";
import { Artist } from "@prisma/client";
import { HomePage } from "./client/homePage";

export default async function Home() {
  const artists: Artist[] = await prisma.artist.findMany({});

  return <HomePage artists={artists} />;
}
