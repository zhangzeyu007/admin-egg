<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:30
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-23 11:38:17
 * @FilePath: \admin-egg\front\src\components\IconFont.vue
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
