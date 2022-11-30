<template>
  <div class='crumbs'>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in routes" :key="item.path">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang='ts'>
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
import { usePermissionStoreWithOut } from '@/piniaStore/modules/permission';
import { Menu } from '@/router/types';
import { defineComponent, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { getAllParentPath } from '@/router/helper/menuHelper';
import type { RouteLocationMatched } from 'vue-router';
import { filter } from '@/utils/helper/treeHelper';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Crumbs',
  props: [],
  setup() {
    const permissionStore = usePermissionStoreWithOut();
    const navs: Menu[] = permissionStore.getMenuList;
    const appStore = useAppStoreWithOut();
    const menu = appStore.getMenuSetting;
    const routes = ref<RouteLocationMatched[]>([]);

    const { currentRoute } = useRouter();

    function getMatched(menus: Menu[], parent: string[]) {
      const metched: Menu[] = [];
      menus.forEach((item) => {
        if (parent.includes(item.path)) {
          metched.push({
            ...item,
            name: item.meta?.title || item.name,
          });
        }
        if (item.children?.length) {
          metched.push(...getMatched(item.children, parent));
        }
      });
      return metched;
    }

    function filterItem(list: RouteLocationMatched[]) {
      return filter(list, (item) => {
        const { meta, name } = item;
        if (!meta) {
          return !!name;
        }
        const { title, hideBreadcrumb, hideMenu } = meta;
        if (!title || hideBreadcrumb || hideMenu) {
          return false;
        }
        return true;
      }).filter((item) => !item.meta?.hideBreadcrumb);
    }

    watchEffect(async () => {
      const parent = getAllParentPath(navs, menu.defaultActive);
      const filterMenus = navs.filter((item) => item.path === parent[0]);
      const matched = getMatched(filterMenus, parent) as any;

      if (!matched || matched.length === 0) return;

      const breadcrumbList = filterItem(matched);
      if (currentRoute.value.meta?.currentActiveMenu) {
        breadcrumbList.push({
          ...currentRoute.value,
          name: currentRoute.value.meta.title || currentRoute.value.name,
        } as unknown as RouteLocationMatched);
      }
      routes.value = breadcrumbList;
    });
    return {
      routes
    };
  }
});
</script>
<style lang='stylus' scoped>
.crumbs{
  margin-left: 22px
}
</style>