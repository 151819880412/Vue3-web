<template>
  <div>
    <el-menu class="menus" :collapse="collapsed" @open="handleOpen" @close="handleClose" background-color="#304156"
      text-color="#bfcbd9" :unique-opened="true" active-text-color="#409EFF" :collapse-transition="false"
      :default-active="defaultActive" mode="vertical">
      <SidebarItem v-for="item in navs" :key="item.path" :menu="item" :index="item.path" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import SidebarItem from "./SidebarItem.vue";

import { computed, defineComponent } from "vue";
// import { useState } from "@/utils/useState";
// import useDefaultActiveStore from "@/piniaStore/defaultActive";
import { usePermissionStoreWithOut } from "@/piniaStore/modules/permission";
import { AppRouteRecordRaw } from "@/router/types";
import { useAppStoreWithOut } from "@/piniaStore/modules/app";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sidebar",
  props: [],
  setup() {
    const permissionStore = usePermissionStoreWithOut();
    const navs: AppRouteRecordRaw[] = permissionStore.getMenuList;

    // 默认展示页面
    // const store = useDefaultActiveStore();
    // const sidebar: any = useState(["sidebar"]);
    // console.log(sidebar);

    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    const appStore = useAppStoreWithOut();

    return {
      handleOpen,
      handleClose,
      navs,
      // ...sidebar,
      // defaultActive: computed(() => store.defaultActive),
      defaultActive: computed(() => appStore.getProjectConfig.menuSetting.defaultActive),
      collapsed: computed(() => appStore.getProjectConfig.menuSetting.collapsed),
    };
  },
  components: {
    SidebarItem,
  },
});
</script>
<style lang="stylus" scoped>
.menus{
  transition: width 0.28s;
  border: 0
}
</style>
