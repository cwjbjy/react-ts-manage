const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const minimist = require("minimist");
// const CompressionPlugin = require('compression-webpack-plugin');

const { __DEV__ } = require("./util");

const options = minimist(process.argv.slice(2));

const webpackPlugins = () => {
  const configs = [
    new WebpackBar({
      name: __DEV__ ? "正在启动" : "正在打包",
      color: __DEV__ ? "#00ff00" : "#fa8c16",
    }),
  ];
  if (options.analysis) {
    configs.push(new BundleAnalyzerPlugin());
  }
  //   if (!__DEV__) {
  //     configs.push(new CompressionPlugin());
  //   }

  return configs;
};

module.exports = webpackPlugins;
