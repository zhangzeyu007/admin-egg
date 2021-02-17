/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-12-15 16:50:19
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-17 17:57:42
 */

import router from "./router";

const whiteList = ["/login", "/register"]; // 无需令牌白名单

router.beforeEach(async (to, from, next) => {
  // 获取令牌判断用户是否是登录
  const hasToken = localStorage.getItem("token");
  // 已登入
  if (hasToken) {
    if (to.path === "/login") {
      // 若已登录没有必要显示登录页, 重定向至首页
      next("/home");
    } else {
      next()
    }
    //   未登录
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单中路由放过
      next();
    } else {
      // 重定向至登录登录页
      next(`/login?redirect=${to.path}`);
    }
  }
});
