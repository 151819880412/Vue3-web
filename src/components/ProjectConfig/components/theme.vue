<template>
  <div class='theme'>
    <el-divider>主题</el-divider>
    <div style="display:flex;justify-content: center;">
      <el-switch v-model="value" class="themeConfig" inline-prompt size="large" :active-icon="sun" :inactive-icon="moon"
        style="--el-switch-on-color: #151515; --el-switch-off-color: #151515" @click="toggle()" />
    </div>
  </div>
</template>

<script lang='ts'>
import SvgIcon from '@/components/Icon/SvgIcon.vue';
import { createVNode, } from "vue";

interface theme {
  value: boolean,
  // idDrak: WritableComputedRef<boolean>
}
import { reactive, toRefs, defineComponent, ToRefs } from 'vue';
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'theme',
  props: [],
  setup() {
    const initState = (): theme => {
      return {
        value: false,
        // idDrak:false
      };
    };

    const model = reactive<theme>(initState());
    let data: ToRefs<theme> = toRefs(model);

    let sun = createVNode(SvgIcon, {
      iconClass: "sun",
      name: "sun",
      className: "sun",
      size: '1.5rem'
    });
    let moon = createVNode(SvgIcon, {
      iconClass: "moon",
      name: "moon",
      className: "moon",
      size: '1.5rem'
    });

    const appStore = useAppStoreWithOut();
    const toggle: (value?: boolean | undefined) => boolean = appStore.setDarkMode();

    return {
      ...data,
      sun,
      moon,
      toggle,
    };
  }
});
</script>
<style lang='stylus' scoped>
/deep/.el-switch__core{
  width: 75px
  height: 36px;
  border-radius: 18px;
}
/deep/.el-switch__inner{
  // width: 30px !important;
  height: 30px !important;
  i{
    width: 1.5rem
    height: 1.5rem
  }
}
/deep/.el-switch__action{
  width: 30px !important;
  height: 30px !important;
}
/deep/.el-switch--large .el-switch__core .el-switch__inner{
  padding: 0 9px 0 calc(30px + 3px)!important;
}
/deep/.el-switch--large.is-checked .el-switch__core .el-switch__inner{
  padding: 0 calc(30px + 3px) 0 3px !important;
}
/deep/.el-switch--large.is-checked .el-switch__core .el-switch__action{
  left: calc(100% - 30px) !important;
}
// /deep/.el-switch--large.is-checked .el-switch__core .el-switch__action{
//   margin-left: calc(-1px - 30px) !important;
// }
// /deep/.el-switch--large.is-checked .el-switch__core .el-switch__inner{
//   margin-left: calc(-1px - 30px) !important;
// }
</style>