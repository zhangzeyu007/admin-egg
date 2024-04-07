/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-26 12:45:42
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-07 18:22:27
 * @FilePath: \admin-egg\front\src\mixin\uplaod.js
 */
import Util from "../util/util.js";
import sparkMD5 from "spark-md5";
const CHUNK_SIZE = 2 * 1024 * 1024;
import { Message } from "element-ui";

const mixin = {
  methods: {
    //TODO 上传文件获取
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
      // 获取hash
      // const hash = await this.calculateHashIdle();
      const hash = await this.calculateHashWorker();
      this.hash = hash;
      this.addGoodsForm.file.hash = hash;
      this.editGoodsForm.file.hash = hash;

      //TODO 问一下后端, 文件是否上传过, 如果没有是否存在切片
      // 先把所有 哈希发给后端, 后端返回没有上传过的切片, 前端根据切片上传
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
      //TODO 向后端发送需要上传的切片
      await this.uploadChunks(uploadedList);
    },

    //TODO: 创建切片
    createFileChunk(file, size = CHUNK_SIZE) {
      // 切片数组集合
      const chunks = [];
      // 切片
      let cur = 0;
      // 切片分区
      while (cur < file.size) {
        chunks.push({ index: cur, file: file.slice(cur, cur + size) });
        cur += size;
      }
      return chunks;
    },
    /**
     * * 使用 webWorker 计算 hash
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
     * * 利用空闲时间 进行计算hash
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
			 * *   抽样hash计算
			 * *  布隆过滤器  判断一个数据存在与否
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
          //转成formData
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
      // * 尝试申请tcp链接过多,也会造成卡顿
      // await Promise.all(requests);
      await this.sendRequest(requests);
    },
    // 发送请求  limit 并发数
    sendRequest(chunks, limit = 3) {
      let that = this;
      return new Promise((resolve, reject) => {
        const len = chunks.length;
        let counter = 0;
        let last = 0;
        // 是否停止
        let isStop = false;
        // 任务开启异步方法
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
                  //* 不是整体的进度,而是每个区块有自己的进度条,整体的进度需要计算
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
                  task.error++; // 错误次数 ++
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

export default mixin;
