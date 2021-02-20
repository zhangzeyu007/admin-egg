/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:03:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-20 12:07:02
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
