/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-28 11:39:38
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-26 13:02:07
 */
"use strict";
const Service = require("egg").Service;
const fullPath = "http://localhost:7001/public/";
// const fse = require('fs-extra');
// const path = require('path');

class GoodsService extends Service {
  // 添加商品
  async addGoods(payLoad) {
    const { ctx } = this;
    const result = {
      code: "",
    };
    const hash = payLoad.file.hash;
    const ext = payLoad.file.ext;
    // const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`);
    // if (!fse.existsSync(filePath)) {
    //   result.code = -2;
    // }
    const isEmpty = await ctx.model.AdminGoods.findOne({
      goodsId: payLoad.goodsId,
    });
    if (isEmpty) {
      if (isEmpty.goodsId === payLoad.goodsId) {
        result.code = 0;
      } else {
        const isSave = await ctx.model.AdminGoods.create({
          ...payLoad,
          url: fullPath + `${hash}.${ext}`,
        });
        if (isSave) {
          result.code = 1;
        } else {
          result.code = -1;
        }
      }
    } else {
      const isSave = await ctx.model.AdminGoods.create({
        ...payLoad,
        url: fullPath + `${hash}.${ext}`,
      });
      if (isSave) {
        result.code = 1;
      } else {
        result.code = -1;
      }
    }

    return result;
  }
  // 获取商品数据接口
  async getGoodsList(payLoad) {
    const { ctx } = this;
    const page = payLoad.pageNum; // 当前页数
    const num = payLoad.pageSize ? Number(payLoad.pageSize) : 10; // 每页最大显示条数
    const start = (page - 1) * num; // 开始位置
    const totalPage = (await ctx.model.AdminGoods.find()).length;
    const res = await ctx.model.AdminGoods.find().skip(start).limit(num).exec();
    return { totalPage, page: res };
  }
  // 删除商品接口
  async delGoods(payLoad) {
    const { ctx } = this;
    // const filePath = path.resolve(this.config.UPLOAD_DIR, payLoad.fileName);
    // const hash = payLoad.fileName.split('.')[0];
    // const hashPath = path.resolve(this.config.UPLOAD_DIR, hash);
    // if (fse.existsSync(filePath)) {
    //   fse.unlink(filePath, err => {
    //     if (err) throw err;
    //     console.log('文件已被删除');
    //   });
    // }
    // if (fse.existsSync(hashPath)) {
    //   fse.rmdir(hashPath, err => {
    //     if (err) throw err;
    //     console.log('删除文件夹成功');
    //   });
    // }
    return await ctx.model.AdminGoods.findByIdAndDelete(payLoad.goodsid);
  }

  // 更新商品
  async updateGoods(payLoad) {
    const { ctx } = this;
    const result = {
      code: 1,
    };
    console.log(payLoad.name);
    const response = await ctx.model.AdminGoods.find({
      goodsId: payLoad.goodsId,
    }).updateOne({
      name: payLoad.name,
      price: payLoad.price,
      discountPrice: payLoad.discountPrice,
      desc: payLoad.desc,
    });
    if (response) {
      // const url = payLoad.url;
      // const fileName = url.split('public/')[1];
      // const filePath = path.resolve(this.config.UPLOAD_DIR, fileName);
      // const hash = fileName.split('.')[0];
      // const hashPath = path.resolve(this.config.UPLOAD_DIR, hash);
      if (
        payLoad.file &&
        payLoad.file.name &&
        payLoad.file.ext &&
        payLoad.file.hash
      ) {
        const res = await ctx.model.AdminGoods.find({
          goodsId: payLoad.goodsId,
        }).updateOne({
          url: fullPath + `${payLoad.file.hash}.${payLoad.file.ext}`,
        });
        if (res) {
          // if (fse.existsSync(filePath)) {
          //   fse.unlink(filePath, err => {
          //     if (err) throw err;
          //     console.log('文件已被删除');
          //   });
          // }
          // if (fse.existsSync(hashPath)) {
          //   fse.rmdir(hashPath, err => {
          //     if (err) throw err;
          //     console.log('删除文件夹成功');
          //   });
          // }
        } else {
          result.code = -1;
        }
      }
    } else {
      result.code = -1;
    }
    return result;
  }
  // 查询商品数据接口
  async searchGoods() {
    const { ctx } = this;
    return await ctx.model.AdminGoods.find();
  }
}
module.exports = GoodsService;
