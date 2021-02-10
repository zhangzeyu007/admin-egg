/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-02 18:04:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-10 12:31:07
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
    const { ctx } = this;
    const page = payLoad.currentPage; // 当前页数
    const num = 10; // 每页显示数量
    const start = (page - 1) * num; // 开始位置
    const res = await ctx.model.AdminUser.find().skip(start).limit(num)
      .exec();
    const totalPage = res.length;

    return { totalPage, page: res };

  }
}

module.exports = UserService;
