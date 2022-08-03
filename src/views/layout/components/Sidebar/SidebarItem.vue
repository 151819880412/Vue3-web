<template>
    <!-- 有子节点渲染这个 -->
    <el-sub-menu :index="menu.path" v-if="menu?.children">
      <template #title>
        <el-icon v-html="menu.icon"></el-icon>
        <span>{{ menu?.title }}</span>
      </template>
      <!-- 递归调用本身，该组件在index.ts中全局注册了 -->
      <SidebarItem
        v-for="item in menu.children"
        :menu="item"
        :isCollapse="isCollapse"
        :key="item.path"
      />
    </el-sub-menu>
    <!-- 没有子节点渲染这个 -->
    <el-menu-item v-else :index="menu?.path" @click="skip(menu)">
      <el-icon v-html="menu?.icon"></el-icon>
      <span>{{ menu?.title }}</span>
    </el-menu-item>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "SidebarItem",
  props: {
    isCollapse: {
      type: Boolean,
    },
    menu: {
      type: Object,
    },
  },

  setup(props) {
    const router = useRouter();
    console.log(props);
    const menu = reactive(props);
    const menuRefs = toRefs(menu);

    let skip = (menu) => {
      console.log(menu);
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
