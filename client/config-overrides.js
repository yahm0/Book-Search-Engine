const webpack = require('webpack');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    'stream': require.resolve('stream-browserify')
  }),
  (config) => {
    config.resolve.fallback = {
      stream: require.resolve('stream-browserify'),
      // Add other fallbacks here if needed
    };
    return config;
  }
);
