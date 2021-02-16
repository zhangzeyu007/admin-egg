/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-11-11 17:27:26
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-16 18:12:26
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
  }, { timestamps: true });

  return mongoose.model('AdminUser', UserSchema);
};
