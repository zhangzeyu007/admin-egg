/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-07 11:38:58
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-23 08:46:52
 */
'use strict';

const svgCaptcha = require('svg-captcha');
const fse = require('fs-extra');
const BaseController = require('./base');
const uploadRule = {};


class UtilController extends BaseController {
  // 验证码接口
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      noise: 3,
    });
    ctx.session.captcha = captcha.text;
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }
  // 上传接口
  async upload() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    console.log(ctx);
    const errors = app.validator.validate(uploadRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    const file = ctx.request.files[0];
    await fse.move(file.filepath, this.config.UPLOAD_DIR);
    this.success('成功');
  }
  // 检测文件是否存在接口
  async checkFile() {
    const { ctx, app, service } = this;
  }

}


module.exports = UtilController;

