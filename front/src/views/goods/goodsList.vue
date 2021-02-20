<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-06 09:46:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-20 18:08:52
-->

<template>
  <div class="goodsList">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addGoodsDialog = true"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <!-- table内容区 -->
      <el-table>
        <el-table-column></el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户弹窗 -->
    <el-dialog
      title="添加商品"
      :visible.sync="addGoodsDialog"
      width="35%"
      close-on-click-modal
    >
      <el-form
        ref="addFormRules"
        :model="addGoodsForm"
        label-width="100px"
        :rules="addGoodsRules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addGoodsForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input
            v-model="addGoodsForm.price"
            type="text"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="折扣价格" prop="discountPrice">
          <el-input
            v-model="addGoodsForm.discountPrice"
            type="text"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="addGoodsForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-upload
            ref="upload"
            action=""
            :on-remove="handleRemove"
            :auto-upload="false"
            :file-list="fileList"
            list-type="picture"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('add')"> 取消 </el-button>
        <el-button type="primary" @click="addGoodsComfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addGoodsForm: {
        name: "",
        price: "",
        discountPrice: "",
        desc: "",
      },
      addGoodsDialog: false,
      addGoodsRules: {},
    };
  },
  mounted() {},
  methods: {
    // 提交商品
    addGoodsComfirm() {},
    resetForm() {},
    handleRemove() {
      console.log("删除");
    },
  },
};
</script>

<style  scoped>
</style>