"use client";

import { Box, Button, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Auth } from "../../../lib/mutation";
import logo from "../../../public/logo.svg";

export function AuthFrom({ mode }: { mode: "signin" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    await Auth(mode, { email, password });
    setIsLoading(false);
    router.push("/home");
  };

  return (
    <Box className="h-screen w-screen bg-black text-white">
      <Box className="flex justify-center items-center h-1/4 border-b border-solid">
        <Image src={logo} height={60} width={120} alt="logo" />
      </Box>
      <Box className="flex flex-col items-center h-3/4 border-b border-solid">
        <Text className="uppercase py-6">{mode}</Text>
        <Box className="p-[50px] w-1/4 rounded-md" bg="gray.900">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
