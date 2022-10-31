<template>
  <div class='ProjectConfig'>
    <el-drawer v-model="drawer" title="项目配置" direction="rtl">
      <Theme/>
      

    </el-drawer>
  </div>
</template>

<script lang='ts'>
interface ProjectConfigType {
  drawer: boolean;
}
import { defineComponent, reactive, ToRefs, toRefs } from 'vue';

import Theme from './components/theme.vue'

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
    Theme
  }
});
</script>
<style lang='stylus' scoped>

</style>