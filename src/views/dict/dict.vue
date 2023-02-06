<template>
  <div class='dict'>
    <MainTable :searchFn="dictServiceImpl.queryDictListByPage" :searchData="searchFormData" :tableConfig="tableData">
      <template v-slot:tableBtn>
        <el-button type="primary">插槽</el-button>
      </template>
    </MainTable>

    <DialogMask ref="dialogMask"></DialogMask>
  </div>
</template>

<script lang='ts'>
interface dict {
  // searchFormData: DictQueryModel;
  tableData: tableConfigType<DictPageModel>;
  dialogFormConfig: Array<FormInterface<Rules, Options>>;
}
import { DictPageModel } from '@/api/dict/model/dictModel';
import { tableConfigType } from '@/components/MainTable/MainTable';
import { reactive, toRefs, defineComponent, ToRefs, ref, getCurrentInstance, ComponentInternalInstance, provide } from 'vue';
import dictServiceImpl from "@/api/dict/index";
import { FormInterface, Rules, Options } from '#/form-config';
import DialogMask from "@/components/DialogMask/DialogMask.vue";
import { ElMessage } from 'element-plus';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'dict',
  props: [],
  setup() {
    const dialogMask = ref<InstanceType<typeof DialogMask>>();
    const ctx = getCurrentInstance() as ComponentInternalInstance;
    provide("Pctx", ctx);

    const initState = (): dict => {
      return {
        tableData: {
          tableProps: {
            rowClassName: function ({ rowIndex }) {
              return rowIndex % 2 == 0 ? "selfClass" : "dubbleClass";
            },
            border: true,
            data: [],
          },
          columns: [
            {
              type: "selection",
              label: "勾选列",
              visible: true
            },
            {
              type: "index",
              label: "序号",
              visible: true
            },
            {
              label: "中文名",
              prop: "cnName",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "英文名",
              prop: "enName",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "英文名",
              prop: "enName",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "系统内置",
              prop: "systemDict",
              slot: "formatterSlot",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "字典类型",
              prop: "dictType",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "状态",
              prop: "state",
              slot: "formatterSlot",
              showOverflowTooltip: true,
              align: "center",
              visible: true
            },
            {
              label: "操作",
              width: 200,
              align: "center",
              visible: true,
              operationBtn: [
                {
                  label: "编辑",
                  fn: 'editor(row)'
                },
                {
                  label: "禁用",
                  visible: 'row.state==0',
                  fn: 'editState(row, "changeState")'
                },
                {
                  label: "启用",
                  visible: 'row.state==1',
                  fn: 'editState(row, "changeState")'
                },
                {
                  label: '假删除',
                  fn: 'editState(row, "changeDelFlag")'
                },
                {
                  label: '真删除',
                  fn: 'editState(row, "delUser")'
                },
                {
                  label: '关联角色',
                  fn: 'relationRole(row)'
                },
              ]
            },
          ],
        },
        dialogFormConfig: [

          {
            type: "input",
            title: "中文名",
            field: "cnName",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入中文名", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            isShow: true,
          },
          {
            type: "input",
            title: "英文名",
            field: "enName",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入英文名", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            isShow: true,
          },
          {
            type: "switch",
            title: "系统内置",
            field: "systemDict",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请选择系统内置", required: true, trigger: "change" }],
            col: {
              span: 12,
            },
            props: {
              clearable: true,
              activeValue: 0,
              inactiveValue: 1,
            },
            isShow: true,
          },
          {
            type: "input",
            title: "字典类型",
            field: "dictType",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入字典类型", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            isShow: true,
          },
          {
            type: "input",
            title: "字典值",
            field: "dictValue",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入字典值", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            isShow: true,
          },
        ],
      };
    };
    const model: dict = reactive(initState());
    let data: ToRefs<dict> = toRefs(model);

    // 打开弹窗
    const openDialog = async (): Promise<void> => {
      await dialogMask?.value?.initConfig(model.dialogFormConfig);
      dialogMask.value?.openDialog('Add');
    };

    // 新增提交
    const submitDialogAdd = async (formData: DictPageModel): Promise<boolean> => {
      let { message } = await dictServiceImpl.addDict(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    // 编辑弹窗
    const editor = async (formData: DictPageModel): Promise<void> => {
      const { data } = await dictServiceImpl.queryDictById( formData.dictId);
      await dialogMask?.value?.initConfig(model.dialogFormConfig, data);
      dialogMask.value?.openDialog("Editor");
    };

    // 编辑提交
    const submitDialogEditor = async (formData: DictPageModel): Promise<boolean> => {
      let { message } = await dictServiceImpl.editorDict(formData);
      ElMessage({
        message,
        type: "success",
      });
      return true;
    };

    return {
      ...data,
      dictServiceImpl,
      openDialog,
      dialogMask,
      submitDialogAdd,
      editor,
      submitDialogEditor,
    };
  }
});
</script>
<style lang='stylus' scoped>
</style>