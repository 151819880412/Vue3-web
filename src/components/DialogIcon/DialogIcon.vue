<template>
  <div class='DialogIcon'>
    <el-dialog v-model="selectIconDialog" destroy-on-close draggable :close-on-click-modal="false" :show-close="false"
      :before-close="openIconDialog" title="图标" :fullscreen="dialogFull" lock-scroll>
      <template #header="{ close, titleId, titleClass }">
        <div>
          <span :id="titleId" :class="titleClass">选择图标</span>
          <el-input style="width:30%;margin-left:5px" placeholder="请输入图标名称" :prefix-icon="ElementPlusIconsVue.Search"
            v-model="searchIcon"></el-input>
        </div>
        <button class="el-dialog__headerbtn" style="margin-right:54px" @click="(dialogFull = !dialogFull)">
          <el-icon>
            <FullScreen />
          </el-icon>
        </button>
        <button class="el-dialog__headerbtn" @click="close">
          <el-icon>
            <Close />
          </el-icon>
        </button>
      </template>
      <div class="iconBody">
        <div class="iconBoxs"
          v-for="item in Object.keys(ElementPlusIconsVue).filter(item => item.toLowerCase().indexOf(searchIcon.toLowerCase()) > -1)"
          :key="item">
          <div class="icons" @click="selectIcons(item)">
            <el-icon class="elIcon">
              <component :is="item"></component>
            </el-icon>
            <span style="margin-top:8px">{{ item.toLowerCase() }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
interface DialogIcon {
  selectIconDialog: boolean;
  dialogFull: boolean;
  openIconDialog: () => Promise<string>;
  searchIcon: string;
  selectIcons: (str: string) => void;
}
import { reactive, toRefs, defineComponent, ToRefs, ref } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { watchOnce } from '@vueuse/core';

export default defineComponent({
  name: 'DialogIcon',
  props: [],
  setup() {
    const iconResult = ref('');

    const initState = (): DialogIcon => {
      return {
        selectIconDialog: false,
        dialogFull: false,
        openIconDialog: (): Promise<string> => {
          model.selectIconDialog = !model.selectIconDialog;
          return new Promise((res) => {
            watchOnce(iconResult, () => {
              res(iconResult.value);
            });
          });
        },
        searchIcon: "",
        selectIcons: (str: string): void => {
          iconResult.value = str;
          model.selectIconDialog = !model.selectIconDialog;
        }
      };
    };
    let model: DialogIcon = reactive(initState());
    let data: ToRefs<DialogIcon> = toRefs(model);


    const resetState = (): void => {
      iconResult.value = '';
      model = Object.assign(model, initState());
    };
    return {
      ...data,
      ElementPlusIconsVue,
      iconResult,
      resetState
    };
  }
});
</script>
<style lang='stylus' scoped>

.el-dialog__headerbtn{
  width:30px;
  margin-right:24px
}
.iconBody{
  display: grid;
  grid-template-columns: repeat(7,1fr);
  height: 600px;
   overflow-y: scroll;
}
.iconBoxs{
  border:1px solid var(--el-border-color);
  height:90px
}
.iconBoxs :hover{
  background-color: var(--el-border-color-extra-light);
  color: var(--brand-color-light);
}
.icons{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  font-size:13px
}
.elIcon{
  height:20px;
  width:20px;
  font-size:20px
}
</style>