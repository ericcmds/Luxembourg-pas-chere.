
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      clientPort: 443,
      protocol: 'wss',
    },
    host: true,
    strictPort: true,
    cors: {
      origin: '*',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "..", "shared"),
    },
  },
});
