/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-07 18:25:58
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-08 21:14:37
 */
'use strict';
const { Controller } = require('egg');

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 200,
      message: '请求成功',
      data,
    };
  }
  message(message) {
    this.ctx.body = {
      code: 200,
      message,
    };
  }
  error(message, code = -1, errors = {}) {
    this.ctx.body = {
      code,
      message,
      errors,
    };
  }
}


module.exports = BaseController
;
