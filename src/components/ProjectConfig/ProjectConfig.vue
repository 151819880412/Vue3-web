<template>
  <div class='ProjectConfig'>
    <el-drawer v-model="drawer" title="项目配置" direction="rtl" :size="330">

      <!-- 主题 -->
      <Theme />

      <!-- 系统主题 -->
      <SystemTheme />

      <!-- 界面功能 -->
      <InterfaceFunction />



    </el-drawer>
  </div>
</template>

<script lang='ts'>
interface ProjectConfigType {
  drawer: boolean;
}
import { defineComponent, reactive, ToRefs, toRefs } from 'vue';

import Theme from './components/theme.vue';
import SystemTheme from './components/systemTheme.vue';
import InterfaceFunction from './components/interfaceFunction.vue';

export default defineComponent({
  name: 'ProjectConfig',
  props: [],
  setup() {

    const initState = (): ProjectConfigType => {
      return {
        drawer: false,
      };
    };
    const projectConfigModel = reactive<ProjectConfigType>(initState());
    let projectConfigData: ToRefs<ProjectConfigType> = toRefs(projectConfigModel);

    const openDrawer = () => {
      projectConfigModel.drawer = !projectConfigModel.drawer;
    };

    return {
      initState,
      ...projectConfigData,
      openDrawer,
    };
  },
  components: {
    Theme,
    SystemTheme,
    InterfaceFunction,
  }
});
</script>
<style lang='stylus' scoped>
.ProjectConfig{
cursor: default
}
</style>