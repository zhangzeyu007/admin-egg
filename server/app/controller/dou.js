"use strict";
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const BaseController = require("./base");
const puppeteer = require("puppeteer");

const sourseRule = {
  url: { required: true, type: "string" },
};

class VideoController extends BaseController {
  async getvideourl() {
    const { ctx, app } = this;
    // 校验传递的参数
    const errors = app.validator.validate(sourseRule, ctx.request.body);
    if (errors) {
      return this.error("参数校验失败", -1, errors);
    }
    // 组装参数
    const { url } = ctx.request.body;
    console.log(url, "地址");
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(60000);
      console.log("开启爬虫");
      await page.goto(url);
      console.log("开始解析");
      // 获取页面 HTML 结构
      const videoPlayerSelector = ".xg-video-container"; // 根据实际情况修改选择器
      await page.waitForSelector(videoPlayerSelector);
      const html = await page.content();
      console.log("html获取成功");
      // 将 HTML 写入文本文件
      // const filePath = path.join(__dirname, "page.html");
      // fs.writeFileSync(filePath, html);
      // 获取所有 <source> 标签的 src 属性值
      const sourceSrcPattern = /<source\s+(?:class="[^"]*")?\s+src="([^"]+)"/g;
      const srcMatches = html.matchAll(sourceSrcPattern);
      const srcValues = [...srcMatches].map((match) => match[1]);
      console.log(srcValues, "srcValues");
      const videoSrcPattern = /^\/\/www\.douyin\.com\/aweme\/v1\/play\/\?/;
      const videoSrcs = srcValues.filter((src) => videoSrcPattern.test(src));
      // 筛选出符合格式的视频地址
      console.log("视频地址:", videoSrcs[0]);
      await browser.close();
    } catch (error) {
      console.log("----" + error + "-----");
      ctx.status = 500;
      ctx.body = "下载视频失败";
    }
    ctx.status = 200;
    ctx.body = videoSrcs[0];
  }
}
module.exports = VideoController;
