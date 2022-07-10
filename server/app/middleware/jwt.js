/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-17 15:54:46
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-11 14:49:02
 */

'use strict';
// 解析token的中间件，也可以用egg-jwt，自己封装更适合了解原理
const jwt = require('jsonwebtoken');

module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    if (!ctx.request.header.authorization) {
      ctx.body = {
        code: -666,
        message: '用户没有登录',
      };
      return;
    }
    // * token 请求头设置
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    try {
      const ret = await jwt.verify(token, app.config.jwt.secret);
      ctx.state.username = ret.username;
      await next();
    } catch (err) {
      console.log(err);
      if (err.name === 'TokenExpiredError') {
        ctx.body = {
          code: -666,
          message: '登录过期了',
        };
      } else {
        ctx.body = {
          code: -1,
          message: '用户信息出错',
        };
      }
    }
  };
};
