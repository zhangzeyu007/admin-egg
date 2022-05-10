/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-05 22:16:32
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-04-26 13:01:39
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
  // 删除商品接口
  async delEditor(payLoad) {
    const { ctx } = this;
    return await ctx.model.AdminEditor.findByIdAndDelete(payLoad.editorId);
  }
  // 更新文章
  async updateEditor(payLoad) {
    const { ctx } = this;
    const result = {
      code: 1,
    };
    const response = await ctx.model.AdminEditor.find({ editorId: payLoad.editorId }).updateOne({ ...payLoad });
    if (response) {
      result.code = 1;
    } else {
      result.code = -1;
    }
    return result;
  }
  // 获取文章列表数据
  async getEditorList(payLoad) {
    const { ctx } = this;
    const page = payLoad.pageNum; // 当前页数
    const num = payLoad.pageSize ? Number(payLoad.pageSize) : 10; // 每页最大显示条数
    const start = (page - 1) * num; // 开始位置
    const totalPage = (await ctx.model.AdminEditor.find()).length;
    const res = await ctx.model.AdminEditor.find().skip(start).limit(num)
      .exec();
    return { totalPage, page: res };
  }

  // 查询文章所有数据
  async searchEditor() {
    const { ctx } = this;
    return await ctx.model.AdminEditor.find();
  }
}


module.exports = EditorService;
