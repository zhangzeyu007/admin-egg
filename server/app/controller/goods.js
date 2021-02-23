/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-21 11:27:14
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-22 17:09:43
 */
'use strict';
const BaseController = require('./base');
const uploadRule = {};
const fse = require('fs-extra');

class GoodsController extends BaseController {
  async upload() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    console.log(ctx.request.body);
    const errors = app.validator.validate(uploadRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    const file = ctx.request.files[0];
    await fse.move(file.filepath, this.config.UPLOAD_DIR);
  }
  async checkfile() {
    const { ctx, app, service } = this;
  }

}


module.exports = GoodsController;
