<template>
  <div class='userInfo'>
    <el-avatar class="useerImage" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <span class="userName">管理员</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'userInfo',
  props: [],
  setup() {
    return {
    };
  }
});
</script>
<style lang='stylus' scoped>
.userInfo{
  flex: auto !important
}
.useerImage{
  width 20px
  height 20px
}
.userName{
  margin-left: 12px
}
.userInfo:hover {
  background: var(--el-fill-color)
}
</style>