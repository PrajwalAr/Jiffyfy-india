"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { action, createStore, StoreProvider } from "easy-peasy";
import React from "react";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5f5f5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    components: {
      Button: {
        variants: {
          link: {
            ":focus": {
              outline: "none",
              boxShadow: "none",
            },
          },
        },
      },
    },
  },
});

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <StoreProvider store={store}>{children}</StoreProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
