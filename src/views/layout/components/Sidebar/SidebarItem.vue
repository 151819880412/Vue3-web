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
import { SideBarItemType } from "@/api/login/model/menuModel";
import { useAppStoreWithOut } from "@/piniaStore/modules/app";
import { reactive, toRefs, defineComponent, PropType, computed, ComputedRef } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SidebarItem",
  props: {
    menu: {
      type: Object as PropType<SideBarItemType>,
      required: true
    },
  },

  setup(props) {
    const router = useRouter();
    const menu = reactive(props);
    const menuRefs = toRefs(menu);
    const appStore = useAppStoreWithOut();
    const menuTabs: ComputedRef<SideBarItemType[]> = computed(() => appStore.getTabsSetting);

    // MenuPageModel
    let skip = (menu: SideBarItemType) => {
      if (menuTabs.value.filter(item => item.path === menu.path).length === 0) {
        appStore.setTabs(menu)
      }
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
