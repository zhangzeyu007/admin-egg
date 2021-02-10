/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:21:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-07 11:47:53
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
