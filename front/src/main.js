/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:03:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-20 16:33:17
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import { Button, Col, Input, Form, FormItem, Select, Option, Container, Aside, Header, Main, Footer, Submenu, Menu, MenuItem, RadioButton, RadioGroup, Breadcrumb, BreadcrumbItem, Checkbox, Card, Table, TableColumn, Row, Dialog, Pagination, Popover, Avatar, Dropdown, DropdownMenu, DropdownItem, Upload } from 'element-ui';
import '../src/static/style/reset.css'
import './static/icons/iconfont.css'
import './static/icons/index.js'
import api from './api/api.js'
import './permission'
Vue.use(Button).use(Col).use(Input).use(Form).use(FormItem).use(Select).use(Option).use(Container).use(Aside).use(Header).use(Main).use(Footer).use(Submenu).use(Menu).use(MenuItem).use(RadioButton).use(RadioGroup).use(Breadcrumb).use(BreadcrumbItem).use(Checkbox).use(Card).use(Table).use(TableColumn).use(Row).use(Dialog).use(Pagination).use(Popover).use(Avatar).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(Upload)

Vue.prototype.$api = api
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
