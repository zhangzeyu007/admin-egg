<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-17 10:08:33
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-17 22:24:55
-->
<template>
  <div class="visual-main">
    <!-- 标题 -->
    <div class="header">可视化数据分析</div>
    <!-- 内容 -->
    <div class="cont">
      <div class="cont-edge">
        <div ref="chartL1" class="box"></div>
        <div ref="chartL2" class="box"></div>
        <div ref="chartL3" class="box"></div>
      </div>
      <div class="cont-center">
        <div class="center-tit">
          <div class="center-row">
            <div class="center-num">5678</div>
            <div class="center-num">8542</div>
          </div>
          <div class="center-row">
            <div class="center-text">2020年收入情况</div>
            <div class="center-text">2020年总支出情况</div>
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
        <div ref="chartR1" class="box"></div>
        <div ref="chartR2" class="box"></div>
        <div ref="chartR3" class="box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "@/config/echarts";
import "../../static/theme/walden.js";
import dataJson from "../../static/json/table.json";

export default {
  data() {
    return {};
  },
  mounted() {
    this.initChartL1();
    this.initChartL2();
    this.initChartL3();
    this.initChartR1();
  },
  methods: {
    /*chartL1 - 折线图*/
    initChartL1() {
      /*数据源*/
      const source = [
        ["年", "2014", "2015", "2016", "2017", "2018", "2019", "2020"],
        ["收入", 820, 932, 901, 934, 1290, 1330, 1520],
        ["支出", 200, 632, 601, 634, 850, 1000, 1100],
      ];
      const chart = echarts.init(this.$refs["chartL1"], "walden");
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
    },

    /*chartL2 - 饼图*/
    initChartL2() {
      /*数据源*/
      const source = [
        { value: 5000, name: "旅游" },
        { value: 4500, name: "饮食" },
        { value: 6500, name: "服装" },
        { value: 3500, name: "电影" },
        { value: 2500, name: "其它" },
      ];
      const chart = echarts.init(this.$refs["chartL2"], "walden");
      const option = {
        title: {
          text: "衣食住行支出比",
          left: "center",
        },
        tooltip: {
          // formatter:'{d}%',
          // formatter:'{c}%',
          // formatter:'{b}%',
          formatter: ({ percent }) => {
            return Math.round(percent) + "%";
          },
        },
        dataset: { source },
        series: {
          type: "pie",
          center: ["50%", "55%"],
        },
      };

      /*显示图表*/
      chart.setOption(option);
    },
    /*chartL3 - 散点图*/
    initChartL3() {
      const chart = echarts.init(this.$refs["chartL3"], "walden");

      /*维度*/
      const dimensions = ["收入", "年龄", "人口", "住址", "时间"];

      /*配置项*/
      const option = {
        /*
         * title 标题
         *   text 主标题，如'西虹市人民收入和年龄关系'
         *   left 左对齐方式
         * */
        title: {
          text: "收入和年龄关系",
          left: "center",
        },

        /*
         * 坐标轴
         *   type 坐标轴类型
         *       value  数值轴，适用于连续数据
         *   name 坐标轴名称
         * */
        xAxis: {
          // type:'category',
          type: "value",
          name: "年龄",
        },
        yAxis: {
          type: "value",
          name: "收入",
        },
        /*
         * dataset 数据集
         *   dimensions 维度映射 []
         *       string，如 '年龄'，等同于 {name: '年龄'}
         *   source 数据源
         * */
        dataset: {
          dimensions,
        },
        /*
         * series系列集合
         *   type 图表类型
         *       scatter 散点图
         *   symbolSize 散点大小
         *   encode 编码映射
         *       x  x坐标系的维度映射，如1|'年龄'
         *       y  y坐标系的维度映射，如0|'收入'
         *       tooltip 提示映射，如[0, 1]
         *   itemStyle 项目样式
         *       opacity 项目透明度
         * */
        series: {
          type: "scatter",
          symbolSize: 3,
          encode: {
            x: 1,
            y: 0,
            // y:'收入',
          },
          itemStyle: {
            opacity: 0.4,
          },
        },
      };
      option.dataset.source = dataJson;
      chart.setOption(option);
    },
    /*chartR1 - 雷达图*/
    initChartR1() {
      /*数据*/
      const data = [
        {
          name: "预算分配",
          value: [43000, 45000, 42000, 45000, 40000, 49000],
        },
        {
          name: "实际开销",
          value: [30000, 34000, 55000, 35000, 32000, 31000],
        },
      ];
      /*
       * 雷达坐标系组件 radar
       *   indicator 雷达图的指示器集合 []
       *       name 指示器名称, 也就是标签内容
       *       min、max 数据区间，实际数据会在此区间内计算比值
       *       color 标签颜色
       *   shape 雷达形状
       *       polygon 多边形，默认
       *       circle 圆形
       *
       * */
      const indicator = [
        { name: "销售", min: 0, max: 60000 },
        { name: "管理", min: 0, max: 60000 },
        { name: "信息技术", min: 0, max: 60000 },
        { name: "客服", min: 0, max: 60000 },
        { name: "研发", min: 0, max: 60000 },
        { name: "市场", min: 0, max: 60000 },
      ];

      /*实例化echarts*/
      const chart = echarts.init(this.$refs["chartR1"], "walden");

      /*配置项*/
      const option = {
        /*
         * title 标题
         *   text 主标题，如'西虹市财务开销'
         * */
        title: {
          text: "西虹市财务开销",
        },

        /*
         * tooltip 提示
         * */
        tooltip: {},

        /*legend 图例
         *   data 数据，如['预算分配', '实际开销']
         *   orient 排列方式
         *       vertical 竖排
         *       horizontal 横排，默认
         *   left 左边距，如0
         *   top 上边距，如32
         * */
        legend: {
          data: ["预算分配", "实际开销"],
          left: "left",
          top: 30,
          orient: "vertical",
        },

        /*
         * 雷达坐标系组件 radar
         *   indicator[] 雷达图的指示器，定义雷达的轴
         * */
        radar: {
          indicator,
        },

        /*
         * series系列集合
         *   type 图表类型
         *       radar 雷达图
         *   data 数据
         * */
        series: {
          type: "radar",
          data,
        },
      };
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);
    },
    initChartR2() {},
    initChartR3() {},
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
      display: flex;
      justify-content: center;
      align-items: center;
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
