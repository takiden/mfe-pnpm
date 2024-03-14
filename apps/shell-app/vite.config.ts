import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell", // name of the fed group...
      remotes: {
        firstApp: "http://127.0.0.1:4173/assets/remoteEntry.js",
        secondApp: "http://127.0.0.1:4174/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"], // libs/deps to be shared
    }),
  ],
});
