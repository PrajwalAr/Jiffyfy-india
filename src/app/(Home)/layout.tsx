import { PlayerBar } from "@/components/playerBar";
import { SideNavigation } from "@/components/sideNavigation";
import prisma from "@/lib/prisma";
import { Box } from "@chakra-ui/react";
import { PlayList } from "@prisma/client";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default async function HomeLayout({ children }: LayoutProps) {
  const playlists: PlayList[] = await prisma.playList.findMany({});
  return (
    <Box className="w-screen h-screen">
      <Box className="w-1/6 h-5/6">
        <SideNavigation playlists={playlists} />
      </Box>
      <Box
        className="absolute w-5/6 right-0 h-5/6 top-0"
        sx={{
          scrollbarColor: "grey black",
        }}
      >
        {children}
      </Box>
      <Box className=" h-1/6 w-full">
        <PlayerBar />
      </Box>
    </Box>
  );
}
