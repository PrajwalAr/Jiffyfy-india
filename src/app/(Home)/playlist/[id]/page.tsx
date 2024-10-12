import { GradientLayout } from "@/components/gradientLayout";
import prisma from "@/lib/prisma";
import { validateToken } from "@/lib/validateRoute";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SongTable } from "./client/songTable";

const getBGColor = (id: number) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

export default async function PlaylistHome({
  params,
}: {
  params: { id: number };
}) {
  const { id: playlistId } = params;
  let userToken;

  try {
    userToken = validateToken(cookies().get("JIFFYFY_ACCESS_TOKEN")?.value);
  } catch (e) {
    redirect("/signin");
  }

  const [playlist] = await prisma.playList.findMany({
    where: {
      id: +playlistId,
      userId: userToken.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return (
    <GradientLayout
      color={getBGColor(playlist.id)}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
}
