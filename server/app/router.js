/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:21:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-17 21:52:18
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });

  router.post('/user/login', controller.user.Login);
  router.get('/user/captcha', controller.util.captcha);
  router.post('/user/adduser', jwt, controller.user.addAdminUser);
  router.post('/user/getuserlist', jwt, controller.user.getUserList);
  router.post('/user/deluser', jwt, controller.user.delUser);
  router.post('/user/updateuser', jwt, controller.user.updateUser);
  router.get('/user/searchuser', jwt, controller.user.searchUser);
};
