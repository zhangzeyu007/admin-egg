/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-21 11:27:14
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-28 11:45:16
 */
'use strict';
const BaseController = require('./base');

const addGoodsRule = {
  name: { required: true, type: 'string' },
  price: { required: true, type: 'string' },
  discountPrice: { required: true, type: 'string' },
  desc: { required: true, type: 'string' },
  file: { required: true, type: 'object' },
};

class GoodsController extends BaseController {
  async addGoods() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(addGoodsRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    console.log(payload);
    await service.goods.addGoods(payload);
    await this.message('请求成功');
  }

}


module.exports = GoodsController;
