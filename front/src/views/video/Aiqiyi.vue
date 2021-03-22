<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-21 20:24:40
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-22 14:22:20
-->
<template>
  <div class="">
    <el-card>
      <el-input v-model="search" class="search-input">
        <el-button slot="append">搜索全网</el-button>
      </el-input>
      <!-- table内容区 -->
      <el-table
        :data="tableDatas"
        style="margin-top: 20px"
        border
        size="medium"
      >
        <el-table-column
          label="名称"
          prop="title"
          align="center"
        ></el-table-column>
        <el-table-column
          label="类型"
          prop="type"
          align="center"
        ></el-table-column>
        <!-- <el-table-column label="导演" prop="director" align="center">
          <template scope="scope">
            <p v-for="item in scope.row.director" :key="item.aid">
              {{ item }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="主演" prop="main_actor" align="center">
          <template scope="scope">
            <p v-for="item in scope.row.main_actor" :key="item.aid">
              {{ item }}
            </p>
          </template>
        </el-table-column> -->
        <el-table-column
          label="年份"
          prop="year"
          align="center"
        ></el-table-column>
        <el-table-column label="海报" prop="img" align="center">
          <template scope="scope">
            <img
              v-if="scope.row.img"
              :src="scope.row.img"
              alt=""
              style="width: 100px; height: 110px"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handlePaly(scope.row)"
              >播放</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加弹窗 -->
    <el-dialog
      :visible.sync="videoDialog"
      :fullscreen="true"
      close-on-click-modal
    >
      <div id="wrapper"></div>
    </el-dialog>
  </div>
</template>

<script>
import Chimee from "chimee";
import hls from "chimee-kernel-hls";
import flv from "chimee-kernel-flv";
import Vue from "vue";

export default {
  data() {
    return {
      search: "",
      timeout: "",
      tableDatas: [],
      videoDialog: false,
      chimee: "",
    };
  },
  watch: {
    search() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.getSearchList();
      }, 1000);
    },
  },
  methods: {
    getSearchList() {
      this.$api.video
        .getSearch({ keyName: this.search })
        .then((res) => {
          this.tableDatas = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterData(data) {
      let arr = [];
      data.filter((it) => {
        if (it.aid != 0) {
          arr.push(it);
        }
      });
      return arr;
    },
    // 播放按钮
    handlePaly(item) {
      let that = this;
      this.videoDialog = true;
      console.log(item);
      this.getVideoUrl(item.title);
      Vue.nextTick(() => {
        that.initVideo();
      });
    },
    // 获取视频播放地址
    getVideoUrl(name) {
      this.$api.video.getVideoUrl({ kayName: name }).then((res) => {
        console.log(res);
      });
    },
    // 初始化播放器
    initVideo() {
      this.chimee = new Chimee({
        wrapper: "#wrapper",
        src: "",
        controls: true,
        autoplay: true,
        kernels: {
          hls,
          flv,
        },
      });
      this.chimee.play();
    },
  },
};
</script>

<style lang="less"  scoped>
.search-input {
  width: 400px;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  height: 60px;
  .item-l {
    flex-shrink: 0;
  }
  .item-r {
    margin-left: 10px;
    > img {
      width: 50px;
      height: 60px;
    }
  }
}
</style>