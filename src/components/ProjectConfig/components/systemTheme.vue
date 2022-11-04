<template>
  <div class='systemTheme'>
    <el-divider>系统主题</el-divider>
    <div class="themeColor">
      <el-button v-for="item in themeArr" :key="item" @click="changeTheme(item)" :color="item" size="small"></el-button>
      <el-color-picker v-model="color" @change="changeTheme" />
    </div>
  </div>
</template>

<script lang='ts'>
interface systemTheme {
  color: string,
  themeArr: Array<string>;
}
import { ProjectConfig } from '#/config';
import { PROJ_CFG_KEY } from '@/enums/cacheEnum';
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
import { setThemeColor } from '@/utils';
import { Persistent } from '@/utils/cache/persistent';
import { reactive, toRefs, defineComponent, ToRefs, onMounted } from 'vue';
export default defineComponent({
  name: 'systemTheme',
  props: [],
  setup() {
    onMounted(() => {
      model.color = Persistent.getLocal<ProjectConfig>(PROJ_CFG_KEY)?.themeColor || '#0084f4';
    });
    const initState = (): systemTheme => {
      return {
        color: '#0084f4',
        themeArr: [
          '#0084f4',
          '#0960bd',
          '#009688',
          '#536dfe',
          '#ff5c93',
          '#ee4f12',
          '#0096c7',
        ]
      };
    };
    const model = reactive<systemTheme>(initState());
    let data: ToRefs<systemTheme> = toRefs(model);
    /**
     * 切换系统主题
     * @date 2022-11-01
     * @param {any} val:string
     * @returns {any}
     */
    const changeTheme = (val: string): void => {
      model.color = val;
      setThemeColor(val);
      const appStore = useAppStoreWithOut();
      appStore.setProjectConfig({ themeColor: val })
    };
    return {
      ...data,
      changeTheme
    };
  }
});
</script>
<style lang='stylus' scoped>
.themeColor{
  display: flex
  justify-content: center
  align-items: center  
}
/deep/.el-color-picker__trigger{
  margin-left: 12px
  border: 0
}
/deep/.themeColor .el-color-picker .el-color-picker__trigger .el-color-picker__color .el-color-picker__color-inner .el-color-picker__icon{
  display: none  
}
</style>