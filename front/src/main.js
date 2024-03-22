/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-22 14:01:28
 * @FilePath: \admin-egg\front\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import {
  Button,
  Col,
  Input,
  Form,
  FormItem,
  Select,
  Option,
  Container,
  Aside,
  Header,
  Main,
  Footer,
  Submenu,
  Menu,
  MenuItem,
  RadioButton,
  RadioGroup,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  Card,
  Table,
  TableColumn,
  Row,
  Dialog,
  Pagination,
  Popover,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Progress,
  Collapse,
  CollapseItem,
  Radio,
} from "element-ui";
import "../src/static/style/reset.css";
import "./static/icons/iconfont.css";
import "./static/icons/index.js";
import api from "./api/api.js";
import "element-ui/lib/theme-chalk/index.css";
import "./permission";
Vue.use(Button)
  .use(Col)
  .use(Input)
  .use(Form)
  .use(FormItem)
  .use(Select)
  .use(Option)
  .use(Container)
  .use(Aside)
  .use(Header)
  .use(Main)
  .use(Footer)
  .use(Submenu)
  .use(Menu)
  .use(MenuItem)
  .use(RadioButton)
  .use(RadioGroup)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Checkbox)
  .use(Card)
  .use(Table)
  .use(TableColumn)
  .use(Row)
  .use(Dialog)
  .use(Pagination)
  .use(Popover)
  .use(Avatar)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Progress)
  .use(Collapse)
  .use(CollapseItem)
  .use(Radio);

Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
