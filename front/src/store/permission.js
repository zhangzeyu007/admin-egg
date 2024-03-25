/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-13 15:15:43
 * @FilePath: \admin-egg\front\src\store\permission.js
 */

import { asyncRoutes, constRoutes } from "@/router";

const state = {
  routes: [], // 完整路由
  addRoutes: [], // 用户可访问路由表
};

const mutations = {
  setRoutes: (state, routes) => {
    state.addRoutes = routes;
    constRoutes.forEach((item) => {
      if (item.name === "Home") {
        item.children = [];
        item.children = item.children.concat(routes);
      }
    });
    state.routes = constRoutes;
  },
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      // * 根据角色做过滤处理
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      commit("setRoutes", accessedRoutes);
      resolve(state.routes);
    });
  },
};

/**
 * * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表, 首次传入的就是AsyncRoutes
 * @roles 用户拥有角色
 */

export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    // 复制一份
    const tmp = { ...route };
    // 如果用户有访问权限加入结果路由表
    if (hasPermission(roles, tmp)) {
      // 如果用户存在子路由则递归
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
}

/**
 * 根据路由meta.role 确定是否当前用户拥有访问的权限
 * @roles 用户拥有角色
 * @route 待判定的路由
 */

function hasPermission(roles, route) {
  // 如果当前路由有roles 字段则需判断用户访问权限
  if (route.meta && route.meta.roles) {
    // 若用户拥有的角色有被包含在待判定路由角色表中的则拥有访问权限
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    // 没有设置roles 则无需判定即可访问
    return true;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
