<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-04-13 16:53:52
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-14 14:18:18
 * @FilePath: \admin-egg\front\src\views\dou\video.vue
-->
<template>
  <el-card style="height:90vh;">
    <el-input v-model="videoUrl"></el-input>
    <el-button @click="sendMessage">视频地址获取</el-button>
  </el-card>
</template>

<script>
import socket from "../../mixin/soket";
export default {
  data() {
    return {
      videoUrl: "https://www.douyin.com/video/7340458261214203155",
    };
  },
  mixins: [socket],
  methods: {
    getVideourl() {
      // 这里是获取视频地址的逻辑
      this.$api.dou.getvideourl({ url: this.videoUrl }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
