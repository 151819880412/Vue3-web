<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <SidebarItem :menu="menu" v-for="menu in menus" :key="menu.name" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import SidebarItem from "@/components/Sidebar/SidebarItem.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "SidebarMenu",
  setup() {
    const isCollapse = false;
    const menus = [
      {
        name: "1",
        title: "1",
        icon: "location",
        children: [
          {
            title: "2",
            name: "2",
            children: [
              {
                title: "3",
                name: "3",
                children: [
                  {
                    title: "4",
                    name: "4",
                    children: [
                      {
                        title: "5",
                        name: "5",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    const defaultActive = "/a";
    function handleOpen() {}
    function handleClose() {}
    return {
      isCollapse,
      menus,
      defaultActive,
      handleOpen,
      handleClose,
    };
  },
  components: {
    SidebarItem,
  },
});
</script>

<style lang="stylus" scoped>
.scrollbar-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-menu {
  border: 0;
}
:deep(.el-scrollbar__view) {
  height: 100% !important;
}
</style>
