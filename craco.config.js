const path = require('path');

const { addAfterLoader, loaderByName } = require('@craco/craco');

const { alias, babelPlugins, splitChunks, webpackPlugins } = require('./configs');

module.exports = {
  webpack: {
    alias: alias,
    configure: (webpackConfig, { env }) => {
      //devtool
      if (env === 'development') {
        webpackConfig.devtool = 'eval-cheap-module-source-map';
        webpackConfig.resolve.extensions = ['.tsx', '.js', '.ts', '.jsx', '.json'];
      } else {
        webpackConfig.devtool = false;
      }

      //optimization
      const split = splitChunks();
      if (split) {
        webpackConfig.optimization.splitChunks = split;
      }

      //plugin
      webpackConfig.plugins.push(...webpackPlugins());

      //loader
      addAfterLoader(webpackConfig, loaderByName('sass-loader'), {
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [path.resolve(__dirname, './src/assets/scss/index.scss')],
        },
      });

      return webpackConfig;
    },
  },
  babel: {
    plugins: babelPlugins(),
  },
  // plugins: cracoPlugins(),  //craco自定义plugin
};
