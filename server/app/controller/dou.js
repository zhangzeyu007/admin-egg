"use strict";

const axios = require("axios");
const cheerio = require("cheerio");
const BaseController = require("./base");

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

    const response = await axios.get(url, {
      maxRedirects: 0,
    });

    // if (response.status === 301 || response.status === 302) {
    //   const redirectUrl = response.headers.location;
    //   // 发送新的请求到重定向后的 URL
    //   const redirectResponse = await axios.get(redirectUrl);
    //   // 处理重定向响应
    //   const html = redirectResponse.data;
    //   // ... 继续解析 HTML 获取视频信息
    //   console.log(html, "结果");
    //   extractVideoInfo(html);
    //   console.log("哈哈哈哈哈哈");
    // }

    function extractVideoInfo(html) {
      const $ = cheerio.load(html);
      const scriptTag = $('script[id="__NEXT_DATA__"]');
      const jsonData = scriptTag.html();
      const data = JSON.parse(jsonData).props.pageProps;
      const videoInfo = {
        caption: data.videoData.itemInfos.text,
        videoUrl: data.videoData.itemInfos.video.urls[0],
        // ... 提取其他视频信息
      };
      return videoInfo;
    }

    // try {
    // } catch (error) {
    //   // console.log("----" + error + "-----");
    //   ctx.status = 500;
    //   ctx.body = "下载视频失败";
    // }

    // ctx.status = result.status;
    // ctx.set(result.headers);
    // ctx.body = response;
  }
}
module.exports = VideoController;
