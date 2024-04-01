const Vue = require("vue");
const renderer = require("vue-server-renderer").createRenderer();
const fs = require("fs");
const path = require("path");

// 读取 Vue 单文件组件
const appPath = path.resolve(__dirname, "./App.vue");
const appSource = fs.readFileSync(appPath, "utf-8");

// 创建渲染器
const renderVueApp = async () => {
  const app = new Vue({
    template: appSource,
  });

  try {
    const html = await renderer.renderToString(app);
    return html;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

module.exports = renderVueApp;
