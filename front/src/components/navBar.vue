<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-06 10:54:57
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-21 15:35:43
-->
<template>
  <div class="navBar">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :to="{ path: item.path ? item.path : '/' }"
        :key="index"
        :replace="true"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbs: {},
  },
};
</script>
<style  scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>