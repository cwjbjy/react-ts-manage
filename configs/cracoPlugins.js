const path = require('path');

const sassResourcesLoader = require('craco-sass-resources-loader');

const addCracoPlugins = () => {
  return [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: path.resolve(__dirname, '../src/assets/scss/index.scss'),
      },
    },
  ];
};

module.exports = addCracoPlugins;
