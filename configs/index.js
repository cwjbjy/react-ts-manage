const { __DEV__ ,__PRO__} = require("./util");

module.exports = {
  __DEV__,
  __PRO__,
  splitChunks: require("./splitChunks"),
};
