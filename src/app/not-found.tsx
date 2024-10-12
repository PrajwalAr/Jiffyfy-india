import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <Box className="h-screen flex justify-center items-center bg-indigo-300 flex-col">
      <Text className="uppercase">
        The Page you are looking for seems to be broken
      </Text>
      <Link className=" text-zinc-700" href="/home" passHref>
        Return to Home
      </Link>
    </Box>
  );
}
