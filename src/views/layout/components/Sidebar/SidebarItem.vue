<template>
  <!-- 有子节点渲染这个 -->
  <el-sub-menu :index="menu.path" v-if="menu.children&&menu.children?.length>0">
    <template #title>
      <el-icon>
        <component :is="menu.icon"></component>
      </el-icon>
      <span>{{ menu.meta?.title }}</span>
    </template>
    <!-- 递归调用本身，该组件在index.ts中全局注册了 -->
    <SidebarItem v-for="item in menu.children" :menu="item" :key="item.path" />
  </el-sub-menu>
  <!-- 没有子节点渲染这个 -->
  <el-menu-item v-else :index="menu.path" @click="skip(menu)">
    <el-icon>
      <component :is="menu.icon"></component>
    </el-icon>
    <span>{{ menu.meta?.title }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import { AppRouteRecordRaw } from "@/router/types";
import { reactive, toRefs, defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SidebarItem",
  props: {
    menu: {
      type: Object as PropType<AppRouteRecordRaw>,
      required: true
    },
  },

  setup(props) {
    const router = useRouter();
    // console.log(props);
    const menu = reactive(props);
    const menuRefs = toRefs(menu);

    let skip = (menu: AppRouteRecordRaw) => {
      // console.log(menu);
      router.push({
        path: menu.path,
      });
    };
    return {
      ...menuRefs,
      skip,
    };
  },
});
</script>
<style lang="stylus" scoped></style>
