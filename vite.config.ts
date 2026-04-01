import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        content: "src/main.tsx",
      },
      output: {
        assetFileNames: "[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [react(), svgr()],
});
