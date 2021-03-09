/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-05 21:05:52
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-08 17:55:57
 */
'use strict';
const BaseController = require('./base');
const addEditorRule = {};
const getEditorListRule = {};

class EditorController extends BaseController {
  async addEditor() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(addEditorRule, ctx.request.body);
    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    const response = await service.editor.addEditor(payload);
    switch (response.code) {
      case 0:
        this.warning('文章编号重复');
        break;
      case 1:
        this.success('文章添加成功');
        break;
      default:
        this.error('系统错误');
        break;
    }
  }
  // 获取文章列表数据
  async getEditorList() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(getEditorListRule, ctx.request.body);

    if (errors) {
      return this.error('参数校验失败', -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.user.getEditorList(payload);
    this.success(response);

  }
}

module.exports = EditorController;
