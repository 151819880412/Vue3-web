<template>
  <div class='crumbs'>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">部门</a></el-breadcrumb-item>
      <el-breadcrumb-item>人员</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Crumbs',
  props: [],
  setup() {
    return {
    };
  }
});
</script>
<style lang='stylus' scoped>
.crumbs{
  margin-left: 22px
}
</style>