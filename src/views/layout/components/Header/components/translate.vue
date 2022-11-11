<template>
  <div class='translate'>
    <el-tooltip class="box-item" effect="dark" content="翻译" placement="bottom-end">
      <i class="iconfont icon-fanyi" />
    </el-tooltip>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'translate',
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
}
.translate:hover {
  background: var(--el-fill-color)
}
</style>