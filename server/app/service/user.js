/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-02 18:04:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-10 17:47:16
 */
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 添加用户
  async addUser(payLoad) {
    const { ctx } = this;
    const result = {
      code: '',
    };
    payLoad.password = await ctx.genHash(payLoad.password);

    const isEmpty = await ctx.model.AdminUser.findOne({
      $or: [
        { username: payLoad.username },
        { password: payLoad.password },
      ],
    });
    if (isEmpty) {
      if (isEmpty.username === payLoad.username) {
        result.code = 0;
      } else {
        const isSave = await ctx.model.AdminUser.create(payLoad);
        if (isSave) {
          result.code = 1;
        } else {
          result.code = -1;
        }
      }
    } else {
      const isSave = await ctx.model.AdminUser.create(payLoad);
      if (isSave) {
        result.code = 1;
      } else {
        result.code = -1;
      }
    }
    return result;
  }
  // 获取用户列表
  async getUserList(payLoad) {
    console.log(payLoad);
    const { ctx } = this;
    const page = payLoad.pageNum; // 当前页数
    const num = payLoad.pageSize ? Number(payLoad.pageSize) : 10;
    const start = (page - 1) * num; // 开始位置
    const totalPage = (await ctx.model.AdminUser.find()).length;
    const res = await ctx.model.AdminUser.find().skip(start).limit(num)
      .exec();

    return { totalPage, page: res };

  }
  // 删除用户
  async delUser(payLoad) {
    console.log(payLoad);
  }
}

module.exports = UserService;
