/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-21 21:42:04
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-07 09:45:32
 */
'use strict';
const BaseController = require('./base');

const searchRule = {
  keyName: { required: true, type: 'string' },
};
const sourseRule = {
  keyName: { required: true, type: 'string' },
};

class VideoController extends BaseController {
  async getSearch() {
    const { ctx, app } = this;
    // 校验传递的参数
    const errors = app.validator.validate(searchRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    const result = await ctx.curl('https://movie.douban.com/j/subject_suggest?q=' + payload.keyName);
    ctx.status = result.status;
    ctx.set(result.headers);
    this.success(JSON.parse(result.data));
  }
  async getVideoSourse() {
    const { ctx, app } = this;
    // 校验传递的参数
    const errors = app.validator.validate(sourseRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    // https://z1.m1907.cn/?jx=
    const payload = ctx.request.body || {};
    const key = '15a40fd4c6c6019f8f3dba73ff9242f8';
    const s1ig = '11403';
    const result = await ctx.curl('https://z1.m1907.cn/api/v/?z=' + key + '&jx=' + payload.keyName + '&s1ig=' + s1ig + '&g=www.hyx,youku.c,pingmu.,n1.szja,vod3.bu,cdn003.,mhcdn.m,vod.bun,www.369');
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }
}
module.exports = VideoController;
