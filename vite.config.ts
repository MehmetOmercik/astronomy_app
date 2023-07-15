/// <reference types="vitest"/>
/// <reference types="vite/client"/>
/** @type {import('jest').Config} */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      __VITE_ASTRONOMY_ENDPOINT__: JSON.stringify(env.VITE_ASTRONOMY_ENDPOINT),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@app": path.resolve(__dirname, "./src/app"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@features": path.resolve(__dirname, "src/features"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@test": path.resolve(__dirname, "src/test"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
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
    plugins: [react()],
  };
});
