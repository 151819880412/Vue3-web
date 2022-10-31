<!-- src\layout\AppLayout.vue -->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="width" class="aside">
        <SidebarNav />
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view class="appLayout" />
        </el-main>
      </el-container>

      <!-- <el-header><SidebarNav /></el-header>
      <el-main><el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view class="appLayout" />
        </el-main></el-main> -->


    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch} from "vue";
import SidebarNav from "./components/Sidebar/Sidebar.vue";
import Header from "./components/Header/Header.vue";
import { useState } from "@/utils/useState";
import { useDark, useToggle } from '@vueuse/core';


export default defineComponent({
  name: "sidebarNav",
  props: [],
  setup() {
    const sidebar:any = useState(['sidebar'])
    let width = ref('200px')
    let sidebarState = reactive(sidebar)
    watch(sidebarState, (newValue,) => {
      if(newValue.sidebar.isCollapse){
        width.value = '70px'
      }else{
        width.value = '200px'
      }
    });
    const isDark = useDark({
      // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
      storageKey: 'useDarkKEY',
      // 暗黑class名字
      valueDark: 'dark',
      // 高亮class名字
      valueLight: 'light',
    });

    const toggle = useToggle(isDark);
    return{
      width,
      toggle,
    }
  },
  components: {
    // Loading
    SidebarNav,
    Header
  },
});
</script>

<style scoped lang="stylus">
.common-layout{
  // background: #f0f2f5  
}
.el-container {
  height: 100vh;
}
.el-header {
  // background-color: white;
  padding 0
  height: 80px
}
.el-main{
  padding:0  
}
.el-aside {
  background-color: #304156;
  transition: width 0.28s;
}
.appLayout{
  width:100%
  height: 100%
  padding 1rem
  box-sizing:border-box
}

</style>
