/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-01 15:59:25
 * @FilePath: \admin-egg\front\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import ElementUI from "element-ui";
import "../src/static/style/reset.css";
import "./static/icons/iconfont.css";
import "./static/icons/index.js";
import api from "./api/api.js";
import "element-ui/lib/theme-chalk/index.css";
import "./permission";
import "./entry-client.js";

Vue.use(ElementUI);

Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
