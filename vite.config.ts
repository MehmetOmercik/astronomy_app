/// <reference types="vitest"/>
/// <reference types="vite/client"/>
/** @type {import('jest').Config} */
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      __VITE_ASTRONOMY_ENDPOINT__: JSON.stringify(env.VITE_ASTRONOMY_ENDPOINT),
    },
    test: {
      globals: true,
      environment: "jsdom",
      css: true,
      setupFiles: "./src/test/setup.ts",
      coverage: {
        all: true,
        provider: "istanbul",
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_ASTRONOMY_ENDPOINT, // Replace with your API server URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""), // Optional rewrite path
        },
      },
    },
    plugins: [react(), tsconfigPaths()],
  };
});
