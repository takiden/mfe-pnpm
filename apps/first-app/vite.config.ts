import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
// import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "firstApp", // name of the fed group...
      filename: "remoteEntry.js", // default file name
      // Modules to expose
      exposes: {
        "./FirstApp": "./src/App.tsx",
      },
      shared: ["react", "react-dom"], // libs/deps to be shared
    }),
  ],
  build: {
    target: "esnext",
    outDir: "dist",
  },
  // resolve: {
  //   alias: {
  //     "@mfe/react-ui": path.resolve(__dirname, "../../packages/dist"),
  //   },
  // },
});
