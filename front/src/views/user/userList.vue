<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-02-06 10:16:53
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-24 13:38:42
-->
<template>
  <div class="userList">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form>
            <el-form-item label="查询" label-width="80px">
              <el-input placeholder="请输用户名" v-model="search"> </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialog = true"
            >添加用户
          </el-button>
        </el-col>
      </el-row>
      <!-- table内容区 -->
      <!-- <div class="virtual-table__header">
        <table>
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                :style="{ width: column.width + 'px' }"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
        </table>
      </div> -->
      <el-table
        :data="tableDatas"
        :row-style="{ height: '48px' }"
        :cell-style="{ padding: '0 16px' }"
        style="width: 100%;"
        border
        size="medium"
        :height="400"
      >
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
        <el-table-column
          label="邮箱"
          prop="email"
          align="center"
        ></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="tableData">
            {{ tableData.row.createdAt | formate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          style="width: 100%"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.pageNum"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.totalPage"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户弹窗 -->
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
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="addForm.email"
            prefix-icon="el-icon-message"
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
        <el-button @click="resetForm('add')"> 取 消 </el-button>
        <el-button type="primary" @click="addUserComfirm">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editUserDialog"
      width="35%"
      close-on-click-modal
    >
      <el-form
        ref="editFormRules"
        :model="editForm"
        label-width="100px"
        :rules="editUserRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="editForm.username"
            prefix-icon="el-icon-user-solid"
            clearable
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldpassword">
          <el-input
            v-model="editForm.oldpassword"
            type="password"
            prefix-icon="el-icon-unlock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input
            v-model="editForm.newpassword"
            type="password"
            prefix-icon="el-icon-unlock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="editForm.email"
            prefix-icon="el-icon-message"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择">
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
        <el-button @click="resetForm('edit')"> 取 消 </el-button>
        <el-button type="primary" @click="editUserComfirm">确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import moment from "moment";
import md5 from "md5";
import roles from "../../config/roleconfig.js";

export default {
  data() {
    return {
      search: "",
      addForm: {
        username: "",
        password: "",
        role: "",
        email: "",
      },
      editForm: {
        username: "",
        oldpassword: "",
        newpassword: "",
        role: "",
        email: "",
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
        email: [
          {
            message: "请输入邮箱地址",
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
      editUserRules: {
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
        oldpassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
        ],
        newpassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
        ],
        email: [
          {
            message: "请输入邮箱地址",
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
      roleOptions: roles,
      addUserDialog: false,
      editUserDialog: false,
      pages: {
        totalPage: 10,
        pageSize: 10,
        pageNum: 1,
      },
      tableData: [],
      userid: "",
      columns: [
        {
          label: "用户名",
          key: 1,
        },
        {
          label: "用户名",
          key: 1,
        },
        {
          label: "角色",
          key: 1,
        },
        {
          label: "邮箱",
          key: 1,
        },
        {
          label: "操作",
          key: 1,
        },
      ],
    };
  },
  created() {
    this.getUserListData();
  },
  filters: {
    formate(v) {
      return moment(v).format("YYYY-MM-DD HH:mm");
    },
  },
  computed: {
    tableDatas() {
      const search = String(this.search).toLowerCase();
      if (search) {
        return this.tableData.filter((data) => {
          return (
            String(data.username)
              .toLowerCase()
              .indexOf(search) > -1
          );
        });
      }
      return this.tableData;
    },
  },
  watch: {
    search(old) {
      if (!old) {
        this.pages.pageNum = 1;
      }
      this.$api.user
        .searchUser()
        .then((res) => {
          if (res.code === 200 && res.data.length > 0) {
            this.tableData = this.formateListData(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  methods: {
    handleScroll(event) {
      console.log(event.target);
      const { scrollTop, offsetHeight, scrollHeight } = event.target;
    },
    handleSizeChange(val) {
      this.pages.pageSize = val;
      this.pages.pageNum = 1;
      this.getUserListData();
    },
    handleCurrentChange(val) {
      this.pages.pageNum = val;
      this.getUserListData();
    },
    // 修改按钮
    handleEdit(item) {
      this.editUserDialog = true;
      this.userid = item._id;
      this.editForm.username = item.username;
      this.editForm.email = item.email;
      this.editForm.role = String(item.role);
    },
    // 修改提交
    editUserComfirm() {
      this.$refs.editFormRules.validate((valid) => {
        if (valid) {
          this.$api.user
            .updateUser({
              userid: this.userid,
              username: this.editForm.username,
              oldpassword: md5(this.editForm.oldpassword),
              newpassword: md5(this.editForm.newpassword),
              email: this.editForm.email,
              role: this.editForm.role,
            })
            .then((res) => {
              if (res.code == 200) {
                Message({
                  message: "修改成功",
                  type: "success",
                });
                this.resetForm("edit");
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
    // 删除按钮
    handleDelete(item) {
      this.$api.user.delUser({ userid: item._id }).then((res) => {
        if (res.code == 200) {
          this.getUserListData();
        }
      });
    },
    // 添加用户提交
    addUserComfirm() {
      this.$refs.addFormRules.validate((valid) => {
        if (valid) {
          this.$api.user
            .addUser({
              username: this.addForm.username,
              password: md5(this.addForm.password),
              email: this.addForm.email,
              role: this.addForm.role,
            })
            .then((res) => {
              if (res.code == 200) {
                Message({
                  message: res.message,
                  type: "success",
                });
                this.resetForm("add");
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
    resetForm(name) {
      if (name === "add") {
        this.addUserDialog = false;
        this.addForm.username = "";
        this.addForm.password = "";
        this.addForm.role = "";
        this.addForm.email = "";
        this.$refs["addFormRules"].resetFields();
      }
      if (name === "edit") {
        this.editUserDialog = false;
        this.editForm.username = "";
        this.editForm.newpassword = "";
        this.editForm.oldpassword = "";
        this.editForm.role = "";
        this.editForm.email = "";
        this.$refs["editFormRules"].resetFields();
      }
    },
    // 获取table数据
    getUserListData() {
      this.$api.user
        .getUserList(this.pages)
        .then((res) => {
          if (res.code == 200) {
            if (res.data.totalPage) {
              this.pages.totalPage = res.data.totalPage;
            }
            if (res.data.page) {
              this.tableData = this.formateListData(res.data.page);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 格式化数据处理
    formateListData(data) {
      data.map((item) => {
        if (item.role == 1) {
          item.roleName = "管理员";
        }
        if (item.role == 2) {
          item.roleName = "员工";
        }
        if (item.role == 3) {
          item.roleName = "客服";
        }
      });
      return data;
    },
  },
};
</script>

<style scoped>
.pagination {
  width: 100%;
  margin-top: 15px;
}
.el-pagination {
  text-align: right;
}
</style>

<style scoped>
.virtual-table {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.virtual-table__header {
  background-color: #f5f7fa;
  border-bottom: 1px solid #dfe6ec;
}

.virtual-table__header table {
  width: 100%;
  table-layout: fixed;
}

.virtual-table__header th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 500;
  color: #909399;
  border-left: 1px solid #dfe6ec;
}
</style>
