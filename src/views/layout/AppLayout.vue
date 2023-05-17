<template>
  <div class='AppLayout'>111</div>
</template>

<script lang='ts'>
interface AppLayout {
}
import { reactive,toRefs,defineComponent,ToRefs} from 'vue'
export default defineComponent({
   name: 'AppLayout',
   props: [],
   setup() {

     const initState = (): AppLayout => {
       return {
       };
     };
     const model:AppLayout = reactive(initState());
     let data: ToRefs<AppLayout> = toRefs(model);
     let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
     }
     return {
       ...data,
       resetState
      }
   }
})
</script>
<style lang='stylus' scoped>
</style>