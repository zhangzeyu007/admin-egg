/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-05-10 22:11:44
 * @FilePath: \admin-egg\front\src\store\index.js
 */

import Vue from "vue";
import Vuex from "vuex";
import permission from './permission.js'
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {
    roles: state => state.user.roles,
    hasRoles: state => state.user.roles && state.user.roles.length > 0,
    permission_routes: state => state.permission.routes,
    addRoutes: state => state.permission.addRoutes,
    username: state => state.user.username
  },
  modules: {
    user,
    permission
  }
});
