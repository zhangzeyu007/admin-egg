/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-07 11:38:58
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-12 13:06:00
 */
'use strict';
const BaseController = require('./base');

// 参数校验规则
const addUserRule = {
  password: { required: true, type: 'string' },
  username: { required: true, type: 'string' },
  role: { required: true, type: 'string' },
};

const getUserListRule = {
  pageNum: {
    required: true, type: 'string',
  },
};
const delUserRule = {
  userid: {
    required: true, type: 'string',
  },
};
const updateUserRule = {
  userid: {
    required: true, type: 'string',
  },
  password: { required: true, type: 'string' },
  username: { required: true, type: 'string' },
  role: { required: true, type: 'string' },
};

class UserController extends BaseController {
  async Login() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(addUserRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    const res = await service.user.Login(payload);


  }
  // 添加用户
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

    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }

    // 组装参数
    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.user.getUserList(payload);
    this.success(response);
  }
  // 删除用户
  async delUser() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(delUserRule, ctx.request.body);

    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }

    // 组装参数
    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.user.delUser(payload);
    this.success(response);

  }
  // 更新用户接口
  async updateUser() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(updateUserRule, ctx.request.body);

    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }

    // 组装参数
    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.user.updateUser(payload);
    if (response.ok === 1) {
      this.message('修改成功');
    } else {
      this.fail(response);
    }
  }
  // 查询接口
  async searchUser() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(updateUserRule, ctx.request.body);

    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.user.searchUser(payload);
    this.success(response);

  }
}


module.exports = UserController;

