const { execSync } = require('child_process');
const minimist = require('minimist');

// 解析命令行参数
const argv = minimist(process.argv.slice(2));

if (argv.analyze) {
  process.env.BUNDLE_ANALYZE = true;
}

execSync('rsbuild build', { stdio: 'inherit' });
