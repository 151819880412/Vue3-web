<template>
  <el-dropdown ref="dropdown1" trigger="hover" class="userInfoDrop">
    <div class="userInfo">
      <el-avatar class="useerImage" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <span class="userName">管理员</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon>
            <Lock />
          </el-icon>
          <span>锁定屏幕</span>
        </el-dropdown-item>
        <el-dropdown-item @click="toLogin">
          <el-icon>
            <SwitchButton />
          </el-icon>
          <span>退出系统</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'userInfo',
  props: [],
  setup() {
    const router = useRouter();
    const toLogin = () => {
      router.push({
        path: '/login'
      });
    };
    return {
      toLogin
    };
  }
});
</script>
<style lang='stylus' scoped>
.userInfoDrop{
  flex: auto !important
}
.userInfo{
  flex: auto !important
  min-height: 100%
  display: flex
  align-items: center
  justify-content: center;
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