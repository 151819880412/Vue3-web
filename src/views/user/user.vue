<template>
  <div class='user'>
    <RForm />
    <ElInput :prefix-icon="bbb" :suffix-icon="sun" />
    <el-switch v-model="aaa" class="themeConfig" inline-prompt size="large" :active-icon="sun" :inactive-icon="sun"
      style="--el-switch-on-color: #151515; --el-switch-off-color: #151515" />
  </div>
</template>

<script lang='ts'>
import RForm from '@/components/ELForm/RForm.vue';
interface user {
}
import { reactive, toRefs, defineComponent, ToRefs, createVNode, ref } from 'vue';
import SvgIcon from '@/components/Icon/SvgIcon.vue';
import { useIcon } from '@/assets/icons';
export default defineComponent({
  name: 'User',
  props: [],
  setup() {
    const initState = (): user => {
      return {
      };
    };
    const model: user = reactive(initState());
    let data: ToRefs<user> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
    };

    let sun = createVNode(SvgIcon, {
      iconClass: "sun",
      name: "sun",
      className: "sun",
      size: '1.5rem'
    });


    const aaa = ref('');

    return {
      ...data,
      resetState,
      sun,
      aaa,
      bbb: useIcon('Edit', false)
    };
  },
  components: {
    RForm
  }
});
</script>
<style lang='stylus' scoped>
</style>