<template>
  <div class="goodsList">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addGoods"> 添加商品 </el-button>
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
          label="商品编号"
          prop="goodsId"
          align="center"
        ></el-table-column>
        <el-table-column
          label="商品名称"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="价格"
          prop="price"
          align="center"
        ></el-table-column>
        <el-table-column
          label="折扣价格"
          prop="discountPrice"
          align="center"
        ></el-table-column>
        <el-table-column
          label="商品描述"
          prop="desc"
          align="center"
        ></el-table-column>
        <el-table-column label="商品图片" prop="url" align="center">
          <template scope="scope">
            <img
              :src="scope.row.url"
              alt=""
              style="width: 120px; height: 80px"
            />
          </template>
        </el-table-column>
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
    <!-- 添加商品弹窗 -->
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
        <el-form-item label="商品编号" prop="goodsId">
          <el-input v-model.number="addGoodsForm.goodsId" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addGoodsForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input
            v-model.number="addGoodsForm.price"
            type="text"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="折扣价格" prop="discountPrice">
          <el-input
            v-model.number="addGoodsForm.discountPrice"
            type="text"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="addGoodsForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <div class="fileinput-button">
            <el-button type="primary" size="medium">选择文件</el-button>
            <el-button type="success" @click="uploadFile">上传</el-button>
            <input
              ref="addFileInput"
              type="file"
              name="file"
              @change="handleFileChange"
            />
          </div>
          <div class="upload-image" v-if="showUpLoad">
            <div class="image">
              <img :src="imgUrl" alt="" />
            </div>
            <div class="upload-right">
              <div class="file-name">{{ fileName }}</div>
              <div class="cube-container" :style="{ width: cubWidth + 'px' }">
                <div class="cube" v-for="chunk in chunks" :key="chunk.name">
                  <div
                    :class="{
                      uploading: chunk.progress > 0 && chunk.progress < 100,
                      success: chunk.progress == 100,
                      error: chunk.progress < 0,
                    }"
                    :style="{ height: chunk.progress + '%' }"
                  >
                    <i
                      class="el-icon-loading"
                      style="color: #409eff"
                      v-if="chunk.progress < 100 && chunk.progress > 0"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-progress
            v-if="showUpLoad"
            style="margin-top: 5px"
            :text-inside="true"
            :stroke-width="18"
            :percentage="uploadProgress"
            status="success"
          ></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('add')">取消</el-button>
        <el-button type="primary" @click="sendAddGoods">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改商品弹窗 -->
    <el-dialog
      title="修改商品"
      :visible.sync="editGoodsDialog"
      width="35%"
      close-on-click-modal
    >
      <el-form
        ref="editFormRules"
        :model="editGoodsForm"
        label-width="100px"
        :rules="editGoodsRules"
      >
        <el-form-item label="商品编号" prop="goodsId">
          <el-input
            v-model.number="editGoodsForm.goodsId"
            disabled
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="editGoodsForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input
            v-model.number="editGoodsForm.price"
            type="text"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="折扣价格" prop="discountPrice">
          <el-input
            v-model.number="editGoodsForm.discountPrice"
            type="text"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="editGoodsForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <div class="fileinput-button">
            <el-button type="primary" size="medium">选择文件</el-button>
            <el-button type="success" @click="uploadFile">上传</el-button>
            <input
              ref="editFileInput"
              type="file"
              name="file"
              @change="handleFileChange"
            />
          </div>
          <div class="upload-image" v-if="showUpLoad">
            <div class="image">
              <img :src="imgUrl" alt="" />
            </div>
            <div class="upload-right">
              <div class="file-name">{{ fileName }}</div>
              <div class="cube-container" :style="{ width: cubWidth + 'px' }">
                <div class="cube" v-for="chunk in chunks" :key="chunk.name">
                  <div
                    :class="{
                      uploading: chunk.progress > 0 && chunk.progress < 100,
                      success: chunk.progress == 100,
                      error: chunk.progress < 0,
                    }"
                    :style="{ height: chunk.progress + '%' }"
                  >
                    <i
                      class="el-icon-loading"
                      style="color: #409eff"
                      v-if="chunk.progress < 100 && chunk.progress > 0"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-progress
            v-if="showUpLoad"
            style="margin-top: 5px"
            :text-inside="true"
            :stroke-width="18"
            :percentage="uploadProgress"
            status="success"
          ></el-progress>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('edit')">取消</el-button>
        <el-button type="primary" @click="sendEditGoods">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.fileinput-button {
  position: relative;
  display: inline-block;
}
.fileinput-button input {
  position: absolute;
  right: 100px;
  top: 5px;
  opacity: 0;
}

.upload-image {
  display: flex;
  align-items: center;
  margin-top: 5px;
  border: 2px solid #e4e7ed;
  border-radius: 5px;
  .image {
    width: 100px;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .upload-right {
    display: flex;
    align-items: center;
    margin-left: 5px;
    .file-name {
      flex-shrink: 0;
      font-size: 14px;
      color: #409eff;
    }
    .cube-container {
      padding-left: 15px;
      height: 80px;
      width: 200px;
      overflow: auto;
      .cube {
        width: 16px;
        height: 16px;
        line-height: 12px;
        border: 1px solid #000;
        background: #e4e7ed;
        float: left;
        opacity: 0.4;
        > .success {
          background: #67c23a;
        }

        > .uploading {
          background: #409eff;
        }

        > .error {
          background: #f56c6c;
        }
      }
    }
  }
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
import moment from "moment";
import { useWatermark } from "../../util/water.js";
import mixin from "../../mixin/uplaod";
import { Message } from "element-ui";

export default {
  data() {
    return {
      search: "",
      tableData: [],
      pages: {
        totalPage: 0,
        pageSize: 10,
        pageNum: 1,
      },
      file: "",
      hash: "",
      chunks: [],
      hashProgress: 0,
      totalProgress: 0,
      addGoodsDialog: false,
      editGoodsDialog: false,
      addGoodsForm: {
        goodsId: "",
        name: "",
        price: "",
        discountPrice: "",
        desc: "",
        file: {
          name: "",
          ext: "",
          hash: "",
        },
      },
      editGoodsForm: {
        goodsId: "",
        name: "",
        price: "",
        discountPrice: "",
        desc: "",
        file: {
          name: "",
          ext: "",
          hash: "",
        },
        url: "",
      },
      imgUrl: "",
      fileName: "",
      showUpLoad: false,
      isUpload: false,
      addGoodsRules: {
        goodsId: [
          {
            required: true,
            message: "请输入商品编号",
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
        name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "change",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "change",
          },
          {
            type: "number",
            message: "必须是数字",
            trigger: "change",
          },
        ],
        discountPrice: [
          {
            required: true,
            message: "请输入商品折扣价格",
            trigger: "change",
          },
          {
            type: "number",
            message: "必须是数字",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "请输入商品描述",
            trigger: "change",
          },
          {
            min: 1,
            max: 120,
            message: "长度在 1 到 120个字符",
            trigger: "change",
          },
        ],
      },
      editGoodsRules: {
        name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "change",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "change",
          },
          {
            type: "number",
            message: "必须是数字",
            trigger: "change",
          },
        ],
        discountPrice: [
          {
            required: true,
            message: "请输入商品折扣价格",
            trigger: "change",
          },
          {
            type: "number",
            message: "必须是数字",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "请输入商品描述",
            trigger: "change",
          },
          {
            min: 1,
            max: 120,
            message: "长度在 1 到 120个字符",
            trigger: "change",
          },
        ],
      },
    };
  },

  mixins: [mixin],

  watch: {
    search(old) {
      if (!old) {
        this.pages.pageNum = 1;
      }
      this.$api.goods
        .goodsSearch()
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
            String(data.name)
              .toLowerCase()
              .indexOf(search) > -1
          );
        });
      }
      return this.tableData;
    },
    cubWidth() {
      return Math.ceil(Math.sqrt(this.chunks.length)) * 18;
    },
    uploadProgress() {
      if (!this.file || this.chunks.length <= 0) {
        return 0;
      }
      const loaded = this.chunks
        .map(
          (item) =>
            (item.chunk ? item.chunk.size : 0) *
            (item.progress ? item.progress : 0)
        )
        .reduce((acc, cur) => acc + cur, 0);

      return parseInt(((loaded * 100) / this.file.size).toFixed(2) / 100);
    },
  },

  created() {
    this.getGoodsListData();
  },

  mounted() {
    const { setWatermark, clearWatermark } = useWatermark();
    this.$nextTick(() => {
      setWatermark("张泽雨", {});
    });
  },

  methods: {
    handleSizeChange(val) {
      this.pages.pageSize = val;
      this.pages.pageNum = 1;
      this.getGoodsListData();
    },
    handleCurrentChange(val) {
      this.pages.pageNum = val;
      this.getGoodsListData();
    },
    // 添加商品按钮
    addGoods() {
      this.addGoodsDialog = true;
      this.resetForm();
    },
    // 修改按钮
    handleEdit(item) {
      this.editGoodsDialog = true;
      this.fileName = "";
      this.editGoodsForm.goodsId = item.goodsId;
      this.editGoodsForm.name = item.name;
      this.editGoodsForm.price = item.price;
      this.editGoodsForm.discountPrice = item.discountPrice;
      this.editGoodsForm.desc = item.desc;
      this.editGoodsForm.url = item.url;
      this.imgUrl = item.url;
      this.showUpLoad = true;
    },
    // 删除商品方法
    handleDelete(item) {
      let url = item.url.split("public/")[1];
      this.$api.goods
        .delGoods({ goodsid: item._id, fileName: url })
        .then((res) => {
          if (res.code == 200) {
            this.getGoodsListData();
          }
        });
    },
    // 获取table数据
    getGoodsListData() {
      this.$api.goods
        .getGoodsList(this.pages)
        .then((res) => {
          if (res.code == 200) {
            if (res.data.totalPage) {
              this.pages.totalPage = res.data.totalPage;
            }
            if (res.data.page) {
              this.tableData = res.data.page;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 文件发生改变
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      this.resetForm();
      this.fileName = file.name;
      this.imgUrl = window.URL.createObjectURL(file);
      this.file = file;
      this.addGoodsForm.file.name = file.name;
      this.addGoodsForm.file.ext = file.name.split(".").pop();
      this.editGoodsForm.file.name = file.name;
      this.editGoodsForm.file.ext = file.name.split(".").pop();
      this.showUpLoad = true;
    },
    // 重置Form表单
    resetForm(name) {
      this.chunks = [];
      this.showUpLoad = false;
      this.isUpload = false;
      if (name == "add") {
        this.addGoodsDialog = false;
        this.addGoodsForm.name = "";
        this.addGoodsForm.price = "";
        this.addGoodsForm.discountPrice = "";
        this.addGoodsForm.desc = "";
        this.addGoodsForm.file = {};
        this.file = "";
        this.$refs["addFileInput"].type = "null";
        this.$refs["addFileInput"].type = "file";
        this.$refs["addFormRules"].resetFields();
      }
      if (name == "edit") {
        this.editGoodsDialog = false;
        this.editGoodsForm.name = "";
        this.editGoodsForm.price = "";
        this.editGoodsForm.discountPrice = "";
        this.editGoodsForm.desc = "";
        this.editGoodsForm.file = {};
        this.file = "";
        this.$refs["editFileInput"].type = "null";
        this.$refs["editFileInput"].type = "file";
        this.$refs["editFormRules"].resetFields();
      }
    },
    // 修改商品
    async sendEditGoods() {
      this.$refs.editFormRules.validate((valid) => {
        if (valid) {
          this.$api.goods
            .goodsUpdate(this.editGoodsForm)
            .then((res) => {
              if (res.code == 200) {
                Message({
                  message: "修改成功",
                  type: "success",
                });
                this.getGoodsListData();
                this.resetForm("edit");
              }
              if (res.code == -1) {
                Message({
                  message: "修改失败",
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
    // 添加商品
    async sendAddGoods() {
      this.$refs.addFormRules.validate((valid) => {
        if (valid) {
          if (!this.isUpload) {
            Message({
              message: "请先上传文件",
              type: "warning",
            });
            return;
          }
          this.$api.goods
            .addGoods(this.addGoodsForm)
            .then((res) => {
              if (res.code == 200) {
                Message({
                  message: res.message,
                  type: "success",
                });
                this.getGoodsListData();
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
  },
};
</script>
