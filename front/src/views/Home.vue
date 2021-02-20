<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-04 10:03:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-20 09:29:43
-->
<template>
  <el-container>
    <!-- 头布局 -->
    <el-header>
      <div class="header">
        <div class="header-left">
          <img class="logo-icon" src="../assets/logo.jpg" alt="" />
          <div class="header-title">泽雨后台管理系统</div>
        </div>
        <div class="header-right">
          <el-button size="small" @click="goOut">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '65px' : '220px'">
        <div class="taggle-button" @click="toggleClick">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <el-menu
          :collapse="isCollapse"
          class="el-menu-verticalel-menu-vertical"
          :collapse-transition="false"
          :unique-opened="false"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          router
          :default-active="activePath"
          @select="handleSelect"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="subList.id"
            v-for="subList in menuList"
            :key="subList.id"
          >
            <template slot="title">
              <icon-font :icon-class="subList.icon"></icon-font>
              <span>{{ subList.authName }}</span>
            </template>
            <template v-if="subList.children">
              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/' + item.path"
                v-for="item in subList.children"
                :key="item.id"
                @click="saveNavStatus('/' + item.path)"
              >
                <icon-font :icon-class="item.icon"></icon-font>
                {{ item.authName }}
              </el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容显示区 -->
      <el-main>
        <nav-bar :breadcrumbs="breadcrumbs"></nav-bar>
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from "../components/navBar.vue";
export default {
  name: "Home",
  data() {
    return {
      activePath: "",
      isCollapse: false,
      breadcrumbs: [],
      menuList: [
        {
          id: "101",
          authName: "商品管理",
          path: "",
          icon: "kehuguanli",
          children: [
            {
              id: "102",
              authName: "商品列表",
              path: "goodslist",
              icon: "yiqifafang",
            },
            {
              id: "103",
              authName: "商品详情",
              path: "goodsdetail",
              icon: "gongyingshang",
            },
          ],
        },
        {
          id: "201",
          authName: "用户管理",
          path: "",
          icon: "gangweiguanli",
          children: [
            {
              id: "202",
              authName: "用户列表",
              path: "userlist",
              icon: "jixiaoguanli",
            },
            {
              id: "203",
              authName: "权限",
              path: "userrole",
              icon: "quanxianguanli",
            },
          ],
        },
        {
          id: "301",
          authName: "菜单管理",
          path: "",
          icon: "fenleiguanli",
          children: [
            {
              id: "302",
              authName: "菜单列表",
              path: "menulist",
              icon: "jixiaoguanli",
            },
          ],
        },
      ],
    };
  },

  components: {
    NavBar,
  },
  created() {
    let path = window.sessionStorage.getItem("activePath");
    let breadcrumbs = window.sessionStorage.getItem("breadcrumbsList");
    if (path) {
      this.activePath = path;
      this.$router.push(path);
    }
    if (breadcrumbs) {
      this.breadcrumbs = JSON.parse(breadcrumbs);
    }
  },
  methods: {
    goOut() {
      this.$store.dispatch("user/resetToken");
      this.$router.push("/login");
    },
    toggleClick() {
      this.isCollapse = this.isCollapse ? false : true;
    },
    saveNavStatus(path) {
      window.sessionStorage.setItem("activePath", path);
    },
    navToolName(menuList, id) {
      for (let item of menuList) {
        if (item.id === id) {
          return item.authName;
        }
        if (item.children) {
          this.navToolName(item.children, id);
        }
      }
    },
    navToolNamePath(menuList, path) {
      let newArr = [];
      let name = "";
      for (let item of menuList) {
        if (item.children) {
          item.children.map((it) => {
            newArr.push(it);
          });
        }
      }
      newArr.forEach((item) => {
        if (item.path == path) {
          name = item.authName;
        }
      });
      return name;
    },
    handleSelect(path, indexPath) {
      let parentName = this.navToolName(this.menuList, indexPath[0]);
      let subName = this.navToolNamePath(this.menuList, path.split("/")[1]);
      this.breadcrumbs = [
        { name: parentName, path: "" },
        { name: subName, path: path },
      ];
      window.sessionStorage.setItem(
        "breadcrumbsList",
        JSON.stringify(this.breadcrumbs)
      );
    },
  },
};
</script>

<style lang="less">
.el-header,
.el-footer {
  background-color: #373d41;
  color: #fff;
}
.el-container {
  height: 100%;
}
.el-aside {
  width: 180px;
  background-color: #373d41;
  // background-color: #eaedf1;
  color: #fff;
  text-align: left;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 5px;
  box-sizing: border-box;
  .header-left {
    display: flex;
    align-items: center;
    .logo-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .header-title {
      margin-left: 15px;
      font-size: 20px;
    }
  }
}
.el-menu {
  border-right: 0;
}
.el-main {
  background-color: #eaedf1;
  color: #333;
}
.taggle-button {
  font-size: 18px;
  background-color: #373d41;
  text-align: center;
  line-height: 30px;
}
</style>