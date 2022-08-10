<template>
  <el-dialog v-model="dialogFormVisible" title="标题" destroy-on-close draggable :close-on-click-modal="false"
    :before-close="closeDialog">
    <ElForms :formConfig="formConfig" ref="dialogMask" />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitDialog">提交</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, inject, reactive, ref, toRefs } from "vue";
import ElForms from "@/components/ElForm/ElForms.vue";
import { FormInterface, Rules, Options } from "#/form-config";

export default defineComponent({
  name: "DialogMask",
  props: {},
  setup() {
    const dialogFormVisible = ref(false);

    const dialogMask = ref();
    let Pctx: ComponentInternalInstance | null | undefined = inject('Pctx');
    

    /**
     * 初始化数据
     * @date 2022-08-05
     * @returns {any}
     */
    const initState = () => {
      return {
        formConfig: []
      };
    };

    const state = reactive(initState());

    /**
     * 重置数据
     * @date 2022-08-05
     * @returns {void}
     */
    const resetState = ():void => {
      Object.assign(state, initState());
    };

    /**
     * 关闭弹窗
     * @date 2022-08-05
     * @returns {void}
     */
    const closeDialog = ():void => {
      resetState();
      dialogFormVisible.value = false
    };

    /**
     * 初始化表单
     * @date 2022-08-05
     * @param {any} data:Array<FormInterface<Rules
     * @param {any} Options>>
     * @returns {any}
     */
    const initConfig = (config: Array<FormInterface<Rules, Options>>): void => {
      state.formConfig = JSON.parse(JSON.stringify(config));
    };


    const submitDialog = ():void=>{
      try {
        let res = async (formData) => {
          let data = await Pctx?.proxy?.submitDialog(formData)
          console.log(data)
          if(data){
            closeDialog()
            if(Pctx&&Pctx.proxy){
              Pctx.proxy.searchFormData = JSON.parse(JSON.stringify(Pctx?.proxy?.searchFormData))
            }
          }
        }
        dialogMask.value.validate(res)
      } catch (error) {
        console.error('缺少submitDialog方法');
      }

      }

    const states = toRefs(state);

    return {
      dialogFormVisible,
      closeDialog,
      ...states,
      dialogMask,
      initConfig,
      submitDialog
    };
  },
  components: {
    ElForms,
  },
});
</script>
<style lang="stylus" scoped></style>
