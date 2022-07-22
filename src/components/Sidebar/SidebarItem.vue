<template>
  <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.name">
    <template #title>
      <el-icon v-if="menu.icon">
        <component :is="menu.icon" />
      </el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <SidebarItem :menu="item" v-for="item in menu.children" :key="item.path" />
  </el-sub-menu>
  <el-menu-item v-else :index="menu.name" @click="onClick(menu)">
    <el-icon v-if="menu.icon">
      <component :is="menu.icon" />
    </el-icon>
    <template #title>{{ menu.title }}</template>
  </el-menu-item>
</template>

<script lang="ts">

interface Menu {
  name: string
  title?: string
  icon?: string
  children?: Array<Menu>
}

export default {
  name: "SidebarItem",
  setup(_props,{attrs}) {
    let menu = attrs.menu
    // console.log(props,attrs)
    function onClick(menu: Menu) {
      console.log(menu);
    }
    return {
      onClick,
      menu
    };
  },
  components: {},
};
</script>
