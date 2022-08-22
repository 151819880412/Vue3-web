<template>
  <div>
    <el-menu class="menus" :collapse="sidebar.isCollapse" @open="handleOpen" @close="handleClose"
      background-color="#304156" text-color="#bfcbd9" :unique-opened="true" active-text-color="#409EFF"
      :collapse-transition="false" :default-active="defaultActive" mode="vertical">
      <SidebarItem :isCollapse="isCollapse" v-for="item in navs" :key="item.path" :menu="item" :index="item.path" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import SidebarItem from "./SidebarItem.vue";

import { computed, defineComponent, ref } from "vue";
import { useState } from "@/utils/useState";
import useDefaultActiveStore from "@/piniaStore/defaultActive";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Sidebar",
  props: [],
  setup() {
    const store = useDefaultActiveStore()
    const sidebar: any = useState(["sidebar"]);
    console.log(sidebar);
    const isCollapse = ref(false);
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const navs = [
      {
        title: "权限",
        icon: '<span class="iconfont icon-zhanghaoquanxianguanli"/>',
        inSide: true,
        name: "Auth",
        path: "/auth",
        children: [
          {
            title: "用户",
            icon: '<span class="iconfont icon-yonghu"/>',
            inSide: true,
            name: "User",
            path: "/user",
          },
          {
            title: "角色",
            icon: '<span class="iconfont icon-jiaose"/>',
            inSide: true,
            name: "Role",
            path: "/role",
          },
        ],
      },
    ];

    return {
      isCollapse,
      handleOpen,
      handleClose,
      navs,
      ...sidebar,
      defaultActive: computed(() => store.defaultActive),
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
