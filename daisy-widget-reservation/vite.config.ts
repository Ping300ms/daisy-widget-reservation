import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  define: { "process.env": {} },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/widget/widget.tsx"),
      name: "DaisyWidget",
    },
    rollupOptions: {
      output: {
        entryFileNames: "daisy-widget-reservation.js",
      },
    },
    outDir: "public",
  },
});
