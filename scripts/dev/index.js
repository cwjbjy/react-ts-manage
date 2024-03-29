const fs = require('fs');
const path = require('path');

const ejs = require('ejs');
const inquirer = require('inquirer');

const { routerPath, routerModuleConfig } = require('./config');

//选中的模块
const chooseModules = [];

function deelRouteName(name) {
  const preRoute = './';
  return preRoute + name;
}

const getContentTemplate = async () => {
  const html = await ejs.renderFile(
    path.resolve(__dirname, 'router.config.template.ejs'),
    { chooseModules, deelRouteName },
    { async: true },
  );
  fs.writeFileSync(path.resolve(__dirname, routerPath), html);
};

function promptModule() {
  inquirer
    .prompt({
      type: 'checkbox',
      name: 'modules',
      message:
        '请选择启动的模块, 点击上下键选择, 按空格键确认(可以多选), 回车运行。注意: 直接敲击回车会全量编译, 速度较慢。',
      pageSize: 20,
      choices: routerModuleConfig.map((item) => {
        return {
          name: item,
          value: item,
        };
      }),
    })
    .then((answers) => {
      if (answers.modules.length === 0) {
        chooseModules.push(...routerModuleConfig);
      } else {
        chooseModules.push(...answers.modules);
      }
      getContentTemplate();
    });
}

promptModule();
