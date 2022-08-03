<template>
  <div class="header">
    <el-icon class="elIcons" @click="closeSidebarNav"><Fold /></el-icon>
  </div>
</template>

<script lang='ts'>
import { SidebarActionTypes } from '@/store/modules/sidebar/action-types';
import { defineComponent} from 'vue'
import {  useStore } from 'vuex';
export default defineComponent({
   // eslint-disable-next-line vue/multi-word-component-names
   name: 'Header',
   props: [],
   setup() {
    const store = useStore()
     let closeSidebarNav = ()=>{
      store.dispatch(SidebarActionTypes.ACTION_SIDEBAR)
     }

     return {
        closeSidebarNav,
      }
   }
})
</script>
<style lang='stylus' scoped>
.header{
  height 40px
  line-height:40px

}
.elIcons{
  font-size:30px;
  margin-top: 5px
  cursor pointer
}
</style>