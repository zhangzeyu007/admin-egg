/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-07 11:38:58
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-24 10:36:43
 */
'use strict';

const svgCaptcha = require('svg-captcha');
const fse = require('fs-extra');
const BaseController = require('./base');
const path = require('path');

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
    const { ctx } = this;

    const file = ctx.request.files[0];
    const { hash, name } = ctx.request.body;
    const chunkPath = path.resolve(this.config.UPLOAD_DIR, hash);

    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath);
    }

    await fse.move(file.filepath, `${chunkPath}/${name}`);

    this.message('切片上传成功');
  }
  // 检测文件是否存在接口
  async checkFile() {
    const { ctx, app, service } = this;
  }
  // 合并文件
  async mergeFile() {
    const { ctx } = this;
    const { ext, hash, size } = ctx.request.body;
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`);
    await ctx.service.tools.mergeFile(filePath, hash, size);
    this.success({
      url: `/public/${hash}.${ext}`,
    });
  }
}


module.exports = UtilController;

