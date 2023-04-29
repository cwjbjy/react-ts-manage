const { __DEV__ } = require("./util");

const splitChunks = () => {
  if (!__DEV__) {
    return {
      chunks: "all",
      minSize: 30000,
      name: false,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        "text-encoding": {
          chunks: "async",
          test: /[\\/]node_modules[\\/]text-encoding[\\/]/,
          name: "text-encoding.vendor",
          priority: 40,
        },
        pako: {
          chunks: "async",
          test: /[\\/]node_modules[\\/]pako[\\/]/,
          name: "pako.vendor",
          priority: 40,
        },
        "d3.vendor": {
          chunks: "async",
          test: /[\\/]node_modules[\\/](d3|d3-.+)[\\/]/,
          name: "d3.vendor",
          priority: 40,
        },
        "html2canvas.vendor": {
          chunks: "async",
          test: /[\\/]node_modules[\\/](html2canvas)[\\/]/,
          name: "h2c.vendor",
          priority: 40,
        },
        vendors: {
          name: "vendors",
          priority: 40,
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux|react-helmet|react-activation|rc-.+)[\\/]/,
          chunks: "all",
        },
        antd: {
          name: "antd",
          priority: 40,
          test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
          chunks: "all",
        },
        "echarts.vendor": {
          name: "echarts.vendor",
          priority: 40,
          test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
          chunks: "all",
        },
        "async-common": {
          chunks: "async",
          minChunks: 2,
          name: "async-commons",
          priority: 30,
        },
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2,
          priority: 20,
        },
      },
    };
  }
  return {};
};

module.exports = splitChunks;
