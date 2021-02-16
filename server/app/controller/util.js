/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-07 11:38:58
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-16 16:18:00
 */
'use strict';

const svgCaptcha = require('svg-captcha');
const BaseController = require('./base');

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
}


module.exports = UtilController;

