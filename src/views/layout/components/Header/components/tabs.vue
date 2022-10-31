<template>
  <!-- <div style="margin-bottom: 20px">
    <el-button size="small" @click="addTab(editableTabsValue)">
      add tab
    </el-button>
  </div> -->
  <el-tabs v-model="editableTabsValue" type="card" class="headerTabs" closable @tab-remove="removeTab" >
    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      <!-- {{ item.content }} -->
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'tabs',
  props: [],
  setup() {

    let tabIndex = 2;
    const editableTabsValue = ref('2');
    const editableTabs = ref([
      {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
      },
      {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
      },
    ]);

    const addTab = (targetName: string) => {
      console.log(targetName);
      const newTabName = `${++tabIndex}`;
      editableTabs.value.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      });
      editableTabsValue.value = newTabName;
    };
    const removeTab = (targetName: string) => {
      const tabs = editableTabs.value;
      let activeName = editableTabsValue.value;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      editableTabsValue.value = activeName;
      editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
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
  border-top 1px solid #e4e7ed
  border-right 1px solid #e4e7ed
}
</style>