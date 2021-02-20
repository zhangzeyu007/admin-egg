<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-06 09:46:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-20 12:43:27
-->

<template>
  <div class="goodsList">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="form.search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- table内容区 -->
      <el-table>
        <el-table-column></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        search: "",
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
</style>