/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-05 22:16:32
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-05 22:26:53
 */
'use strict';
const Service = require('egg').Service;

class EditorService extends Service {
  // 添加文章
  async addEditor(payLoad) {
    const { ctx } = this;
    const result = {
      code: '',
    };
    const isEmpty = await ctx.model.AdminEditor.findOne({
      editorId: payLoad.editorId,
    });
    if (isEmpty) {
      if (isEmpty.editorId === payLoad.editorId) {
        result.code = 0;
      } else {
        const isSave = await ctx.model.AdminEditor.create({ ...payLoad });
        if (isSave) {
          result.code = 1;
        } else {
          result.code = -1;
        }
      }
    } else {
      const isSave = await ctx.model.AdminEditor.create({ ...payLoad });
      if (isSave) {
        result.code = 1;
      } else {
        result.code = -1;
      }
    }

    return result;

  }
}


module.exports = EditorService;
