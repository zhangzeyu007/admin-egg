/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-07 18:25:58
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-23 17:59:10
 */
"use strict";
const { Controller } = require("egg");

class BaseController extends Controller {
  success(data) {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      message: "请求成功",
      data,
    };
  }
  httpCache(data) {
    const { ctx } = this;
    const isNotModified = () => {
      const unmodifiedSince = ctx.helper.getUTCDateString(
        ctx,
        "if-modified-since"
      );
      // 检查 If-Modified-Since 和 Last-Modified 是否匹配
      const modifiedSince = ctx.helper.getUTCDateValue(ctx, "last-modified");
      const modifiedAt = modifiedSince && modifiedSince.getTime();
      const unmodifiedSinceDate = unmodifiedSince
        ? new Date(unmodifiedSince)
        : null;
      console.log(unmodifiedSince, "unmodifiedSince");
      console.log(modifiedSince, "modifiedSince");
      console.log(modifiedAt, "modifiedAt");
      console.log(unmodifiedSinceDate, "unmodifiedSinceDate");
      const isNotModifiedSince =
        unmodifiedSinceDate &&
        modifiedAt &&
        modifiedAt <= unmodifiedSinceDate.getTime();
      console.log(isNotModifiedSince, "isNotModifiedSince");
      return isNotModifiedSince;
    };
    // 检查是否需要返回 304 Not Modified
    if (isNotModified()) {
      ctx.status = 304;
      return;
    }
    // 设置 Last-Modified 头
    const lastModified = ctx.helper.getLastModified(data);
    console.log(lastModified, "lastModified");
    ctx.set("Last-Modified", lastModified);
    // 设置 Cache-Control 头
    ctx.set("Cache-Control", "max-age=3600");
    ctx.body = {
      code: 200,
      message: "请求成功",
      data,
    };
  }
  message(message) {
    this.ctx.body = {
      code: 200,
      message,
    };
  }
  warning(message, code = -2) {
    this.ctx.body = {
      code,
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

module.exports = BaseController;
