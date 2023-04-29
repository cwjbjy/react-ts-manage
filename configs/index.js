const { __DEV__ } = require("./util");

module.exports = {
  __DEV__,
  alias: require("./alias"),
  babelPlugins: require("./babelPlugins"),
  cracoPlugins: require("./cracoPlugins"),
  splitChunks: require("./splitChunks"),
  webpackPlugins: require("./webpackPlugins"),
};
