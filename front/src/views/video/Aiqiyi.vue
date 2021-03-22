<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-21 20:24:40
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-22 17:26:06
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
        <el-table-column label="影视" prop="img" align="center">
          <template scope="scope">
            <img
              v-if="scope.row.img"
              :src="scope.row.img"
              alt=""
              style="width: 110px; height: 120px"
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
      @close="closeDialog"
    >
      <div id="wrapper"></div>
      <div class="selections">
        <el-collapse v-model="active">
          <el-collapse-item
            title="选集"
            name="1"
            v-for="(item, index) in sourseData"
            :key="index"
          >
            <div class="title">{{ item.name }}</div>
            <el-button
              class="btn"
              v-for="(it, idx) in item.source.eps"
              :key="idx"
              @click="selectionsPlay(it.url)"
              >{{ it.name }}</el-button
            >
          </el-collapse-item>
        </el-collapse>
      </div>
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
      sourseData: [],
      active: "1",
      sourseUrl: "",
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
    handleChange() {},
    // 获取搜索数据
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
      this.getVideoSourse(item.title);
      Vue.nextTick(() => {
        that.initVideo();
      });
    },
    // 获取视频播放地址
    getVideoSourse(name) {
      this.$api.video.getVideoSourse({ keyName: name }).then((res) => {
        console.log(res);
        if (res.data) {
          this.sourseData = res.data;
        }
      });
    },
    // 初始化播放器
    initVideo(url) {
      console.log(url + "打的费");
      this.chimee = null;
      this.chimee = new Chimee({
        wrapper: "#wrapper",
        src: url,
        controls: true,
        autoplay: true,
        kernels: {
          hls,
          flv,
        },
      });
      this.chimee.play();
    },
    selectionsPlay(url) {
      console.log(url);
      this.sourseUrl = url;
      console.log(this.sourseUrl + "我的");
      this.initVideo(this.sourseUrl);
      console.log(this.chimee);
    },
    closeDialog() {
      this.chimee.pause();
      this.chimee.src = "";
      this.chimee = null;
    },
  },
};
</script>

<style lang="less" scoped>
.search-input {
  width: 400px;
}
.selections {
  .title {
    padding: 10px 0px;
    font-size: 15px;
    font-weight: 600;
    box-sizing: border-box;
  }
  .btn {
    margin-top: 10px;
  }
}
</style>