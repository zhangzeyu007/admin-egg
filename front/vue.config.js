/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:31
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-19 19:59:53
 * @FilePath: \admin-egg\front\vue.config.js
 */
const path = require("path");
module.exports = {
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.worker.js$/,
      use: {
        loader: "worker-loader",
        options: { inline: true, name: "workerName.[hash].js" },
      },
    });
  },
  parallel: false,
  chainWebpack: (config) => {
    config.output.globalObject("this");
  },
};
