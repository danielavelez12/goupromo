import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        teal: { value: "#285E61" },
        tealHover: { value: "#DDFFA8" },
        darkTeal: { value: "#003032" },
        green: {
          value: "#BBEA71",
        },
        darkGreen: {
          value: "#02542D",
        },
        white: {
          value: "#FFFFFF",
        },
        hoverWhite: {
          value: "#E9E9E9",
        },
        lightGreen: {
          value: "#F1F5EA",
        },
        gray: {
          value: "#D9D9D9",
        },
        lightGray: {
          value: "#F4F6F6",
        },
        black: {
          value: "#000000",
        },
      },
    },
  },
  globalCss: {
    ":root": {
      "--header-height": { base: "64px", md: "104px" },
      "--content-height": "calc(100dvh - var(--header-height))",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

export default system;
