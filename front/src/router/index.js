/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:03:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-30 09:51:08
 */

import Vue from "vue";
import VueRouter from "vue-router";
import menuRouteList from './menu/menuRoutes.js'
import goodsRouteList from './goods/goodsRoutes.js'
import userRouteList from './user/userRoutes.js'
import editorRouteList from './editor/editorRoutes.js'
import visualRouteList from './screen/screenRoutes.js'
import videoRouteList from './video/videoRoutes.js'


Vue.use(VueRouter);


// 2.声明一个路由表
// 通用页面: 不需要守卫, 可以直接访问
export const constRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login")
    // hidden: true // 导航菜单忽略该项
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册用户" // 导航菜单项标题
    },
    component: () => import("@/views/Register")
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "Home" // 导航菜单项标题
    },
    component: () => import("@/views/Home"),
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import("@/views/404.vue"),
      }
    ]
  }
];


// 权限页面: 受保护的页面, 要求用户登录并拥有访问权限的角色才能访问
export const asyncRoutes = [
  ...goodsRouteList.routes,
  ...menuRouteList.routes,
  ...userRouteList.routes,
  ...editorRouteList.routes,
  ...visualRouteList.routes,
  ...videoRouteList.routes
];


export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/login'
  },
  ...constRoutes
  ]
});


// 路由重复报错处理方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

