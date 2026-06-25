import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "ghpages" ? "/bisharod/" : "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
