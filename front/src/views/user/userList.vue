<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-06 10:16:53
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-10 12:39:15
-->
<template>
  <div class="userList">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialog = true"
            >添加用户
          </el-button>
        </el-col>
      </el-row>
      <!-- table内容区 -->
      <el-table :data="tableData" style="margin-top: 20px" border size="medium">
        <el-table-column
          label="用户名"
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column
          label="角色"
          prop="roleName"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          style="width: 100%"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.totalPage"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialog"
      width="35%"
      close-on-click-modal
    >
      <el-form
        ref="addFormRules"
        :model="addForm"
        label-width="100px"
        :rules="addUserRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="addForm.username"
            prefix-icon="el-icon-user-solid"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addForm.password"
            type="password"
            prefix-icon="el-icon-unlock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="addForm.role" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false"> 取 消 </el-button>
        <el-button type="primary" @click="addUserComfirm">确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      search: "",
      addForm: {
        username: "",
        password: "",
        role: "",
      },
      addUserRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change",
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20个字符",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
        ],
        role: [
          {
            required: true,
            message: "请选择用户身份",
            trigger: "change",
          },
        ],
      },
      roleOptions: [
        { name: "管理员", value: "0" },
        { name: "员工", value: "1" },
        { name: "客服", value: "2" },
      ],
      addUserDialog: false,
      pages: {
        totalPage: 10,
        pageSize: 10,
        currentPage: 1,
      },
      tableData: [],
    };
  },
  created() {
    this.getUserListData();
  },
  methods: {
    handleSizeChange(val) {
      this.pages.pageSize = val;
      this.getUserListData();
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val;
      this.getUserListData();
    },
    handleEdit() {},
    handleDelete() {},
    addUserComfirm() {
      this.$refs.addFormRules.validate((valid) => {
        if (valid) {
          this.$api.user
            .addUser(this.addForm)
            .then((res) => {
              if (res.code == 200) {
                Message({
                  message: res.message,
                  type: "success",
                });
                this.resetForm();
                this.getUserListData();
              }
              if (res.code == -1) {
                Message({
                  message: res.message,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    // 重置form表单
    resetForm() {
      this.addUserDialog = false;
      this.addForm.username = "";
      this.addForm.password = "";
      this.addForm.role = "";
      this.$refs["addFormRules"].resetFields();
    },
    getUserListData() {
      this.$api.user
        .getUserList(this.pages)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            if (res.data.totalPage) {
              this.pages.totalPage = res.data.totalPage;
            }
            if (res.data.page) {
              let data = res.data.page;
              data.map((item) => {
                if (item.role == 0) {
                  item.roleName = "管理员";
                }
                if (item.role == 1) {
                  item.roleName = "员工";
                }
                if (item.role == 2) {
                  item.roleName = "客服";
                }
              });
              console.log(data);
              this.tableData = data;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style  scoped>
.pagination {
  width: 100%;
  margin-top: 15px;
}
.el-pagination {
  text-align: right;
}
</style>