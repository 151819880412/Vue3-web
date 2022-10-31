<template>
  <div class='fullScreen'>
    <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom-end">
      <i class="iconfont icon-quanping_o" />
    </el-tooltip>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'fullScreen',
  props: [],
  setup() {
    return {
    };
  }
});
</script>
<style lang='stylus' scoped>
.iconfont{
  font-size:22px;
  cursor pointer
}
.fullScreen:hover {
  background: var(--el-color-primary-light-9)
}
</style>