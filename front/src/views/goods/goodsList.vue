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

<style  lang="less" scoped>
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
import { Message } from "element-ui";
import Util from "../../util/util.js";
import sparkMD5 from "spark-md5";
import moment from "moment";
const CHUNK_SIZE = 2 * 1024 * 1024;

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
          return String(data.name).toLowerCase().indexOf(search) > -1;
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
    //修改按钮
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
    //TODO: 创建切片
    createFileChunk(file, size = CHUNK_SIZE) {
      const chunks = [];
      let cur = 0;
      // todo 切片分区
      while (cur < file.size) {
        chunks.push({ index: cur, file: file.slice(cur, cur + size) });
        cur += size;
      }
      return chunks;
    },
    /**
     * 使用 web worker 计算 hash
     * todo 存在 bug
     */
    async calculateHashWorker() {
      return new Promise((resolve) => {
        this.worker = new Worker("/hash.js");
        this.worker.postMessage({ chunks: this.chunks });
        this.worker.onmessage = (e) => {
          const { progress, hash } = e.data;
          this.hashProgress = Number(progress.toFixed(2));
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    /**
     * 利用空闲时间 进行计算 hash
     */
    async calculateHashIdle() {
      const chunks = this.chunks;
      return new Promise((resolve) => {
        const spark = new sparkMD5.ArrayBuffer();
        let count = 0;
        const appendToSpark = async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (e) => {
              spark.append(e.target.result);
              resolve();
            };
          });
        };
        const workLoop = async (deadline) => {
          // timeRemaining 获取当前帧的剩余时间
          while (count < chunks.length && deadline.timeRemaining() > 1) {
            // 空闲时间, 且有任务
            await appendToSpark(chunks[count].file);
            count++;
            if (count < chunks.length) {
              this.hash = Number(((100 * count) / chunks.length).toFixed(2));
            } else {
              this.hashProgress = 100;
              resolve(spark.end());
            }
          }
          window.requestIdleCallback(workLoop);
        };
        // 浏览器一旦空闲, 就会调用 workLoop
        window.requestIdleCallback(workLoop);
      });
    },
    /**
     * 抽样hash计算
     *  布隆过滤器  判断一个数据存在与否
         1个G的文件，抽样后5M以内
        hash一样，文件不一定一样
        hash不一样，文件一定不一样
    */
    async calculateHashSample() {
      return new Promise((resolve) => {
        const spark = new sparkMD5.ArrayBuffer();
        const reader = new FileReader();
        const file = this.file;
        const size = file.size;
        const offset = 1 * 1024 * 1024;
        // 第一个 1M ,最后一个区块的数据 全要
        // 中间的, 取前中后各两个字节
        let chunks = [file.slice(0, offset)];
        let cur = offset;
        while (cur < size) {
          if (cur + offset >= size) {
            // 最后 一个区块
            chunks.push(file.slice(cur, cur + offset));
          } else {
            // 中间的区块
            const mid = cur + offset / 2;
            const end = cur + offset;
            chunks.push(file.slice(cur, cur + 2));
            chunks.push(file.slice(mid, mid + 2));
            chunks.push(file.slice(end - 2, end));
          }
          cur += offset;
        }
        // 中间的,取前中后各两个字节
        reader.readAsArrayBuffer(new Blob(chunks));
        reader.onload = (e) => {
          spark.append(e.target.result);
          this.hashProgress = 100;
          resolve(spark.end());
        };
      });
    },
    // 上传切片处理方法
    async uploadChunks(uploadedList = []) {
      const requests = await this.chunks
        .filter((chunk) => uploadedList.indexOf(chunk.name) == -1)
        .map((chunk) => {
          // 转成 promise
          const form = new FormData();
          form.append("chunk", chunk.chunk);
          form.append("hash", chunk.hash);
          form.append("name", chunk.name);
          return {
            form,
            index: chunk.index,
            error: 0,
          };
        });
      // .map(({ form, index }) => {
      //   console.log("调用2");
      //   this.$api.util.upload(form, {
      //     onUploadProgress: (progress) => {
      //       console.log("哈哈哈哈");
      //       // 不是整体的进度,而是每个区块有自己的进度条,整体的进度需要计算
      //       this.chunks[index].progress = Number(
      //         ((progress.loaded / progress.total) * 100).toFixed(2)
      //       );
      //       console.log(this.chunks[index].progress);
      //     },
      //   });
      // });
      // TODO 并发量控制
      //尝试申请tcp链接过多,也会造成卡顿
      // await Promise.all(requests);
      await this.sendRequest(requests);
    },
    // 上传文件
    async uploadFile() {
      if (!this.file) {
        Message({
          message: "没有选择文件",
          type: "warning",
        });
        return;
      }
      if (!(await Util.isImage(this.file))) {
        Message({
          message: "文件格式不对",
          type: "warning",
        });
        return;
      }
      const chunks = this.createFileChunk(this.file);
      this.chunks = chunks;
      // const hash = await this.calculateHashIdle();
      const hash = await this.calculateHashSample();
      this.hash = hash;
      this.addGoodsForm.file.hash = hash;
      this.editGoodsForm.file.hash = hash;

      //TODO 问一下后端, 文件是否上传过, 如果没有  是否存在切片
      const {
        data: { uploaded, uploadedList },
      } = await this.$api.util.checkFile({
        hash: this.hash,
        ext: this.file.name.split(".").pop(),
      });

      if (uploaded) {
        this.isUpload = true;
        return Message.success("秒传成功");
      }

      this.chunks = chunks.map((chunk, index) => {
        //TODO 切片的名字 hash+index
        const name = hash + "-" + index;
        return {
          hash,
          name,
          index,
          chunk: chunk.file,
          // 设置进度条，已经上传的设为 100
          progress: uploadedList.indexOf(name) > -1 ? 100 : 0,
        };
      });

      await this.uploadChunks(uploadedList);
    },
    // 发送请求
    sendRequest(chunks, limit = 3) {
      let that = this;
      // limit 并发数
      return new Promise((resolve, reject) => {
        const len = chunks.length;
        let counter = 0;
        let last = 0;
        let isStop = false;
        const start = async () => {
          if (isStop) {
            return;
          }
          const task = chunks.shift();
          if (task) {
            const { form, index } = task;
            await that.$api.util
              .upload(form, {
                onUploadProgress: (progress) => {
                  // console.log(progress);
                  // 不是整体的进度,而是每个区块有自己的进度条,整体的进度需要计算
                  this.chunks[index].progress = Number(
                    ((progress.loaded / progress.total) * 100).toFixed(2)
                  );
                },
              })
              .then((res) => {
                last += 1;
                if (last == len) {
                  if (res.code == 200) {
                    that.isUpload = true;
                    setTimeout(() => {
                      that.mergeRequest();
                    }, 1000);
                  }
                }
              })
              .catch(() => {
                this.chunks[index].progress = -1;
                if (task.error < 3) {
                  task.error++;
                  chunks.unshift(task);
                  start();
                } else {
                  // 错误
                  isStop = true;
                  reject();
                }
              });
            if (counter == len - 1) {
              // 最后一个任务
              resolve();
            } else {
              counter++;
              // 启动下一个任务
              start();
            }
          }
        };

        while (limit > 0) {
          // 启动limit个任务
          start();
          limit -= 1;
        }
      });
    },
    // 合并文件
    async mergeRequest() {
      this.$api.util.mergeFile({
        ext: this.file.name.split(".").pop(),
        size: CHUNK_SIZE,
        hash: this.hash,
      });
    },
  },
};
</script>

