<!-- src\layout\AppLayout.vue -->
<template>
  <transition name="fade-bottom" mode="out-in" v-if="useLockInfo?.isLock">
    <LockPage >{{useLockInfo?.isLock}}</LockPage>
  </transition>
  <div class="common-layout" v-bind="lockEvents" v-else>
    <el-container>
      <el-aside :width="width" class="aside">
        <SidebarNav />
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main class="main">
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
import { computed, defineComponent } from "vue";
import SidebarNav from "./components/Sidebar/Sidebar.vue";
import Header from "./components/Header/Header.vue";
// import { useState } from "@/utils/useState";
import { setThemeColor } from "@/utils";
import { Persistent } from "@/utils/cache/persistent";
import { PROJ_CFG_KEY } from "@/enums/cacheEnum";
import { ProjectConfig } from "#/config";
import { useAppStoreWithOut } from "@/piniaStore/modules/app";
import { useLockPage } from "../hooks/useLockPage";
import { useLockStore } from "@/piniaStore/modules/lock";
import LockPage from "@/components/LockPage/LockPage.vue";
import { useWatermark } from "@/utils/watermark";


export default defineComponent({
  name: "sidebarNav",
  props: [],
  setup() {
    // let width = ref('200px');
    // 设置侧边栏宽度
    // const sidebar: any = useState(['sidebar']);
    // let sidebarState = reactive(sidebar);
    // watch(sidebarState, (newValue,) => {
    //   if (newValue.sidebar.isCollapse) {
    //     width.value = '70px';
    //   } else {
    //     width.value = '200px';
    //   }
    // });

    // 设置明亮/暗黑主题
    const appStore = useAppStoreWithOut();
    const toggle: (value?: boolean | undefined) => boolean = appStore.setDarkMode();
    // 设置主题色
    setThemeColor(Persistent.getLocal<ProjectConfig>(PROJ_CFG_KEY)?.themeColor || '#0084f4');

    // 设置侧边栏宽度
    // watch(appStore.getProjectConfig.menuSetting, (newValue) => {
    //   if (newValue.collapsed) {
    //     width.value = '70px';
    //   } else {
    //     width.value = '200px';
    //   }
    // });
    const width = computed(() => appStore.getProjectConfig.menuSetting.collapsed?'70px':'200px')

    // 锁屏
    const lockEvents = useLockPage();
    const useLock = useLockStore()
    const useLockInfo = computed(() => useLock.getLockInfo)

    // 水印
    const watermark = useWatermark();
    appStore.getProjectConfig.showWatermark && watermark.setWatermark('请勿外传')

    return {
      toggle,
      width,
      lockEvents,
      useLockInfo
    };
  },
  components: {
    // Loading
    SidebarNav,
    Header,
    LockPage,
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
.main{
  background: var(--el-bg-color-page)
  padding 1rem
}
.main div{
  background-color: var(--el-bg-color);
}
.el-aside {
  background-color: #304156;
  transition: width 0.28s;
}
.appLayout{
  width:100%
  height: 100%
  box-sizing:border-box
}

</style>
