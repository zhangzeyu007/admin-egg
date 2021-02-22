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
        <el-form-item label="名称" prop="name">
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
            <el-button type="primary" size="medium">点击上传</el-button>
            <input type="file" name="file" @change="handleFileChange" />
            <div>
              <img src="" alt="" />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('add')">取消</el-button>
        <el-button type="primary" @click="addGoodsComfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import Util from "../../util/util.js";
import sparkMD5 from "spark-md5";
const CHUNK_SIZE = 1 * 1024 * 1024;

export default {
  data() {
    return {
      chunks: [],
      hashProgress: 0,
      addGoodsDialog: true,
      addGoodsForm: {
        name: "",
        price: "",
        discountPrice: "",
        desc: "",
        file: [],
      },
      addGoodsRules: {
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
  mounted() {},
  methods: {
    // 提交商品
    addGoodsComfirm() {
      this.uploadFile();
    },
    // 重置Form表单
    resetForm() {},
    // 文件发生改变
    handleFileChange(e) {
      console.log(e.target.files);
      const [file] = e.target.files;
      console.log(file);
      if (!file) return;
      this.addGoodsForm.file = file;
    },
    // 创建切片
    createFileChunk(file, size = CHUNK_SIZE) {
      const chunks = [];
      let cur = 0;
      // 切片分区
      while (cur < file.size) {
        chunks.push({ index: cur, file: file.slice(cur, cur + size) });
        cur += size;
      }
      return chunks;
    },
    /**
     * 使用web worker 计算hash
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
     *
     */
    async calculateHashIdle() {
      const chunks = this.chunks;
      return new Promise((resolve) => {
        const saprk = new sparkMD5.ArrayBuffer();
        let count = 0;

        const appendToSpark = async (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (e) => {
              saprk.append(e.target.result);
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
              resolve(saprk.end());
            }
          }
          window.requestIdleCallback(workLoop);
        };
        // 浏览器一旦空闲, 就会调用 workLoop
        window.requestIdleCallback(workLoop);
      });
    },
    // 上传文件
    async uploadFile() {
      if (!this.addGoodsForm.file) {
        Message({
          message: "没有选择文件",
          type: "warning",
        });
        return;
      }
      if (!(await Util.isImage(this.addGoodsForm.file))) {
        Message({
          message: "文件格式不对",
          type: "warning",
        });
        return;
      }
      const chunks = this.createFileChunk(this.addGoodsForm.file);
      console.log(chunks);
      this.chunks = chunks;
      const hash = await this.calculateHashIdle();
      console.log(hash);
    },
  },
};
</script>

<style  scoped>
.fileinput-button {
  position: relative;
  display: inline-block;
}
.fileinput-button input {
  position: absolute;
  right: 30px;
  top: 5px;
  opacity: 0;
}
</style>