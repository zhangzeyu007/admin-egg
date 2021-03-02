<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-02 15:18:24
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-02 21:23:01
-->
<template>
  <div class="editorList">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form>
            <el-form-item label="查询" label-width="80px">
              <el-input placeholder="请输入文章名称" v-model="search">
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialog = true"
            >添加文章
          </el-button>
        </el-col>
      </el-row>
      <!-- table内容区 -->
      <el-table
        :data="tableDatas"
        style="margin-top: 20px"
        border
        size="medium"
      >
        <el-table-column
          label="编号"
          prop="goodsId"
          align="center"
        ></el-table-column>
        <el-table-column
          label="标题"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="内容"
          prop="name"
          align="center"
        ></el-table-column>
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
  </div>
</template>
<style  lang="less" scoped>
.pagination {
  width: 100%;
  margin-top: 15px;
}
.el-pagination {
  text-align: right;
}
</style>

<script>
export default {
  data() {
    return {
      search: "",
      tableData: [],
      pages: {
        totalPage: 10,
        pageSize: 10,
        pageNum: 1,
      },
    };
  },
  mounted() {},
  computed: {
    tableDatas() {
      const search = String(this.search).toLowerCase();
      if (search) {
        return this.tableData.filter((data) => {
          return String(data.name).toLowerCase().indexOf(search) > -1;
        });
      }
      return this.tableData;
    },
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    handleEdit() {},
    handleDelete() {},
  },
};
</script>

