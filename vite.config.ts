import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Burger Collector",
        short_name: "Burger Collector",
        description: "Burger collector as a birthday gift for Tom.",
        theme_color: "#aaaaaa",
        background_color: "#aaaaaa",
        display: "standalone",
        icons: [],
      },
    }),
  ],
  base: "/burger-collector/",
});
