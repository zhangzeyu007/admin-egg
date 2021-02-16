/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:21:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-16 12:09:54
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/user/captcha', controller.util.captcha);
  router.post('/user/adduser', controller.user.addAdminUser);
  router.post('/user/getuserlist', controller.user.getUserList);
  router.post('/user/deluser', controller.user.delUser);
  router.post('/user/updateuser', controller.user.updateUser);
  router.post('/user/login', controller.user.Login);
};
