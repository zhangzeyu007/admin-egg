import api from "../api/api";
const state = {
  token: localStorage.getItem("token"),
  roles: [], // 角色信息
  username: "", // 用户名
};

const mutations = {
  setRoles: (state, roles) => {
    state.roles = roles;
  },
  setToken: (state, token) => {
    state.token = token;
  },
  setUserName: (state, username) => {
    state.username = username;
  },
};

const actions = {
  getInfo({ commit }, hasToken) {
    return api.user.getUserInfo(hasToken).then(({ data }) => {
      let roles = data.roles;
      let username = data.username;
      commit("setRoles", roles);
      commit("setUserName", username);
      return { roles };
    });
  },
  resetToken({ commit }) {
    console.log("被调用");
    // 清空令牌和角色状态
    return new Promise((resolve) => {
      commit("setToken", "");
      commit("setRoles", []);
      localStorage.removeItem("token");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
