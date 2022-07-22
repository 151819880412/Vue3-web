<!-- src\layout\AppLayout.vue -->
<template>
  <el-container>
    <el-aside width="200px"> Aside </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
        <Loading></Loading>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  // components: {
  //   Loading
  // },
</script>

<style scoped lang="stylus">
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #B3C0D1;
}
.el-aside {
  width: auto;
  background-color: #304156;
}
.el-main {
  background-color: #E9EEF3;
}
</style>
