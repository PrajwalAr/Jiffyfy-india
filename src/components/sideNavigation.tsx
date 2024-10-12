"use client";

import {
  Box,
  Divider,
  LinkBox,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { PlayList } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import logo from "../public/logo.svg";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/home",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/home/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/home",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

export function SideNavigation({ playlists }: { playlists: PlayList[] }) {
  return (
    <Box className="h-full bg-black overflow-hidden">
      <Box className="flex items-center justify-center h-32 w-full my-3">
        <Image
          src={logo}
          alt="logo"
          height={60}
          width={120}
          className="shadow-slate-500"
        />
      </Box>
      <Box marginBottom="20px">
        <List spacing={2}>
          {navMenu.map((menu) => (
            <ListItem
              paddingX="20px"
              fontSize="16px"
              color="white"
              key={menu.name}
            >
              <LinkBox>
                <Link href={menu.route} passHref>
                  <>
                    <ListIcon
                      as={menu.icon}
                      color="gray.800"
                      marginRight="20px"
                    />
                    {menu.name}
                  </>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box marginTop="20px">
        <List spacing={2}>
          {musicMenu.map((menu) => (
            <ListItem
              paddingX="20px"
              fontSize="16px"
              color="white"
              key={menu.name}
            >
              <LinkBox>
                <Link href={menu.route} passHref>
                  <>
                    <ListIcon
                      as={menu.icon}
                      color="gray.800"
                      marginRight="20px"
                    />
                    {menu.name}
                  </>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider color="gray.800" paddingY="10px" />
      <Box
        height="52%"
        paddingY="20px"
        className="overflow-y-auto"
        sx={{
          scrollbarColor: "grey black",
        }}
        color="gray.600"
      >
        <List spacing={2}>
          {playlists
            ?.sort((a, b) => b.id - a.id)
            .map((playlist) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem paddingX="20px" key={playlist.id}>
                <LinkBox>
                  <Link href={`/playlist/${playlist.id}`} passHref>
                    {playlist.name}
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
}
