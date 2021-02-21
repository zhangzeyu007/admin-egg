/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-21 11:27:14
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-21 12:35:33
 */
'use strict';
const BaseController = require('./base');

const uploadRule = {};

class GoodsController extends BaseController {
  async upload() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(uploadRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    console.log(payload);
  }
  async checkfile() {
    const { ctx, app, service } = this;
  }

}


module.exports = GoodsController;
