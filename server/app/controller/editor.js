/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-05 21:05:52
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-05 22:15:25
 */
'use strict';
const BaseController = require('./base');
const addEditorRule = {};

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

  }
}

module.exports = EditorController;
