import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prismaClient = new PrismaClient();

async function main() {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prismaClient.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map(({ name, duration, url }) => ({
              name,
              duration,
              url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prismaClient.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: bcrypt.hashSync("password", salt),
      firstName: "Prajwal",
      lastName: "Ravichandra",
    },
  });

  const songs = await prismaClient.song.findMany({});

  await Promise.all(
    new Array(10).fill(1).map(async (_, index) => {
      return prismaClient.playList.upsert({
        where: { id: index + 1 },
        update: {},
        create: {
          name: `Playlist No ${index + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map(({ id }) => ({
              id,
            })),
          },
        },
      });
    })
  );
}

main()
  .catch((e) => {
    console.log("Prisma Error", e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
