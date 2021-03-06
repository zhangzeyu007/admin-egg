<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-02 15:18:24
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-06 21:58:20
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
          <el-button type="primary" @click="addEditor">添加文章 </el-button>
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

    <!-- 添加弹窗 -->
    <el-dialog
      title="添加文章"
      :visible.sync="addEditorDialog"
      :fullscreen="true"
      close-on-click-modal
    >
      <el-form
        ref="addEditorRules"
        :model="addEditorForm"
        label-width="100px"
        :rules="addEditorRules"
      >
        <el-form-item label="编号" prop="editorId">
          <el-input
            v-model.number="addEditorForm.editorId"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model.number="addEditorForm.title" clearable></el-input>
        </el-form-item>
        <div>
          <div class="content-title">内容区:</div>
          <el-row>
            <el-col :span="12">
              <!-- markdown编辑器的基本操作 -->
              <textarea
                v-if="addEditorDialog"
                ref="editor"
                class="md-editor"
                :value="content"
                @input="update"
              ></textarea>
            </el-col>
            <el-col :span="12">
              <div class="markdown-body" v-html="addCompiledContent"></div>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取消</el-button>
        <el-button type="primary" @click="sendAddEditor">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.md-editor {
  width: 100%;
  height: 60vh;
  outline: none;
  resize: none;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
}
.content-title {
  padding: 10px;
  font-size: 14px;
  vertical-align: middle;
  box-sizing: border-box;
}
.markdown-body {
  width: 100%;
  height: 60vh;
  margin-left: 10px;
  border: 1px solid #ccc;
}

.pagination {
  width: 100%;
  margin-top: 15px;
}
.el-pagination {
  text-align: right;
}
</style>

<script>
import { Message } from "element-ui";
import marked from "marked";
import hljs from "highlight.js";
// import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";
import Vue from "vue";
export default {
  data() {
    return {
      addEditorDialog: false,
      search: "",
      tableData: [],
      addEditorForm: {
        editorId: "",
        title: "",
        content: "",
        compiledContent: "",
      },
      pages: {
        totalPage: 10,
        pageSize: 10,
        pageNum: 1,
      },
      addEditorRules: {
        editorId: [
          {
            required: true,
            message: "请输入编号",
            trigger: "change",
          },
          {
            type: "number",
            message: "必须是数字",
            trigger: "change",
          },
          {
            pattern: /^[0-9]+?$/,
            message: "必须是正整数",
            trigger: "change",
          },
        ],
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "change",
          },
        ],
      },
    };
  },
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
    addCompiledContent() {
      return marked(this.addEditorForm.content, {});
    },
  },
  methods: {
    handleSizeChange(val) {
      this.pages.pageSize = val;
      this.pages.pageNum = 1;
      this.getEditorListData();
    },
    handleCurrentChange(val) {
      this.pages.pageNum = val;
      this.getEditorListData();
    },
    handleEdit() {},
    handleDelete() {},
    // 获取文章列表数据
    getEditorListData() {},
    // 添加文章按钮
    addEditor() {
      this.addEditorDialog = true;
      this.bindEvents();
      this.setMarked();
    },
    resetForm() {
      this.addEditorDialog = false;
    },
    // 发送添加文章接口
    sendAddEditor() {
      this.$refs.addEditorRules.validate((valid) => {
        if (valid) {
          if (
            !this.addEditorForm.content ||
            !this.addEditorForm.compiledContent
          ) {
            Message({
              message: "文章内容不能为空",
              type: "error",
            });
          }
          this.$api.editor
            .addEditor(this.addEditorForm)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    update(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.content = e.target.value;
      }, 350);
    },
    setMarked() {
      this.timer = null;
      marked.setOptions({
        rendered: new marked.Renderer(),
        highlight(code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
      });
    },
    bindEvents() {
      Vue.nextTick(() => {
        this.$refs.editor.addEventListener("paste", async (e) => {
          const files = e.clipboardData.files;
          console.log(files);
          // 直接上传
        });
        this.$refs.editor.addEventListener("drop", async (e) => {
          const files = e.dataTransfer.files;
          console.log(files);
          // @todo 文件上传
          e.preventDefault();
        });
      });
    },
  },
};
</script>

