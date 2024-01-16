const fs = require('fs');
const path = require('path');
// 开发环境 router 文件路径
const routerPath = '../../src/router/dev.routerConfig.tsx';

// 实际业务中的所有模块
const routerModuleConfig = fs
  .readdirSync(path.resolve(__dirname, '../../src/router'))
  .map((item) => item.replace(/(.*)\.[jt]sx?$/, '$1'))
  .filter((file) => !['index', 'routes', 'dev.routerConfig'].includes(file));

module.exports = {
  routerPath,
  routerModuleConfig,
};
