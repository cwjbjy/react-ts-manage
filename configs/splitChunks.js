const { __DEV__ } = require("./util");

const splitChunks = () => {
  if (!__DEV__) {
    return {
      strategy: 'split-by-experience',//采用esbuild默认分包模式，根据经验制定的策略
      override: { //自定义分包策略
        minSize: 30000,
        cacheGroups: {
          vendors: {
            name: "vendors",
            priority: 50,
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux|react-helmet|react-activation|rc-.+)[\\/]/,
            chunks: "all",
          },
          ui: {
            name: "ui",
            priority: 50,
            test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
            chunks: "all",
          },
          "echarts.vendor": {
            name: "echarts.vendor",
            priority: 40,
            test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
            chunks: "all",
            reuseExistingChunk: true,
          },
          modules: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'modules',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          "async-common": {
            chunks: "async",
            minChunks: 30,
            name: "async-commons",
            priority: 20,
            reuseExistingChunk: true,
          },
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 3,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      }
    };
  }
  return {};
};

module.exports = splitChunks;
