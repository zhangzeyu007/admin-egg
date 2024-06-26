/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-21 21:42:04
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-13 17:21:11
 */
"use strict";
const BaseController = require("./base");

const searchRule = {
  keyName: { required: true, type: "string" },
};
const sourseRule = {
  keyName: { required: true, type: "string" },
};

class VideoController extends BaseController {
  async getSearch() {
    const { ctx, app } = this;
    // 校验传递的参数
    const errors = app.validator.validate(searchRule, ctx.request.body);
    if (errors) {
      return this.error("参数校验失败", -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    const result = await ctx.curl(
      "https://movie.douban.com/j/subject_suggest?q=" + payload.keyName
    );
    ctx.status = result.status;
    ctx.set(result.headers);
    this.success(JSON.parse(result.data));
  }
  async getVideoSourse() {
    const { ctx, app } = this;
    // 校验传递的参数
    const errors = app.validator.validate(sourseRule, ctx.request.body);
    if (errors) {
      return this.error("参数校验失败", -1, errors);
    }

    // 组装参数
    // https://z1.m1907.cn/?jx=
    const payload = ctx.request.body || {};
    const key = "d48dca120c2cb81c11cfa6eca509066d";
    const s1ig = "11402";
    const result = await ctx.curl(
      "https://z1.m1907.cn/api/v/?z=" +
        key +
        "&jx=" +
        payload.keyName +
        "&s1ig=" +
        s1ig +
        "&g=www.hyx,youku.c,pingmu.,n1.szja,vod3.bu,cdn003.,mhcdn.m,vod.bun,www.369"
    );
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }
}

module.exports = VideoController;
