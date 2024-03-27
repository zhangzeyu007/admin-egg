<!--
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2021-03-08 16:45:31
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-27 15:59:16
 * @FilePath: \admin-egg\front\src\views\user\userRole.vue
-->
<template>
  <div class="userRole">
    <div class="list">
      <div draggable="true" class="item">1</div>
      <div draggable="true" class="item">2</div>
      <div draggable="true" class="item">3</div>
      <div draggable="true" class="item">4</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const list = document.querySelector(".list");
      console.log(list, "list");
      let sourseNode;
      list.ondragstart = (e) => {
        setTimeout(() => {
          e.target.classList.add("moveing");
        }, 0);
        sourseNode = e.target;
      };

      list.ondragover = (e) => {
        e.preventDefault();
      };
      list.ondragenter = (e) => {
        e.preventDefault();
        if (e.target === list || e.target === sourseNode) {
          return;
        }
        const children = [...list.children];
        console.log(children, "children");
        const sourseIndex = children.indexOf(sourseNode);
        const targetIndex = children.indexOf(e.target);
        console.log(sourseIndex, targetIndex);
        if (sourseIndex < targetIndex) {
          console.log("下方");
          list.insertBefore(sourseNode, e.target.nextElementSibling);
        } else {
          console.log("上方");
          list.insertBefore(sourseNode, e.target);
        }
      };
      list.ondragend = (e) => {
        e.target.classList.remove("moveing");
      };
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  .item {
    width: 100%;
    height: 50px;
    background: rgb(108, 199, 232);
    margin: 10px 20px;
  }
  .item.moveing {
    background: transparent;
    color: transparent;
    border: 2px dashed #000;
  }
}
</style>
