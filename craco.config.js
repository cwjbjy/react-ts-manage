const { alias, babelPlugins, cracoPlugins, splitChunks, webpackPlugins } = require('./configs');
module.exports = {
  webpack: {
    alias: alias,
    configure: (webpackConfig, { env }) => {
      if (env === 'development') {
        webpackConfig.devtool = 'eval-cheap-module-source-map';
        webpackConfig.resolve.extensions = ['.tsx', '.js', '.ts', '.jsx', '.json'];
      } else {
        webpackConfig.devtool = false;
      }
      const split = splitChunks();
      if (split) {
        webpackConfig.optimization.splitChunks = split;
      }
      webpackConfig.plugins.push(...webpackPlugins());
      return webpackConfig;
    },
  },
  babel: {
    plugins: babelPlugins(),
  },
  plugins: cracoPlugins(),
};
