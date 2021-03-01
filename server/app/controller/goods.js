/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-21 11:27:14
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-01 17:05:29
 */
'use strict';
const BaseController = require('./base');

const addGoodsRule = {
  goodsId: { required: true, type: 'string' },
  name: { required: true, type: 'string' },
  price: { required: true, type: 'string' },
  discountPrice: { required: true, type: 'string' },
  desc: { required: true, type: 'string' },
  file: { required: true, type: 'object' },
};
const getGoodsListRule = {
  pageNum: { required: true, type: 'string' },
};
const delGoodsRule = {
  goodsid: { required: true, type: 'string' },
};
const updateGoodsRule = {

};

class GoodsController extends BaseController {
  // 添加商品
  async addGoods() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(addGoodsRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    const response = await service.goods.addGoods(payload);
    if (response.code === 1) {
      this.message('商品添加成功');
    } else if (response.code === 0) {
      this.error('商品已存在');
    } else if (response.code === -2) {
      this.warning('图片生成中...');
    } else if (response.code === -1) {
      this.error('服务端错误');
    }
  }
  // 获取商品列表数据接口
  async getGoodsList() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(getGoodsListRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};

    // 查询结果
    const response = await service.goods.getGoodsList(payload);
    this.success(response);
  }
  // 删除商品接口
  async delGoods() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(delGoodsRule, ctx.request.body);

    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }

    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.goods.delGoods(payload);
    this.success(response);
  }
  // 更新商品
  async updateGoods() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(updateGoodsRule, ctx.request.body);

    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }

    // 组装参数
    const payload = ctx.request.body || {};
    const response = await service.goods.updateGoods(payload);

  }

}

module.exports = GoodsController;
