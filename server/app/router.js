/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:21:47
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-22 16:01:29
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });
  // 用户
  router.post('/user/login', controller.user.Login);
  router.post('/user/registeruser', controller.user.registerUser);
  router.post('/user/adduser', jwt, controller.user.addAdminUser);
  router.post('/user/getuserlist', jwt, controller.user.getUserList);
  router.post('/user/deluser', jwt, controller.user.delUser);
  router.post('/user/updateuser', jwt, controller.user.updateUser);
  router.get('/user/searchuser', jwt, controller.user.searchUser);
  router.post('/user/userinfo', jwt, controller.user.userInfo);

  // 工具
  router.get('/user/captcha', controller.util.captcha);
  router.post('/util/upload', controller.util.upload);
  router.post('/util/checkfile', controller.util.checkFile);
  router.post('/util/mergefile', controller.util.mergeFile);
  router.post('/util/sendemail', controller.util.sendEmail);
  // 商品
  router.post('/goods/addgoods', jwt, controller.goods.addGoods);
  router.post('/goods/getgoodslist', jwt, controller.goods.getGoodsList);
  router.post('/goods/delgoods', jwt, controller.goods.delGoods);
  router.post('/goods/updategoods', jwt, controller.goods.updateGoods);
  router.post('/goods/searchgoods', jwt, controller.goods.searchGoods);
  // 文章
  router.post('/editor/addeditor', jwt, controller.editor.addEditor);
  router.post('/editor/geteditorlist', jwt, controller.editor.getEditorList);
  router.post('/editor/deleditor', jwt, controller.editor.delEditor);
  router.post('/editor/updateeditor', jwt, controller.editor.updateEditor);
  router.post('/editor/searcheditor', jwt, controller.editor.searchEditor);
  // 视频网站
  router.post('/video/search', jwt, controller.video.getSearch);
  router.post('/video/getvideosourse', jwt, controller.video.getVideoSourse);
};
