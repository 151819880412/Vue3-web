<template>
  <div class="header">
    <div class="headerLeft">
      <i class="iconfont" @click="closeSidebarNav"
        :class="collapsed?'icon-shousuocaidan-copy':'icon-shousuocaidan'" />
      <Crumbs/>
    </div>
    {{projectConfig}}
    <div class="headerRight">
      <BugInfo />
      <Badge />
      <FullScreen />
      <Translate />
      <UserInfo />
      <Config />
    </div>
  </div>
  <Tabs />
</template>

<script lang='ts'>
// import { SidebarActionTypes } from '@/store/modules/sidebar/action-types';
// import { useState } from '@/utils/useState';
import {  computed, defineComponent, ref } from 'vue';
// import { useStore } from 'vuex';
import Crumbs from './components/crumbs.vue';
import Tabs from './components/tabs.vue';
import BugInfo from './components/bugInfo.vue';
import Badge from './components/badge.vue';
import FullScreen from './components/fullScreen.vue';
import Translate from './components/translate.vue';
import UserInfo from './components/userInfo.vue';
import Config from './components/config.vue';
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
// import { Persistent } from '@/utils/cache/persistent';
// import { PROJ_CFG_KEY } from '@/enums/cacheEnum';
// import { ProjectConfig } from '#/config';
// import { storeToRefs  } from 'pinia'


export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  props: [],
  setup() {
    const appStore = useAppStoreWithOut();
    let collapsed = ref(appStore.getProjectConfig.menuSetting.collapsed)


    // 方式一:使用vuex管理状态
    // const sidebar: any = useState(["sidebar"]);
    // const store = useStore();
    // store.dispatch(SidebarActionTypes.ACTION_SIDEBAR);

    // 方式二:使用pinia管理状态
    // const appStore = useAppStoreWithOut();
    // appStore.setProjectConfig({menuSetting:{collapsed: !collapsed}})
    // const collapsed = storeToRefs(appStore)

    // 方式三:使用自定义Persistent类管理状态
    // Persistent.setLocal(PROJ_CFG_KEY, {menuSetting:{collapsed: !collapsed}})
    // collapsed = Persistent.getLocal<ProjectConfig>(PROJ_CFG_KEY)?.menuSetting.collapsed ||false

    let closeSidebarNav = () => {
      appStore.setProjectConfig({menuSetting:{collapsed: !collapsed.value}})
      collapsed.value = appStore.getProjectConfig.menuSetting.collapsed

    };
    return {
      closeSidebarNav,
      // ...sidebar,
      collapsed,
      projectConfig: computed(() => appStore.getProjectConfig),

    };
  },
  components: {
    Crumbs,
    Tabs,
    BugInfo,
    Badge,
    FullScreen,
    Translate,
    UserInfo,
    Config,
  }
});
</script>
<style lang='stylus' scoped>
.header{
  height 50px
  width: 100%
  display: flex
  justify-content:space-between
  padding: 0 0 0 1rem
  box-sizing:border-box
}
.headerLeft,.headerRight{
  min-height: 100%
  min-width: 300px
  display: flex
  align-items: center;
}
.headerRight div{
  flex:1
  min-height: 100%
  align-items: center;
  justify-content: center
  display: flex
  cursor pointer
}
.iconfont{
  font-size:22px;
  cursor pointer
}
</style>