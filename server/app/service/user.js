/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-02 18:04:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-16 22:14:18
 */
'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const HashSalt = ':zhangzeyu@good!@123';

class UserService extends Service {
  async Login(payLoad) {
    const { ctx } = this;
    const result = {
      code: '',
    };
    const hash = md5(payLoad.password + HashSalt);
    const isEmpty = await ctx.model.AdminUser.findOne({
      username: payLoad.username,
    });
    console.log(isEmpty);
    if (isEmpty) {
      console.log(isEmpty.password);
      console.log(hash);
      if (isEmpty.password === hash) {
        result.code = 1;
      } else {
        result.code = -1;
      }
    } else {
      result.code = 0;
    }
    return result;
  }

  // 添加用户
  async addUser(payLoad) {
    const { ctx } = this;
    const result = {
      code: '',
    };
    payLoad.password = md5(payLoad.password + HashSalt);
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
    const { ctx } = this;
    return await ctx.model.AdminUser.findByIdAndDelete(payLoad.userid);

  }
  // 更新用户接口
  async updateUser(payLoad) {
    const { ctx } = this;
    let result = { ok: '' };
    const oldhash = md5(payLoad.oldpassword + HashSalt);
    const newhash = md5(payLoad.newpassword + HashSalt);
    const res = await ctx.model.AdminUser.findById(payLoad.userid);
    if (res.password === oldhash) {
      console.log('哈哈 ');
      result = await ctx.model.AdminUser.findById(payLoad.userid).update({ role: payLoad.role, password: newhash });
    } else {
      result = { ok: -1 };
    }
    return result;
  }

  // 查询接口
  async searchUser(payLoad) {
    const { ctx } = this;
    return await ctx.model.AdminUser.find({ username: payLoad.username });
  }

}

module.exports = UserService;
