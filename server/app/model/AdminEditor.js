/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-05 21:26:35
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-05 22:27:03
 */
'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    editorId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    compiledContent: { type: String, required: true },
    likenum: { type: String },
  },
  { timestamps: true });

  return mongoose.model('AdminEidtor', UserSchema);
};
