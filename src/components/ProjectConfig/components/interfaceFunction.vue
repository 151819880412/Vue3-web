<template>
  <div class='interfaceFunction'>
    <el-divider>界面功能</el-divider>
    <div class="interfaceFunctions">
      <span>折叠菜单</span>
      <el-switch v-model="projectConfig.menuSetting.collapsed" active-text="开" inactive-text="关" inline-prompt
        @change="changeCollapsed" />
    </div>
    <div class="interfaceFunctions">
      <span>自动锁屏(分钟)</span>
      <el-input-number v-model="projectConfig.lockTime" :min="0" :max="100" controls-position="right" size="large" />
    </div>

    <div class="interfaceFunctions">
      <span>面包屑</span>
      <el-switch v-model="projectConfig.showBreadCrumb" active-text="开" inactive-text="关" inline-prompt
        @change="changeBreadCrumb" />
    </div>
    <div class="interfaceFunctions">
      <span>面包屑图标</span>
      <el-switch v-model="projectConfig.showBreadCrumbIcon" active-text="开" inactive-text="关" inline-prompt
        @change="changeBreadCrumbIcon" />
    </div>

    <div class="interfaceFunctions">
      <span>标签页</span>
      <el-switch v-model="projectConfig.multiTabsSetting.show" active-text="开" inactive-text="关" inline-prompt
        @change="changeTabsShow" />
    </div>
    <div class="interfaceFunctions">
      <span>标签页快捷按钮</span>
      <el-switch v-model="projectConfig.multiTabsSetting.showQuick" active-text="开" inactive-text="关" inline-prompt
        @change="changeShowQuick" />
    </div>

    <div class="interfaceFunctions">
      <span>顶栏</span>
      <el-switch v-model="projectConfig.headerSetting.show" active-text="开" inactive-text="关" inline-prompt
        @change="changeHeaderShow" />
    </div>
    <div class="interfaceFunctions">
      <span>Logo</span>
      <el-switch v-model="projectConfig.showLogo" active-text="开" inactive-text="关" inline-prompt
        @change="changeShowLogo" />
    </div>
    <div class="interfaceFunctions">
      <span>页脚</span>
      <el-switch v-model="projectConfig.showFooter" active-text="开" inactive-text="关" inline-prompt
        @change="changeShowFooter" />
    </div>
    <div class="interfaceFunctions">
      <span>水印</span>
      <el-switch v-model="projectConfig.showWatermark" active-text="开" inactive-text="关" inline-prompt
        @change="changeWatermark" />
    </div>





  </div>
</template>

<script lang='ts'>
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface interfaceFunction {
  projectConfig: ProjectConfig;
}
import { ProjectConfig } from '#/config';
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
import { useWatermark } from '@/utils/watermark';
import { reactive, toRefs, defineComponent, ToRefs } from 'vue';

export default defineComponent({
  name: 'interfaceFunction',
  props: [],
  setup() {

    const appStore = useAppStoreWithOut();

    const initState = (): interfaceFunction => {
      return {
        projectConfig: appStore.getProjectConfig,
      };
    };
    const model: interfaceFunction = reactive(initState());
    let data: ToRefs<interfaceFunction> = toRefs(model);
      const watermark = useWatermark();

    const initFn = () => {
      return {
        changeCollapsed: (val: boolean): void => {
          appStore.setProjectConfig({ menuSetting: { collapsed: val } });
        },
        changeBreadCrumb: (val: boolean): void => {
          appStore.setProjectConfig({ showBreadCrumb: val });
        },
        changeBreadCrumbIcon: (val: boolean): void => {
          appStore.setProjectConfig({ showBreadCrumbIcon: val });
        },
        changeTabsShow: (val: boolean): void => {
          appStore.setProjectConfig({ multiTabsSetting: { show: val } });
        },
        changeShowQuick: (val: boolean): void => {
          appStore.setProjectConfig({ multiTabsSetting: { showQuick: val } });
        },
        changeHeaderShow: (val: boolean): void => {
          appStore.setProjectConfig({ headerSetting: { show: val } });
        },
        changeShowLogo: (val: boolean): void => {
          appStore.setProjectConfig({ showLogo: val });
        },
        changeShowFooter: (val: boolean): void => {
          appStore.setProjectConfig({ showFooter: val });
        },
        changeWatermark: (val: boolean): void => {
          appStore.setProjectConfig({ showWatermark: val });
          if(val){
            watermark.setWatermark('请勿外传')
          }else{
            watermark.clear()
          }
        },
      };
    };

    return {
      ...data,
      ...initFn()
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