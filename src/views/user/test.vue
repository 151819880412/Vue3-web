<template>
  <div class='test'>
    {{ a.name }}
    <input v-model="a.name" />
    <el-button @click="aaa">aaa</el-button>
  </div>
</template>

<script lang='ts'>

import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'test',
  props: [],
  setup() {
    const a:any = reactive({
      
    })
    const aaa = () => {
      a.name = '123';
    };
    const qweqwe = ()=>{

    }
    return {
      a,
      aaa,
      qweqwe
    };
  }
});
</script>
<style lang='stylus' scoped>
</style>