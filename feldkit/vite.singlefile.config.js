import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Separater Build: erzeugt eine einzige, in sich geschlossene HTML-Datei.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: "dist-single", assetsInlineLimit: 100000000 },
});
