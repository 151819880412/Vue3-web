<template>
  <div class="header">
    <div class="headerLeft">
      <i class="iconfont" @click="closeSidebarNav"
        :class="sidebar.isCollapse?'icon-shousuocaidan-copy':'icon-shousuocaidan'" />
      <Crumbs />
    </div>
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
import { SidebarActionTypes } from '@/store/modules/sidebar/action-types';
import { useState } from '@/utils/useState';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Crumbs from './components/crumbs.vue';
import Tabs from './components/tabs.vue';
import BugInfo from './components/bugInfo.vue';
import Badge from './components/badge.vue';
import FullScreen from './components/fullScreen.vue';
import Translate from './components/translate.vue';
import UserInfo from './components/userInfo.vue';
import Config from './components/config.vue';



export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  props: [],
  setup() {



    const sidebar: any = useState(["sidebar"]);

    const store = useStore();
    let closeSidebarNav = () => {
      store.dispatch(SidebarActionTypes.ACTION_SIDEBAR);
    };

    return {
      closeSidebarNav,
      ...sidebar,
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
  padding: 0 1rem
  box-sizing:border-box
}
.headerLeft,.headerRight{
  height: 100%
  min-width: 300px
  display: flex
  align-items: center;
}
.headerRight div{
  flex:1
  height: 100%
  align-items: center;
  justify-content: center
  display: flex
}
.iconfont{
  font-size:22px;
  cursor pointer
}
</style>