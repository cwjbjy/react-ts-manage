// const { __DEV__ } = require('./util');

const addBabelPlugins = () => {
  const configs = [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
    [
      'babel-plugin-styled-components',
      {
        displayName: process.env.NODE_ENV === 'development',
      },
    ],
    // ['react-activation/babel'],
  ];

  //   if (!__DEV__) {
  //     configs.push(['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]);
  //   }

  return configs;
};

module.exports = addBabelPlugins;
