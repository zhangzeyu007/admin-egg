<template>
  <div>
    首页
    <img class="logo" src="../assets/image/logo.png" alt="" />
    <h1>你还哦啊</h1>
    <div>你还哦啊你还哦啊</div>
    <div>你还哦啊你还哦啊</div>
    <div>你还哦啊你还哦啊</div>
    <div>你还哦啊你还哦啊</div>
    <div>你还哦啊你还哦啊</div>
    <div>你还哦啊你还哦啊</div>
    <div>你还哦啊你还哦啊</div>
    <div>你还哦啊你还哦啊</div>
    <div>你还哦啊你还哦啊</div>
    <div v-for="item in res" :key="item.id">{{ item.title }}</div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch<{ data: any }>(
  "http://localhost:7001/editor/ssr",
  { method: "POST", body: { pageNum: 1, total: 10, pageSize: 10 } }
);
const res = data.value?.data.page;
</script>

<style>
.logo {
  width: 100px;
  height: 100px;
}
</style>
