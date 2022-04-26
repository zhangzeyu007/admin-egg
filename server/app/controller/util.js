/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-07 11:38:58
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-28 11:57:54
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
  // 检测文件是否存在接口
  async checkFile() {
    const { ctx } = this;
    const { ext, hash } = ctx.request.body;
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`);
    let uploaded = false;
    let uploadedList = [];

    if (fse.existsSync(filePath)) {
      // 文件存在
      uploaded = true;
    } else {
      uploadedList = await this.getUploadedList(path.resolve(this.config.UPLOAD_DIR, hash));
    }
    this.success({
      uploaded,
      uploadedList,
    });
  }
  // 对上传文件夹进行过滤
  async getUploadedList(dirPath) {
    return fse.existsSync(dirPath)
      ? (await fse.readdir(dirPath)).filter(name => name[0] !== '.') : [];
  }

  // 上传接口
  async upload() {
    // 报错
    // if (Math.random() > 0.3) {
    //   return this.ctx.status = 500;
    // }
    const { ctx } = this;
    const file = ctx.request.files[0];
    const { hash, name } = ctx.request.body;
    const chunkPath = path.resolve(this.config.UPLOAD_DIR, hash);
    console.log('----上传切片');
    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath);
    }
    await fse.move(file.filepath, `${chunkPath}/${name}`);
    await this.getUploadedList(path.resolve(this.config.UPLOAD_DIR, hash));
    await this.message('切片上传成功');
  }

  // 合并文件
  async mergeFile() {
    const { ctx } = this;
    const { ext, size, hash } = ctx.request.body;
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`);
    console.log('----合并调用');
    await ctx.service.tools.mergeFile(filePath, hash, size);
    this.success({
      url: `/public/${hash}.${ext}`,
    });
  }

  // 发送邮件
  async sendEmail() {
    const { ctx } = this;
    const email = ctx.request.body.email;
    const code = Math.random().toString().slice(2, 8);
    ctx.session.emailcode = code;
    const subject = '泽雨后台系统验证码';
    const text = '泽雨科技';
    const html = `<h1>泽雨github社区</h1><h2>验证码:</h2><span>${code}</span> `;
    const hasSend = await ctx.service.tools.sendEmail(email, subject, text, html);

    if (hasSend) {
      this.message('发送成功');
    } else {
      this.error('发送失败');
    }
  }
}


module.exports = UtilController;

