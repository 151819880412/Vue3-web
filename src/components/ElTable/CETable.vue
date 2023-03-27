<template>
  <div class='CETable'>
    <el-table v-bind="ceTable" style="width: 100%">
    <el-table-column v-for="item in ceTable.column" :key="item.ceId" v-bind="ceTable.column" />
  </el-table>
  </div>
</template>

<script lang='ts'>
interface CETableModel<T> {
  ceTable: CETableProps<T>;
}

import { CETable, CETableProps } from '@/@types/CETable/CETable';
import { reactive,toRefs,getCurrentInstance,defineComponent,ComponentInternalInstance,ToRefs} from 'vue'
export default defineComponent({
   name: 'CETable',
   props: [],
   setup() {
     const ctx:ComponentInternalInstance | null = getCurrentInstance()
     console.log(ctx)

    const initState = <T>(): CETableModel<T> => {
      // 函数体
      return {
        ceTable: new CETable(),
      };
    };
     const model:CETableModel<any> = reactive(initState());
     let data: ToRefs<CETableModel<any>> = toRefs(model);
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