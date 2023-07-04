/// <reference types="vitest"/>
/// <reference types="vite/client"/>
/** @type {import('jest').Config} */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@app/*": path.resolve(__dirname, "./src/app"),
    },
  },
  plugins: [react()],
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
});
