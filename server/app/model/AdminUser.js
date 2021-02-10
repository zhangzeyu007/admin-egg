/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-11-11 17:27:26
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-10 17:43:34
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: Number, required: true },
  }, { timestamps: true });

  return mongoose.model('AdminUser', UserSchema);
};
