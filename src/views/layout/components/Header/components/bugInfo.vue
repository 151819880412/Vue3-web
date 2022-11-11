<template>
  <div class='bugInfo'>
    <el-tooltip class="box-item" effect="dark" content="错误日志" placement="bottom-end">
      <i class="iconfont icon-bug" />
    </el-tooltip>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'bugInfo',
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
.bugInfo:hover {
    background: var(--el-fill-color)
}
</style>