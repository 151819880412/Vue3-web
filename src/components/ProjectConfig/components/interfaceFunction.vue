<template>
  <div class='interfaceFunction'>
    <el-divider>界面功能</el-divider>
    <div class="interfaceFunctions">
      <span>折叠菜单</span>
      <el-switch v-model="getProjectConfig.menuSetting.collapsed" active-text="开" inactive-text="关" inline-prompt
        @change="changeCollapsed" />
    </div>
    <div class="interfaceFunctions">
      <span>自动锁屏(分钟)</span>
      <el-input-number v-model="getProjectConfig.lockTime" :min="0" :max="100" controls-position="right" size="large" />
    </div>

  </div>
</template>

<script lang='ts'>
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface interfaceFunction {
  getProjectConfig:any
}
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
import _ from 'lodash';
import { reactive, toRefs, defineComponent, ToRefs } from 'vue';

export default defineComponent({
  name: 'interfaceFunction',
  props: [],
  setup() {
    const appStore = useAppStoreWithOut();

    const initState = (): interfaceFunction => {
      return {
        getProjectConfig: appStore.getProjectConfig,
      };
    };
    const model: interfaceFunction = reactive(initState());
    let data: ToRefs<interfaceFunction> = toRefs(model);


    const changeCollapsed = (val: boolean): void => {
      appStore.setProjectConfig({ menuSetting: { collapsed: val } });
    };
    const handleChange = (val) => {
      console.log(val);
    };
    return {
      ...data,
      changeCollapsed,
      // getProjectConfig: appStore.getProjectConfig,
      handleChange,
    };
  },
  components: {
  }
});
</script>
<style lang='stylus' scoped>
.interfaceFunctions{
  display: flex
  justify-content: space-between;
  align-items: center;
}
</style>