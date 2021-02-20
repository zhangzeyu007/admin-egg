/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-19 10:59:43
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-20 09:33:01
 */

import api from '../api/api'
const state = {
    token: localStorage.getItem('token'),
    roles: [] // 角色信息
}

const mutations = {
    setRoles: (state, roles) => {
        state.roles = roles;
    },
    setToken: (state, token) => {
        state.token = token;
    },
}

const actions = {
    getInfo({ commit }, hasToken) {
        return api.user.getUserInfo(hasToken).then(({ data: roles }) => {
            commit("setRoles", roles);
            return { roles }
        })
    },
    resetToken({ commit }) {
        console.log('被调用');
        // 清空令牌和角色状态
        return new Promise(resolve => {
            commit("setToken", "");
            commit("setRoles", []);
            localStorage.removeItem('token');
            resolve();
        });
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}