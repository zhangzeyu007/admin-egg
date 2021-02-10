/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:21:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-08 19:28:54
 */
'use strict';

/** @type Egg.EggPlugin */

// module.exports = {
//   mongoose: { enable: true, package: 'egg-mongoose' },
//   cors: { enable: true, package: 'egg-cors' },
//   bcrypt: { enable: true, package: 'egg-bcrypt' },
// };

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt',
};

