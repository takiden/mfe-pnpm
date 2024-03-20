# About this project

## Monorepos are not Microfrontends

**Monorepos** are ment to have different projects, that are sharing some elements or library as well as dependencies, so that updating dependencies will be achieved for all projects in "one shot", so to say.

**Micro Frontends** is very much similar to micro-services in Backend, where you have a certain enclosed service in the frontend, and you want to share it between multiple (Web)-Applications.

## How the setup works

I didn't use any third party tool to create the mono-repo other than our package manager (**PNPM**), Since it does support **the concept of workspaces**.

These are the general steps to get this set up:

1. Create a folder, let us call it `my-mono-repo`
2. `cd my-mono-repo && pnpm init`
3. `touch pnpm-worksapce.yaml`
   3.1. inside this file you define the workspaces for the monorepo, thus please add in that file

```
packages:
  - "./packages/**"
  - "./apps/**"
```

4. `mkdir packages apps`
5. In `packages` let us create a ui-library for react-components. Let us call it `reactUi`. To do so, create a vite-project with `pnpm create vite`
6. In `Apps` folders let us create two apps (first-app, second-app), also with `pnpm create vite`
7. Move all dependencies from the local `package.json` in each application, to the global `package.json` at the root of the mono-repo-directory.

## Configurations

After creating all projects and packages, it is time to configure each of them to make them aware of each other. Here we have to differentiate between App-configuration and package/library configuration.

### Package/Library Configuration

Let us start with our ui-library "reactUi"
`cd packages/reactUi`. Here we have to do basically changes to local `package.json` and `vite.config.ts`

#### Package.json

```
{
  name: "@myrepo/react-ui", // "@myrepo" is a **user defined string** that indicats, that this project, i.e. react-ui, belong to a workspace structure
  "type": "module",
  "module": "./dist/react-ui.js",
  "types": "./dist/main.d.ts",
  "files": [
    "dist"
  ],
  // ... other package.json properties
}
```

#### vite.config.ts

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts"; // this package has to be installed. Its purpose is to have auto export for *.d.ts files

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/main.tsx", // make sure you have the correct name
      formats: ["es"], // ECMA_Module
      name: "ReactUI", // the name I am giving to the package
    },
    rollupOptions: {
      external: ["react", "react-dom"], // these are shared libraries between other components of the mono-repo
    },
  },
  plugins: [react(), dts()], // don't forget to update the plugin list with "dts()"
});
```

### App Configuration

Let us take the App "first-app". "second-app"

#### Package.json

```
{
  name: "@myrepo/first-app", // notice again the "@myrepo" prefix again
}
```

#### vite.config.ts

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
      shared: ["react", "react-dom"], // libs/deps to be shared
    }),
  ],
  build: {
    target: "esnext",
    outDir: "dist",
  }
});
```

# The workflow

1. Create a new component in `reactUi` such as `MyTitle`
2. Export it in `packages/react-ui/src/main.tsx` like

```
export { default as MyTitle } from "./MyTitle/my-title";
```

3. Build `reactUi`
4. Add reactUi as dev-dependency in first-app by running this command in `first-app`directory:

```
pnpm add -D @myrepo/react-ui@workspaces:*
```

5. enjoy using the component `MyTitle` as shared component without the needs for waiting for building artifacts in Gitlab :)

_Notes_

- You can create a global scripts that can be run from the root of the mono repo for a specific project or app. For example, to run scripts in `first-app` from any where in the mono-repo: in the root `package.json`:

```
// .. other package.json props
scripts: {
  "firstApp": "pnpm --filter @mfe/first-app"
}
```

then from anywhere in the repo you can run

```
pnpm firstApp run <name of script in first-app/package.json>
```

- To have automatic build for `react-ui` library, use this script-command:

```
  "scripts": {
    "dev": "vite build --watch"
  }
```

# For more information:

https://hackernoon.com/how-to-set-up-a-monorepo-with-vite-typescript-and-pnpm-workspaces
https://earthly.dev/blog/yarn-vite-monorepo/
https://www.youtube.com/watch?v=HM03XGVlRXI&t=629s
