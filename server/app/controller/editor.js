/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-05 21:05:52
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-23 16:36:01
 */
"use strict";
const BaseController = require("./base");
const addEditorRule = {};
const getEditorListRule = {};
const delEditorRule = {};
const updateEditorRule = {};

class EditorController extends BaseController {
  async addEditor() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(addEditorRule, ctx.request.body);
    if (errors) {
      return this.error("参数校验失败", -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    const response = await service.editor.addEditor(payload);
    switch (response.code) {
      case 0:
        this.warning("文章编号重复");
        break;
      case 1:
        this.success("文章添加成功");
        break;
      default:
        this.error("系统错误");
        break;
    }
  }
  // 获取文章列表数据
  async getEditorList() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(getEditorListRule, ctx.request.body);

    if (errors) {
      return this.error("参数校验失败", -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.editor.getEditorList(payload);
    this.httpCache(response);
  }
  // 删除商品接口
  async delEditor() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(delEditorRule, ctx.request.body);
    if (errors) {
      return this.error("参数校验失败", -1, errors);
    }
    const payload = ctx.request.body || {};
    // 查询结果
    const response = await service.editor.delEditor(payload);
    this.success(response);
  }
  // 更新商品
  async updateEditor() {
    const { ctx, app, service } = this;
    // 校验传递的参数
    const errors = app.validator.validate(updateEditorRule, ctx.request.body);
    if (errors) {
      return this.error("参数校验失败", -1, errors);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    const response = await service.editor.updateEditor(payload);
    if (response.code === 1) {
      this.message("更新成功");
    } else {
      this.error("更新失败");
    }
  }

  async searchEditor() {
    const { service } = this;
    const response = await service.editor.searchEditor();
    this.success(response);
  }
}

module.exports = EditorController;
