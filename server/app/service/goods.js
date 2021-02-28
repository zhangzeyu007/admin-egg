/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-28 11:39:38
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-28 15:43:36
 */
'use strict';
const Service = require('egg').Service;
const fse = require('fs-extra');
const path = require('path');

class GoodsService extends Service {
  async addGoods(payLoad) {
    console.log(payLoad);
    const { ctx } = this;
    const result = {
      code: '',
    };
    const hash = payLoad.file.hash;
    const ext = payLoad.file.ext;
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`);
    const fullPath = 'http://localhost:7001/public/';
    console.log(filePath);
    if (!fse.existsSync(filePath)) {
      result.code = -2;
    } else {
      const isEmpty = await ctx.model.AdminGoods.findOne({
        name: payLoad.name,
      });
      if (isEmpty) {
        if (isEmpty.name === payLoad.name) {
          result.code = 0;
        } else {
          const isSave = await ctx.model.AdminGoods.create({ ...payLoad, url: fullPath + `${hash}.${ext}` });
          if (isSave) {
            result.code = 1;
          } else {
            result.code = -1;
          }
        }
      } else {
        const isSave = await ctx.model.AdminGoods.create({ ...payLoad, url: fullPath + `${hash}.${ext}` });
        if (isSave) {
          result.code = 1;
        } else {
          result.code = -1;
        }
      }
    }
    return result;
  }
}
module.exports = GoodsService;
