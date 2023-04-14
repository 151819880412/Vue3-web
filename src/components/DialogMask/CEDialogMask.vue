<template>
  <div class='CEDialogMask'>
    <el-dialog v-model="dialogFormVisible" :title="title" draggable :close-on-click-modal="false" :show-close="false"
      destroy-on-close :before-close="closeDialog" :fullscreen="dialogFull" ref="ceDialog" @open="openDialog">
      <template #header="{ close, titleId, titleClass }">
        <span :id="titleId" :class="titleClass">{{ title }}</span>
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
      <component :is='ceConfig' ref="ceComponents"></component>
      <slot name="dialogMaskSlot"></slot>
      <template #footer>
        <slot name="dialogMaskFooterSlot">
          <span class="dialog-footer">
            <el-button type="primary" @click="submitDialog">提 交</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </span>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
interface CEDialogMask {
  dialogFormVisible: boolean;
  returnFormData: object;
  title: string;
  data: any;
  type: string;
  closeDialog: () => void;
  dialogFull: boolean;
  submitDialog: () => void;
  openDialog: () => void;
  initComponent: <T>({ configList, data, type, component }: { configList: CEtypes[] | CETable<T>, data?: any, type: string, component?: string }) => void;
  ceConfig: string;
  // ceConfigArr:CEtypes[] | CETable<T>[]
  ceConfigArr: any;
}
import { reactive, toRefs, getCurrentInstance, defineComponent, ComponentInternalInstance, ToRefs, ref, inject } from 'vue';
import CETables from '@/components/ElTable/CE-Table.vue';
import CEForms from '@/components/ElForm/CE-Form.vue';
import { CEtypes } from '@/@types/CEForm/CEIndex';
import { CETable } from '@/@types/CETable/CETable';
import { StateEnum } from '@/enums/stateEnum';
import { ElMessage } from 'element-plus';
import _ from 'lodash';
import EventBus from '@/utils/mitt/mitt';

export default defineComponent({
  name: 'CEDialogMask',
  props: [],
  setup() {
    const ctx: ComponentInternalInstance | null = getCurrentInstance();
    let Pctx: ComponentInternalInstance | null | undefined = inject("Pctx");


    const ceDialog = ref();
    const ceComponents = ref();

    const initState = (): CEDialogMask => {
      return {
        dialogFormVisible: false,
        returnFormData: {},
        title: "",
        data: {},
        type: '',
        closeDialog: () => {
          resetState();
        },
        dialogFull: false,
        submitDialog: () => {
          return new Promise(async (res) => {
            const formData = await ceComponents.value.submit();
            const data = Object.assign({}, model.data, formData);
            if (data) {
              let submitDialog = 'submitDialog' + model.type;
              try {
                let res = await Pctx?.proxy?.[submitDialog](data);
                if (res) {
                  model.closeDialog();
                  if (Pctx && Pctx.proxy) {
                    if (Pctx.proxy.searchFormData) {
                      Pctx.proxy.searchFormData = _.cloneDeep(Pctx?.proxy?.searchFormData);
                    } else {
                      EventBus.emit('refresh');
                    }
                  }
                }
              } catch (error) {
                if ((error as Error).message == 'Pctx?.proxy?.[submitDialog] is not a function') {
                  console.log(error);
                  console.error("父组件缺少 " + submitDialog + " 提交方法");
                  ElMessage.error("父组件缺少 " + submitDialog + " 提交方法");
                }
              }
              res(data);
            }
          });
        },
        openDialog: async () => {
          if (model.ceConfig == 'ce-table') {

          } else {
            ceComponents?.value?.initCEForm(model.ceConfigArr);
          }
        },
        // initComponent: <T>(arr: CEtypes[] | CETable<T>[], data?: any) => {
        initComponent: <T>({ configList, data, type, component }: { configList: CEtypes[] | CETable<T>|any, data?: any, type: string, component?: string }) => {
          model.dialogFormVisible = true;
          model.data = data;
          model.type = type;
          model.title = StateEnum[type];
          console.log(configList,typeof configList)
          if(component){
            model.ceConfigArr = configList;
            model.ceConfig = component;
          }else{
            model.ceConfigArr = _.cloneDeep(configList);
            if (configList instanceof CETable) {
              model.ceConfig = 'ce-table';
            } else {
              model.ceConfig = 'ce-form';
              model.ceConfigArr.forEach((item: CEtypes) => {
                // 判断不为null和undefind
                if ((data[item.prop] ?? '') !== '') {
                  item.modelValue = data[item.prop];
                }
              });
            }
          }
          // return new Promise((res) => {
          //   watch([() => model.returnFormData], () => {
          //     res(model.returnFormData);
          //   }, { deep: true });
          // });
        },
        ceConfig: '',
        ceConfigArr: [],
      };
    };
    const model: CEDialogMask = reactive(initState());
    let data: ToRefs<CEDialogMask> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
    };
    return {
      ...data,
      resetState,
      ceDialog,
      ceComponents,
      ctx
    };
  },
  components: {
    'ce-table': CETables,
    'ce-form': CEForms,
  }
});
</script>
<style lang='stylus' scoped>
</style>