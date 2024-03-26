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
      <virtualScroll
        :data="tableData"
        :totalHeight="tableHeight"
        @update:visibleRange="handleVisibleRangeUpdate"
      >
        <el-table style="margin-top: 20px" size="medium" :data="visibleData">
          <el-table-column
            label="编号"
            prop="editorId"
            align="center"
          ></el-table-column>
          <el-table-column
            label="标题"
            prop="title"
            align="center"
          ></el-table-column>
          <el-table-column
            label="内容"
            prop="content"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="点赞数"
            prop="likenum"
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
      </virtualScroll>

      <div class="pagination">
        <el-pagination
          style="width: 100%"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.pageNum"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total"
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
                v-model="addEditorForm.content"
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
        <el-button @click="resetForm('add')">取消</el-button>
        <el-button type="primary" @click="sendAddEditor">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog
      title="修改文章"
      :visible.sync="editEditorDialog"
      :fullscreen="true"
      close-on-click-modal
    >
      <el-form
        ref="editEditorRules"
        :model="editEditorForm"
        label-width="100px"
        :rules="editEditorRules"
      >
        <el-form-item label="编号" prop="editorId">
          <el-input
            v-model.number="editEditorForm.editorId"
            clearable
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model.number="editEditorForm.title" clearable></el-input>
        </el-form-item>
        <div>
          <div class="content-title">内容区:</div>
          <el-row>
            <el-col :span="12">
              <!-- markdown编辑器的基本操作 -->
              <textarea
                v-if="editEditorDialog"
                ref="editor"
                class="md-editor"
                v-model="editEditorForm.content"
                @input="update"
              ></textarea>
            </el-col>
            <el-col :span="12">
              <div class="markdown-body" v-html="editCompiledContent"></div>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('edit')">取消</el-button>
        <el-button type="primary" @click="sendEditEditor">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Vue from "vue";
import virtualScroll from "../../components/virtualScroll.vue";

export default {
  components: {
    virtualScroll,
  },
  data() {
    return {
      addEditorDialog: false,
      editEditorDialog: false,
      search: "",
      tableHeight: 420,
      tableData: [],
      visibleData: [],
      visibleRange: { startIndex: 0, endIndex: 0 }, // 可视区域范围
      bufferHeight: 200, // 缓冲高度,提前加载下一页
      addEditorForm: {
        editorId: "",
        title: "",
        content: "",
        compiledContent: "",
        likenum: "",
      },
      editEditorForm: {
        editorId: "",
        title: "",
        content: "",
        compiledContent: "",
        likenum: "",
      },
      pages: {
        total: 10,
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
      editEditorRules: {
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
  created() {
    this.getEditorListData();
  },

  watch: {
    search(old) {
      if (!old) {
        this.pages.pageNum = 1;
      }
      this.$api.editor
        .editorSearch()
        .then((res) => {
          if (res.code === 200 && res.data.length > 0) {
            this.tableData = res.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    tableDatas() {
      const search = String(this.search).toLowerCase();
      if (search) {
        return this.tableData.filter((data) => {
          return (
            String(data.title)
              .toLowerCase()
              .indexOf(search) > -1
          );
        });
      }
      return this.tableData;
    },
    addCompiledContent() {
      return marked(this.addEditorForm.content, {});
    },
    editCompiledContent() {
      return marked(this.editEditorForm.content, {});
    },
  },
  methods: {
    updateTableHeight() {
      this.tableHeight = this.pages.total * 50; // 假设每行高度为 50px
    },

    handleVisibleRangeUpdate({ startIndex, endIndex }) {
      this.visibleRange = { startIndex, endIndex };
      console.log(this.visibleRange);
      this.updateVisibleData();
    },

    updateVisibleData() {
      const { startIndex, endIndex } = this.visibleRange;
      this.visibleData = this.tableData.slice(startIndex, endIndex);
    },

    handleSizeChange(val) {
      this.pages.pageSize = val;
      this.pages.pageNum = 1;
      this.getEditorListData();
    },

    handleCurrentChange(val) {
      this.pages.pageNum = val;
      this.getEditorListData();
    },
    // 重置form
    resetForm(name) {
      if (name === "add") {
        this.addEditorDialog = false;
        this.addEditorForm.editorId = "";
        this.addEditorForm.title = "";
        this.addEditorForm.content = "";
        this.addEditorForm.compiledContent = "";
        this.$refs["addEditorRules"].resetFields();
      }
      if (name === "edit") {
        this.editEditorDialog = false;
        this.editEditorForm.editorId = "";
        this.editEditorForm.title = "";
        this.editEditorForm.content = "";
        this.editEditorForm.compiledContent = "";
        this.$refs["editEditorRules"].resetFields();
      }
    },
    // 添加文章按钮
    addEditor() {
      this.addEditorDialog = true;
      this.bindEvents();
      this.setMarked();
    },
    // 修改按钮
    handleEdit(item) {
      this.editEditorForm.editorId = item.editorId;
      this.editEditorForm.title = item.title;
      this.editEditorForm.content = item.content;
      this.editEditorForm.compiledContent = item.compiledContent;
      this.editEditorDialog = true;
      this.bindEvents();
      this.setMarked();
    },
    // 删除文章按钮
    handleDelete(item) {
      this.$api.editor.delEditor({ editorId: item._id }).then((res) => {
        if (res.code == 200) {
          this.getEditorListData();
        }
      });
    },
    // 发送添加文章接口
    sendAddEditor() {
      this.$refs.addEditorRules.validate((valid) => {
        if (valid) {
          this.addEditorForm.compiledContent = this.addCompiledContent;
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
              if (res.code == 200) {
                Message({
                  message: "添加成功",
                  type: "success",
                });
                this.getEditorListData();
                this.resetForm("add");
              } else if (res.code == -2) {
                Message({
                  type: "warning",
                  message: res.message,
                });
              } else {
                Message({
                  type: "error",
                  message: res.message,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    //更新文章
    sendEditEditor() {
      this.$refs.editEditorRules.validate((valid) => {
        if (valid) {
          this.editEditorForm.compiledContent = this.editCompiledContent;
          if (
            !this.editEditorForm.content ||
            !this.editEditorForm.compiledContent
          ) {
            Message({
              message: "文章内容不能为空",
              type: "error",
            });
          }
          this.$api.editor
            .editorUpdate(this.editEditorForm)
            .then((res) => {
              if (res.code == 200) {
                Message({
                  message: "更新成功",
                  type: "success",
                });
                this.getEditorListData();
                this.resetForm("edit");
              }
              if (res.code == -1) {
                Message({
                  message: "更新失败",
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
    // 获取文章列表数据
    getEditorListData() {
      this.$api.editor.getEditorList(this.pages).then((res) => {
        if (res.code == 200) {
          console.log(res.data.total, "总数");
          this.pages.total = res.data && res.data.totalPage;
          if (res.data.page) {
            this.tableData = this.formateListData(res.data.page);
          }
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
    // 格式化数据处理
    formateListData(data) {
      data.map((item) => {
        if (item.likenum == "") {
          item.likenum = "0";
        }
      });
      return data;
    },
  },
};
</script>

<style lang="less" scoped>
.editorList {
}
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
