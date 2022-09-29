<template>
  <el-dialog v-model="dialogFormVisible" :title="title" destroy-on-close draggable :close-on-click-modal="false"
    :before-close="closeDialog">
    <ElForms :formConfig="state.formConfig" :formData="formData" ref="dialogMask" />
    <slot name="dialogMaskSlot"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitDialog">提交</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  defineComponent,
  inject,
  reactive,
  ref,
  toRefs,
} from "vue";
import ElForms from "@/components/ElForm/ElForms.vue";
import { FormInterface, Rules, Options } from "#/form-config";
import { UserAddModel } from "@/api/user/model/userModel";
import userServiceImpl from "@/api/user/index";
import { ElMessage } from "element-plus";
import EventBus from "@/utils/mitt/mitt";
import _ from "lodash";


export default defineComponent({
  name: "DialogMask",
  props: {},
  setup() {
    const dialogFormVisible = ref(false);

    const dialogMask = ref();
    let Pctx: ComponentInternalInstance | null | undefined = inject("Pctx");

    /**
     * 初始化数据
     * @date 2022-08-05
     * @returns {any}
     */
    interface DialogMaskType {
      formConfig: Array<FormInterface<Rules, Options>>;
      formData: object;
      title:string,
      titleType:string
    }
    const initState = ():DialogMaskType => {
      return {
        formConfig: [],
        formData:{},
        title: "",
        titleType: "",
      };
    };

    const state = reactive(initState());

    /**
     * 重置数据
     * @date 2022-08-05
     * @returns {void}
     */
    const resetState = (): void => {
      Object.assign({},state, initState());
    };

    /**
     * 关闭弹窗
     * @date 2022-08-05
     * @returns {void}
     */
    const closeDialog = (): void => {
      resetState();
      dialogFormVisible.value = false;
    };

    /**
     * 打开弹窗
     * @date 2022-08-05
     * @returns {void}
     */
    const openDialog = (title: string): void => {
      switch (title) {
        case 'Add':
          state.title = '新 增';
          break;
        case 'Editor':
          state.title = '编 辑';
          break;
        case 'Del':
          state.title = '删 除';
          break;
        default:
          break;
      }
      state.titleType = title;
      dialogFormVisible.value = true;
    };

    /**
     * 初始化表单
     * @date 2022-08-05
     * @param {any} data:Array<FormInterface<Rules
     * @param {any} Options>>
     * @returns {any}
     */
    const initConfig = async (config: Array<FormInterface<Rules, Options>>, data?: object): Promise<void> => {
      const configCopy =  _.cloneDeep(config)
      if (data) {
        state.formData = data
        const row = JSON.parse(JSON.stringify(data));
        configCopy.forEach((item:FormInterface<Rules, Options>) => {
          // 判断不为null和undefind
          if ((row[item.field]??'')!=='') {
            item.value = row[item.field];
          }
        });
      }
      let queryFn: Array<any> = [];
      configCopy.filter(item => item.queryOptionsFn).forEach(item => {
        if (item.queryOptionsFn) {
          queryFn.push(userServiceImpl.queryOptions(item.queryOptionsFn.url, JSON.parse(item.queryOptionsFn.data)));
        }
      });
      var p = await Promise.all(queryFn);
      configCopy.filter(item => item.queryOptionsFn).forEach((item, index) => {
        if (item.queryOptionsFn) {
          item.options = JSON.parse(JSON.stringify(p[index].data.results));
        }
      });
      state.formConfig = _.cloneDeep(configCopy)
    };

    const submitDialog = (): void => {
      let submitDialog = 'submitDialog' + state.titleType;
      console.log(submitDialog, Pctx?.proxy);
      let res = async (formData: UserAddModel) => {
        try {
          let data = await Pctx?.proxy?.[submitDialog](formData);
          if (data) {
            closeDialog();
            if (Pctx && Pctx.proxy ) {
              if(Pctx.proxy.searchFormData){
                Pctx.proxy.searchFormData = JSON.parse(
                  JSON.stringify(Pctx?.proxy?.searchFormData)
                );
              }else{
                EventBus.emit('refresh')
              }
            }
          }
        } catch (error) {
          if((error as Error).message=='Pctx?.proxy?.[submitDialog] is not a function'){
            console.log(error)
            console.error("父组件缺少 " + submitDialog + " 提交方法");
            ElMessage.error("父组件缺少 " + submitDialog + " 提交方法")
          }
        }
      };
      dialogMask.value.validate(res);

    };

    const states = toRefs(state);

    return {
      dialogFormVisible,
      closeDialog,
      ...states,
      state,
      dialogMask,
      initConfig,
      submitDialog,
      userServiceImpl,
      openDialog,
    };
  },
  components: {
    ElForms,
  },
});
</script>
<style lang="stylus" scoped></style>
