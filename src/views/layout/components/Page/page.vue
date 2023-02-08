<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition :name="
        getTransitionName({
          route,
          openCache: true,
          enableTransition: true,
          cacheTabs: [],
          def: 'fade-slide',
        })
      " mode="out-in" appear>
        <keep-alive v-if="true" :include="[]">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <div v-else :key="route.fullPath">
          <component :is="Component" :key="route.fullPath" />
        </div>
      </transition>
    </template>
  </RouterView>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { getTransitionName } from './transition';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'page',
  props: [],
  setup() {
    return {
      getTransitionName
    };
  }
});
</script>
<style lang='stylus' scoped>
</style>