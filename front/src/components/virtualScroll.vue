<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-03-22 15:32:42
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-08 12:42:35
 * @FilePath: \admin-egg\front\src\components\virtualScroll.vue
-->
<template>
  <div class="virtual-scroll" @scroll="handleScroll" ref="scrollContainer">
    <div :style="{ height: `${contentHeight}px` }">
      <div class="list-phantom" :style="{ height: listHeight + 'px' }"></div>
      <div class="list" :style="{ transform: getTransform }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualScroll",
  props: {
    data: {
      type: Array,
      required: true,
    },
    totalHeight: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      startIndex: 0,
      endIndex: 0,
      rowHeight: 50, // 假设每行高度为 this.rowHeightpx
      startOffset: 0,
    };
  },

  computed: {
    // 内容高度
    contentHeight() {
      return this.totalHeight;
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //可显示的列表项数
    visibleCount() {
      return Math.ceil(this.totalHeight / this.rowHeight);
    },
    //列表总高度
    listHeight() {
      return this.data.length * this.rowHeight;
    },
  },

  watch: {
    data: function(val) {
      this.handleScroll();
    },
  },

  methods: {
    handleScroll() {
      this.startIndex = 0;
      this.endIndex = this.startIndex + this.visibleCount;
      const scrollContainer = this.$refs.scrollContainer;
      const scrollTop = scrollContainer.scrollTop;
      // 此时的开始索引
      this.startIndex = Math.floor(scrollTop / this.rowHeight);
      // 此时的结束索引
      this.endIndex = this.startIndex + this.visibleCount;
      // 此时的偏移量
      /*
      对齐行高度: 由于滚动位置的偏移量 scrollTop 可能不是行高度 this.rowHeight 的整数倍,
       因此需要将其对行高度取余,以确保 startOffset 总是从一个完整的行的顶部开始。
      这样可以保证每个渲染的列表项都是完整的,避免出现视觉上的断层。
      精确定位: 如果不进行取模运算,而直接使用原始的 scrollTop 作为起始偏移量,
      可能会导致第一个渲染的列表项出现在视窗中间或其他位置,而不是从视窗顶部开始渲染。
      通过取模运算,我们可以确保第一个渲染的列表项总是从视窗顶部开始,提高了定位的精确性
      */
      this.startOffset = scrollTop - (scrollTop % this.rowHeight);
      this.$emit("update:visibleRange", {
        startIndex: this.startIndex,
        endIndex: this.endIndex,
      });
    },
  },
};
</script>

<style scoped lang="less">
.virtual-scroll {
  overflow: auto;
}
.list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
</style>
