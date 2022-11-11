<template>
  <div class='config'>
    <el-tooltip class="box-item" effect="dark" content="项目配置" placement="bottom-end">
      <i class="iconfont icon-shezhi" @click="toConfig"/>
    </el-tooltip>
    <ProjectConfig ref="projectConfig"/>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import ProjectConfig from '@/components/ProjectConfig/ProjectConfig.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'config',
  props: [],
  setup() {
    const projectConfig = ref<InstanceType<typeof ProjectConfig>>();
    const toConfig = ()=>{
      projectConfig.value?.openDrawer()
    }
    return {
      toConfig,
      projectConfig
    };
  },
  components:{
    ProjectConfig
  }
});
</script>
<style lang='stylus' scoped>
.iconfont{
  font-size:22px;
  cursor pointer
}
.config:hover {
  background: var(--el-fill-color)
}
</style>