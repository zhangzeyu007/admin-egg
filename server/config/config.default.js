/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:21:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-26 13:07:16
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612405279249_5180';

  // eggjs 安全配置
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 配置moogose
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/shop',
    options: {
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  };
  // 中间件配置
  config.middleware = [];

  // eggjs 跨域配置
  config.cors = {
    origin: 'http://localhost:8080', // 表示允许的源
    allowMethods: 'GET,HEAD,PUT,POST', // 表示允许的http请求方式
    credentials: true, // 开启认证
  };

  config.validate = {
    convert: true, // 对参数可以使用convertType规则进行类型转换
    validateRoot: false, // 限制被验证值必须是一个对象。
  };

  config.jwt = {
    secret: 'kkbzhangzeyu',
  };
  // 上传文件配置
  config.multipart = {
    mode: 'file',
    whitelist: () => true,
  };

  config.UPLOAD_DIR = path.resolve(__dirname, '..', 'app/public');

  // add your user config here
  const userConfig = {
    myAppName: 'admin-egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
