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
          name: 'static/js/[id].worker.[contenthash:8].js',
        },
      },
    });
    return config;
  },
};
