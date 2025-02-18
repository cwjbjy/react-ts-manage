import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
const { pluginStyledComponents } = require('@rsbuild/plugin-styled-components');
import { pluginSvgr } from '@rsbuild/plugin-svgr';
const { splitChunks,__PRO__ } = require('./configs');
const CompressionPlugin = require('compression-webpack-plugin');

export default defineConfig({
  html: {
    template: './public/index.html', //如果没有指定 template，默认会使用 Rsbuild 内置的 HTML 模板
  },
  dev: { lazyCompilation: true },
  performance: {
    chunkSplit: splitChunks(),
    removeConsole: true,
    bundleAnalyze: process.env.BUNDLE_ANALYZE ? {} : undefined,
  },
  plugins: [
    pluginReact(),
    pluginStyledComponents(),
    pluginSvgr(),
    pluginSass({
        sassLoaderOptions(config) {
          config.additionalData = '@import "@/assets/scss/index.scss";'
        },
      }),
  ],
  output: {
    distPath: {
      root: 'build',
    },
  },
  tools: {
    rspack: (config, { addRules, appendPlugins }) => {
      addRules([
        {
          test: /\.(xlsx|xls|txt|pdf|doc|docs)$/,
          type: 'asset/resource', 
          generator: {
            filename: 'static/files/[name].[hash][ext]',//输出到指定文件目录
          },
        },
      ]);
      const plugins = [
        __PRO__ && new CompressionPlugin(),
      ].filter(Boolean);
      appendPlugins(plugins);
    },
  },
});
