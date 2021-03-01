/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-28 11:47:28
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-01 12:42:04
 */

'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    goodsId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    desc: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true });

  return mongoose.model('AdminGoods', UserSchema);
};
