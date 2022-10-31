<template>
  <div class='badge'>
    <el-badge is-dot class="item">
      <el-tooltip class="box-item" effect="dark" content="消息提醒" placement="bottom-end">
        <i class="iconfont icon-xiaoxizhongxin" />
      </el-tooltip>
    </el-badge>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'badge',
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
.badge:hover {
  background: var(--el-color-primary-light-9)
}
</style>