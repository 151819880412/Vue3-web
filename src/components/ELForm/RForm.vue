<template>
  <div class='RForm'>RForm</div>
  <el-input suffix-icon="Search"></el-input>
</template>

<script lang='ts'>
import { defineComponent, } from 'vue';
import renderHooks from "./render";

export default defineComponent({
  setup(props, { slots }) {
    console.log(props, slots);

    const {
      render
    } = renderHooks();

    return () => render({ modelValue: 'inputValue', onBlur: () => { console.log(111); } });
  }
});
</script>
<style lang='stylus' scoped>
</style>