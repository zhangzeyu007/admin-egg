<!--
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-11-02 19:36:41
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-05 22:54:06
-->
<template>
  <i :class="iconFontClass" class="svg-icon" v-on="$listeners"></i>
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
      return `icon-${this.iconClass}`;
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
  font-size: 20px;
  margin-right: 5px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
