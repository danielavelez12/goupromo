import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "daniela-w3",
    project: "goupromo"
  })],

  optimizeDeps: {
    include: ["@chakra-ui/react"],
  },

  build: {
    sourcemap: true
  }
});