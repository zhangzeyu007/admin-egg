/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-28 11:39:38
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-28 12:43:55
 */
'use strict';
const Service = require('egg').Service;

class GoodsService extends Service {
  async addGoods(payLoad) {
    console.log(payLoad);
    const { ctx } = this;
    const result = {
      code: '',
    };
    console.log(payLoad.file.name);

    const isEmpty = await ctx.model.goods.AdminGoods.findOne({
      name: payLoad.name,
    });

    if (isEmpty) {
      if (isEmpty.name === payLoad.name) {
        result.code = 0;
      } else {
        const isSave = await ctx.model.AdminGoods.create();
        if (isSave) {
          result.code = 1;
        } else {
          result.code = -1;
        }
      }
    } else {
      const isSave = await ctx.model.AdminGoods.create();
      if (isSave) {
        result.code = 1;
      } else {
        result.code = -1;
      }
    }
  }
}
module.exports = GoodsService;
