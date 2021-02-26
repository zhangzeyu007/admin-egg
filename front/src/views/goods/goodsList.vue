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
          <!-- <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="hashProgress"
            status="success"
          ></el-progress> -->
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
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('add')">取消</el-button>
        <el-button type="primary" @click="addGoodsComfirm">确定</el-button>
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
  right: 30px;
  top: 5px;
  opacity: 0;
}

.cube-container {
  .cube {
    width: 14px;
    height: 14px;
    line-height: 12px;
    border: 1px solid #000;
    background: #e4e7ed;
    float: left;
    opacity: 0.6;
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
</style>

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
      hash: "",
      addGoodsDialog: true,
      addGoodsForm: {
        name: "",
        price: "",
        discountPrice: "",
        desc: "",
        file: "",
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
  computed: {
    cubWidth() {
      return Math.ceil(Math.sqrt(this.chunks.length)) * 16;
    },
    uploadProgress() {
      if (!this.addGoodsForm.file || this.chunks.length) {
        return 0;
      }
      const loaded = this.chunks
        .map((item) => item.chunk.size * item.progress)
        .reduce((acc, cur) => acc + cur, 0);

      return parseInt(
        ((loaded * 100) / this.addGoodsForm.file.size).toFixed(2)
      );
    },
  },
  methods: {
    // 提交商品
    addGoodsComfirm() {
      this.uploadFile();
    },
    // 重置Form表单
    resetForm() {},
    // 文件发生改变
    handleFileChange(e) {
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
     *
     */
    async calculateHashIdle() {
      const chunks = this.chunks;
      console.log(chunks);

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
        const file = this.addGoodsForm.file;
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
        // 中间的, 取前中后各两个字节
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
      setTimeout(async () => {
        await this.mergeRequest();
      }, 5000);
    },
    sendRequest(chunks, limit = 3) {
      let that = this;
      // limit 并发数
      return new Promise((resolve, reject) => {
        const len = chunks.length;
        let counter = 0;
        let isStop = false;
        const start = async () => {
          if (isStop) {
            return;
          }
          const task = chunks.shift();
          if (task) {
            const { form, index } = task;
            try {
              that.$api.util.upload(form, {
                onUploadProgress: (progress) => {
                  // console.log(progress);
                  // 不是整体的进度,而是每个区块有自己的进度条,整体的进度需要计算
                  that.chunks[index].progress = Number(
                    ((progress.loaded / progress.total) * 100).toFixed(2)
                  );
                },
              });
              if (counter == len - 1) {
                // 最后一个任务
                resolve();
              } else {
                counter++;
                // 启动下一个任务
                start();
              }
            } catch (e) {
              console.log("接口报错");
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
    async mergeRequest() {
      this.$api.util.mergeFile({
        ext: this.addGoodsForm.file.name.split(".").pop(),
        size: CHUNK_SIZE,
        hash: this.hash,
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
      this.chunks = chunks;
      // const hash = await this.calculateHashIdle();
      const hash = await this.calculateHashSample();
      this.hash = hash;

      // 问一下后端, 文件是否上传过, 如果没有  是否存在切片
      const {
        data: { uploaded, uploadedList },
      } = await this.$api.util.checkFile({
        hash: this.hash,
        ext: this.addGoodsForm.file.name.split(".").pop(),
      });

      if (uploaded) {
        return Message.success("秒传成功");
      }

      this.chunks = chunks.map((chunk, index) => {
        // 切片的名字 hash+index
        const name = hash + "-" + index;
        return {
          hash,
          name,
          index,
          chunk: chunk.file,
          // 设置进度条，已经上传的设为100
          progress: uploadedList.indexOf(name) > -1 ? 100 : 0,
        };
      });

      await this.uploadChunks(uploadedList);
    },
  },
};
</script>

