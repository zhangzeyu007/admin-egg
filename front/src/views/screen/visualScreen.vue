<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-17 10:08:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-17 17:09:49
-->
<template>
  <div class="visual-main">
    <!-- 标题 -->
    <div class="header">可视化数据分析</div>
    <!-- 内容 -->
    <div class="cont">
      <div class="cont-edge">
        <div ref="chartL1" class="box"></div>
        <div id="chartL2" class="box"></div>
        <div id="chartL3" class="box"></div>
      </div>
      <div class="cont-center">
        <div class="center-tit">
          <div class="center-row">
            <div class="center-num">12345678</div>
            <div class="center-num">67890542</div>
          </div>
          <div class="center-row">
            <div class="center-text">2019年收入情况</div>
            <div class="center-text">2019年总支出情况</div>
          </div>
        </div>
        <div class="center-cont">
          <!--背景图-->
          <div class="centerImg">
            <!--网格点-->
            <img class="img1" src="../../static/image/screen/lbx.png" alt="" />
          </div>
          <div class="centerImg">
            <!--流光-->
            <img class="img2" src="../../static/image/screen/jt.png" alt="" />
          </div>
        </div>
      </div>
      <div class="cont-edge">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "@/config/echarts";
import "../../static/theme/walden.js";
import Vue from "vue";

export default {
  data() {
    return {};
  },
  created() {
    this.initChartL1();
  },
  methods: {
    initChartL1() {
      /*数据源*/
      const source = [
        ["年", "2014", "2015", "2016", "2017", "2018", "2019", "2020"],
        ["收入", 820, 932, 901, 934, 1290, 1330, 1520],
        ["支出", 200, 632, 601, 634, 850, 1000, 1100],
      ];
      console.log(echarts);
      Vue.nextTick(() => {
        let chart = echarts.init(this.$refs["chartL1"], "walden");
        const option = {
          title: {
            text: "",
            left: "center",
          },
          legend: { left: "right" },
          dataset: { source },
          xAxis: {
            type: "category",
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              type: "line",
              seriesLayoutBy: "row",
            },
            {
              type: "line",
              seriesLayoutBy: "row",
            },
          ],
        };
        chart.setOption(option);
      });
    },
  },
};
</script>

<style scoped lang="less">
@font-face {
  font-family: electronicFont;
  src: url("../../static/font/DS-DIGIT.TTF");
}
.visual-main {
  background: #000d4a;
}
.header {
  height: 99px;
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  padding-top: 12px;
  background-image: url("../../static/image/screen/head_bg.png");
}
.cont {
  display: flex;
  .cont-edge {
    width: 576px;
    .box {
      height: 313px;
      padding: 15px;
      margin-bottom: 14px;
      background-image: url("../../static/image/screen/box_bg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;
    }
  }
  .cont-edge:first-child {
    padding-left: 14px;
  }
  .cont-edge:last-child {
    padding-right: 14px;
  }
  .cont-center {
    width: 768px;
    padding: 0 14px;
    box-sizing: border-box;
    .center-tit {
      height: 140px;
      padding: 14px;
      background: rgba(101, 132, 226, 0.1);
      box-sizing: border-box;
      .center-row {
        display: flex;
        > div {
          flex: 1;
          font-weight: bold;
          text-align: center;
          vertical-align: middle;
        }
      }
      .center-row:first-child {
        height: 75px;
        background-image: url("../../static/image/screen/center_tit_bg.png");
        background-size: 100% 100%;
      }

      .center-num {
        line-height: 75px;
        color: #ffeb7b;
        font-size: 54px;
        font-family: electronicFont;
      }
      .center-text {
        font-size: 20px;
        color: rgba(255, 255, 255, 0.75);
        margin-top: 9px;
      }
    }
    .center-cont {
      position: relative;
      height: 827px;
      background-image: url("../../static/image/screen/center_cont_bg.jpg");
      background-size: 100% 100%;
      background-position: center;
      overflow: hidden;
      .centerImg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .img1 {
          animation: img1 20s linear infinite;
        }
        @keyframes img1 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .img2 {
          animation: img2 5s linear infinite;
          opacity: 0.5;
        }
        @keyframes img2 {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      }
    }
  }
}
</style>
