import { Box, Text } from "@chakra-ui/react";

export default function HomePageLoading() {
  return (
    <Box className="h-full flex justify-center items-center bg-indigo-300 flex-col">
      <Text className="uppercase text-2xl">Curating Your Top Feeds</Text>
    </Box>
  );
}
