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
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch} from "vue";
import SidebarNav from "./components/Sidebar/Sidebar.vue";
import Header from "./components/Header/Header.vue";
import { useState } from "@/utils/useState";


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
    return{
      width,
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
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #B3C0D1;
}
.el-aside {
  background-color: #304156;
  transition: width 0.28s;
}
.appLayout{
  width:100%
}

</style>
