<div align="center">

# create-react-app-web-worker-experiment

Using **[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)** in a
**[TypeScript](https://github.com/microsoft/TypeScript)** **[React](https://github.com/facebook/react)** app, based on
**[create-react-app](https://github.com/facebook/create-react-app)**.

</div>

<br><br>

## How to make Web Workers work in a TypeScript React app

### 1. Install dependencies

First of all, we need a few new dependencies. In particular:

- We need **[react-app-rewired](https://github.com/timarney/react-app-rewired)** to hook into the Webpack configuration that `react-scripts`
  uses under the hood (without having to eject the config)
- We use the Webpack **[worker-loader](https://github.com/webpack-contrib/worker-loader)** to integrate Web Workers into our build process

Add both dependencies to your `package.json` file and install them. For example:

```diff
  {
    "devDependencies": {
+     "react-app-rewired": "2.1.x",
+     "worker-loader": "2.0.x"
    }
  }
```

<br>

### 2. Customize the build process

First, replace all mentions of `react-scripts` within the `scripts` area of your `package.json` file by `react-app-rewired`. This enables us
to tap into the build process in the next step. For example:

```diff
  {
    "scripts": {
-     "start": "react-scripts start",
+     "start": "react-app-rewired start",
-     "build": "react-scripts build",
+     "build": "react-app-rewired build",
-     "test": "react-scripts test",
+     "test": "react-app-rewired test",
    }
  }
```

Then, create a file named `react-app-rewired.config.js` (or whatever name you prefer) within the root folder of your project. This file will
be used by `react-app-rewired` when the build process runs, and allows us to customize the underlying Webpack configuration before the build
runs. Fill it with the following content:

```js
/**
 * React App Rewired Config
 */
module.exports = {
  // Update webpack config to use custom loader for worker files
  webpack: (config) => {
    // Note: It's important that the "worker-loader" gets defined BEFORE the TypeScript loader!
    config.module.rules.unshift({
      test: /\.worker\.ts$/,
      use: {
        loader: 'worker-loader',
        options: {
          // Use directory structure & typical names of chunks produces by "react-scripts"
          name: 'static/js/[id].worker.[contenthash:8].js',
        },
      },
    });
    return config;
  },
};
```

Finally, reference the `react-app-rewired.config.js` file in your `package.json` file by adding the following line:

```diff
  {
+   "config-overrides-path": "react-app-rewired.config.js",
  }
```

<br>

### 3. Create and use a Web Worker

Now you can start using Web Workers! Two things are important here: Files that contain a Web Worker must end with `*.worker.ts`, and they
must start with the following two lines of code in order to work nicely together with TypeScript:

```ts
declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };

// Your code ...
```

In your application, you can import your Web Workers like a normal module, and instantiate them as a class. For example:

```ts
import MyWorker from './MyWorker.worker';

const myWorkerInstance: Worker = new MyWorker();
```

<br>

### A note on testing

Soooo, Jest does not support Web Workers (see **[jest/#3449](https://github.com/facebook/jest/issues/3449)**). Plus, Jest does not use our
customized Webpack configuration anyways. Thus - using one of the many ways you can mock stuff in Jest - mock away Web Workers when testing
code that instantes them / works with them.

<br><br>

## Commands

The following commands are available:

| Command               | Description                                        | CI                 |
| --------------------- | -------------------------------------------------- | ------------------ |
| `npm start`           | Creates a development build, running in watch mode |                    |
| `npm run start:build` | Serves the production build                        |                    |
| `npm run build`       | Creates a production build                         | :heavy_check_mark: |
| `npm run test`        | Executes all unit tests                            | :heavy_check_mark: |
| `npm run test:watch`  | Executes all unit tests, running in watch mode     |                    |
