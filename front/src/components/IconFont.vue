<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-11-02 19:36:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-25 23:34:02
-->
<template>
  <!-- <i :class="iconFontClass" class="svg-icon" v-on="$listeners"></i> -->
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "IconFont",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    iconFontClass() {
      if (this.iconName) {
        return "iconfont " + this.iconName;
      } else {
        return "iconfont";
      }
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1.6em;
  height: 1.6em;
  margin-right: 10px;
  vertical-align: center;
  fill: currentColor;
  overflow: hidden;
}
</style>
