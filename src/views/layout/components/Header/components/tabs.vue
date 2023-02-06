<template>
  <div class="headerTabs">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane v-for="item in editableTabs" :key="item.path" :label="item.name" :name="item.path">
      </el-tab-pane>
    </el-tabs>
    <div>
      {{ editableTabsValue }}
    </div>
  </div>

</template>

<script lang='ts'>
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
import { computed, defineComponent, } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'tabs',
  props: [],
  setup() {
    const appStore = useAppStoreWithOut();
    const router = useRouter();


    const editableTabsValue = computed(() => appStore.getProjectConfig.menuSetting.defaultActive);
    const editableTabs = computed(() => appStore.getTabsSetting);

    const removeTab = (targetName: string) => {
      const arr = editableTabs.value.filter(item => item.path !== targetName);
      appStore.setTabs(arr);
      if (targetName === editableTabsValue.value) {
        router.push({
          path: editableTabs.value[editableTabs.value.length - 1].path
        });
      }
    };

    const tabClick = ({ props }) => {
      router.push({
        path: props.name
      });
    };

    return {
      removeTab,
      editableTabsValue,
      editableTabs,
      tabClick,
    };
  }
});
</script>
<style lang='stylus' scoped>
/deep/.el-tabs__header{
  height: 28px
  line-height 28px
  margin: 0
  // border-bottom: 1px solid #e5e7eb
}
/deep/.el-tabs__item{
  height: 28px
  line-height 28px
}
.headerTabs{
  border-top 1px solid var(--el-bg-color-page)
  border-right 1px solid var(--el-bg-color-page)
  display: flex
  .el-tabs{
    display: flex
    flex: auto
  }
}
/deep/.el-tabs__nav .el-tabs__item:first-child:hover{
  padding-left: 20px !important
  padding-right: 20px !important
}
/deep/.el-tabs__nav .el-tabs__item:first-child .el-icon{
  width: 0 !important
}
</style>