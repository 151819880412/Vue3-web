<template>
  <div class="headerTabs">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="item in editableTabs" :key="item.path" :label="item.title" :name="item.path">
      </el-tab-pane>
    </el-tabs>
    <div>
      111
    </div>
  </div>

</template>

<script lang='ts'>
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'tabs',
  props: [],
  setup() {
    const appStore = useAppStoreWithOut();

    let tabIndex = 2;
    const editableTabsValue = ref('2');
    console.log(111,appStore.getProjectConfig)
    const editableTabs = appStore.getProjectConfig.tabs

    const addTab = (targetName: string) => {
      console.log(targetName);
      const newTabName = `${++tabIndex}`;
      editableTabs.value.push({
        title: 'New Tab',
        path: newTabName,
      });
      editableTabsValue.value = newTabName;
    };
    const removeTab = (targetName: string) => {
      const tabs = editableTabs.value;
      let activeName = editableTabsValue.value;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.path === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.path;
            }
          }
        });
      }

      editableTabsValue.value = activeName;
      editableTabs.value = tabs.filter((tab) => tab.path !== targetName);
    };

    return {
      addTab,
      removeTab,
      editableTabsValue,
      editableTabs,
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