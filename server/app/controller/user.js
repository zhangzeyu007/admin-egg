/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-07 11:38:58
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-10 09:55:58
 */
'use strict';
const BaseController = require('./base');

const addUserRule = {
  password: { required: true, type: 'string' },
  username: { required: true, type: 'string' },
  role: { required: true, type: 'string' },
};
const getUserListRule = {
  currentPage: {
    required: true, type: 'string',
  },
};

class UserController extends BaseController {
  async addAdminUser() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(addUserRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    const res = await service.user.addUser(payload);

    if (res.code === 1) {
      this.message('添加成功');
    } else if (res.code === 0) {
      this.error('用户已存在');
    } else {
      this.error('服务端错误');
    }
  }
  // 获取用户列表
  async getUserList() {
    const { ctx, app, service } = this;

    // 校验传递的参数
    const errors = app.validator.validate(getUserListRule, ctx.request.body);
    console.log(errors);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }

    // 组装参数
    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.user.getUserList(payload);
    this.success(response);
  }
}


module.exports = UserController;

