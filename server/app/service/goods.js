/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-28 11:39:38
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-28 21:26:55
 */
'use strict';
const Service = require('egg').Service;
const fse = require('fs-extra');
const path = require('path');

class GoodsService extends Service {
  // 添加商品
  async addGoods(payLoad) {
    const { ctx } = this;
    const result = {
      code: '',
    };
    const hash = payLoad.file.hash;
    const ext = payLoad.file.ext;
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`);
    const fullPath = 'http://localhost:7001/public/';
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
  async getGoodsList(payLoad) {
    const { ctx } = this;

  }
}
module.exports = GoodsService;
