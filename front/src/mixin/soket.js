/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-04-14 13:13:06
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-14 14:18:01
 * @FilePath: \admin-egg\front\src\mixin\soket.js
 */
import socket from "../util/soket";

const mixin = {
  mounted() {
    this.initSocket();
  },
  methods: {
    initSocket() {
      // 监听服务响应
      socket.on("message", (value) => {
        console.log("服务端响应：", value);
      });
    },
    sendMessage() {
      socket.emit("message", { url: this.videoUrl }, (response) => {
        console.log("服务端响应：", response);
      });
    },
  },
};

export default mixin;
