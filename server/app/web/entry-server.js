const Vue = require("vue");
const renderer = require("vue-server-renderer").createRenderer();
const fs = require("fs");
const path = require("path");

// 读取 Vue 单文件组件
const appPath = path.resolve(__dirname, "./App.vue");
const appSource = fs.readFileSync(appPath, "utf-8");

// 解析 Vue 单文件组件
const { parseComponent } = require("vue-template-compiler");
const parsedComponent = parseComponent(appSource);

// 创建渲染器
const renderVueApp = async () => {
  // 从解析后的组件中提取模板和脚本
  // const { template, script } = parsedComponent;
  // 编译模板
  // const compiledTemplate = Vue.compile(template);

  // // 创建组件对象
  // const component = {
  //   render: parsedComponent.render,
  //   staticRenderFns: parsedComponent.staticRenderFns,
  //   data() {
  //     return script.data ? script.data() : {};
  //   },
  // };

  const app = new Vue(parsedComponent);

  try {
    const html = await renderer.renderToString(app);
    return html;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

module.exports = renderVueApp;
