<template>
  <div>
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container">
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        class="herder-tabs"
        closable
        @edit="handleTabsEdit"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "Tags",
  props: [],
  setup() {
    let tabIndex = 2;
    const editableTabsValue = ref("2");
    const editableTabs = ref([
      {
        title: "Tab 1",
        name: "1",
        content: "Tab 1 content",
      },
      {
        title: "Tab 2",
        name: "2",
        content: "Tab 2 content",
      },
    ]);

    const handleTabsEdit = (targetName: string, action: "remove" | "add") => {
      console.log(targetName)
      if (action === "add") {
        const newTabName = `${++tabIndex}`;
        editableTabs.value.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        editableTabsValue.value = newTabName;
      } else if (action === "remove") {
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
      }
    };

    return {
      handleTabsEdit,
      editableTabsValue,
      editableTabs,
    };
  },
});
</script>
<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.herder-tabs /deep/.el-tabs__nav-scroll{
  box-sizing: border-box;
}
</style>
