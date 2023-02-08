<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition :name="
        getTransitionName({
          route,
          openCache,
          enableTransition: true,
          cacheTabs: [],
          def: 'fade-slide',
        })
      " mode="out-in" appear>
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <div v-else :key="route.fullPath">
          <component :is="Component" :key="route.fullPath" />
        </div>
      </transition>
    </template>
  </router-view>
</template>

<script lang='ts'>
import { ComputedRef, computed, defineComponent, unref } from 'vue';
import { useAppStore } from '@/piniaStore/modules/app';
import { getTransitionName } from './transition';
import { SideBarItemType } from '@/api/login/model/menuModel';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'PageLayout',
  props: [],
  setup() {
    const appStore = useAppStore();

    const openCache = computed(() => appStore.getProjectConfig.openKeepAlive);
    const tabList: ComputedRef<SideBarItemType[]> = computed(() => appStore.getTabsSetting);

    const getCaches = computed((): string[] => {
      if (!unref(computed(() => appStore.getProjectConfig.openKeepAlive).value)) {
        return [];
      }
      const arr: string[] = [];
      tabList.value.forEach(item => {
        arr.push(item.name);
      });
      return arr;
    });
    return {
      getTransitionName,
      openCache,
      getCaches,
    };
  }
});
</script>
<style lang='stylus' scoped>
</style>