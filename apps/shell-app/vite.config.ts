import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";
// https://vitejs.dev/config/
export default defineConfig((confObj) => {
  const env = loadEnv(confObj.mode, process.cwd(), "");
  console.log("--------------------");
  console.log(env.NODE_ENV);
  console.log("--------------------");
  return {
    plugins: [
      react(),
      federation({
        name: "shell", // name of the fed group...
        remotes: {
          FirstApp: "http://localhost:4173/assets/remoteEntry.js",
          SecondApp: "http://127.0.0.1:4174/assets/remoteEntry.js",
        },
        shared: ["react", "react-dom"], // libs/deps to be shared
      }),
      topLevelAwait(),
    ],
  };
});
