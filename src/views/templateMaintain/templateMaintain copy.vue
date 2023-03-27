<template>
  <div class='templateMaintain'>

    <MainTable :searchFn="templateMaintainImpl.queryTemListByPage" :tableConfig="tableData">
    </MainTable>
    <DialogMask ref="dialogMask"></DialogMask>

  </div>
</template>

<script lang='ts'>
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface templateMaintain extends BaseInterface<MenuListModel> {
  openDialog: () => void;
  editorTemp: (row: TemplateMaintainPageModel) => void;
  delTemp: (row: TemplateMaintainPageModel) => void;
  tempConfig: (row: TemplateMaintainPageModel) => void;
  databaseConfig: (row: TemplateMaintainPageModel) => void;
  submitDialogAdd: (row: TemplateMaintainPageModel) => Promise<boolean>;
  submitDialogEditor: (row: TemplateMaintainPageModel) => Promise<boolean>;

}
import { MenuListModel } from '@/api/menu/model/menuModel';
import { reactive, toRefs, getCurrentInstance, defineComponent, ComponentInternalInstance, ToRefs, provide, ref } from 'vue';
import templateMaintainImpl from '@/api/templateMaintain/index';
import { TemplateMaintainPageModel } from '@/api/templateMaintain/model/templateMaintain';
import DialogMask from "@/components/DialogMask/DialogMask.vue";
import BaseInterface from '@/@types/baseInterface';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { CETable } from '@/@types/CETable/CETable';

export default defineComponent({
  name: 'templateMaintain',
  props: [],
  setup() {
    console.log(new CETable(),1111)
    const ctx: ComponentInternalInstance | null = getCurrentInstance();
    provide("Pctx", ctx);
    const dialogMask = ref<InstanceType<typeof DialogMask>>();
    const router = useRouter();



    const initState = (): templateMaintain => {
      return {
        tableData: {
          tableProps: {
            rowClassName: function ({ rowIndex }) {
              return rowIndex % 2 == 0 ? "selfClass" : "dubbleClass";
            },
            border: true,
            data: [],
            rowKey: "id",
            defaultExpandAll: true
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
              label: "模板名称",
              prop: "templateMaintainName",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "状态",
              prop: "state",
              slot: "formatterSlot",
              showOverflowTooltip: true,
              visible: true
            },
            {
              label: "操作",
              width: 200,
              fixed: 'right',
              visible: true,
              operationBtn: [
                {
                  label: "编辑",
                  operationFn: 'editorTemp(row)'
                },
                {
                  label: "删除",
                  operationFn: 'delTemp(row)'
                },
                {
                  label: "模板配置",
                  operationFn: 'tempConfig(row)'
                },
                {
                  label: "数据库配置",
                  operationFn: 'databaseConfig(row)'
                },
              ]
            },
          ],
        },
        dialogFormConfig: [

          {
            type: "input",
            title: "模板名称",
            field: "templateMaintainName",
            defaultValue: "",
            maxlength: 40,
            required: true,
            rules: [{ message: "请输入中文名", required: true, trigger: "blur" }],
            col: {
              span: 12,
            },
            isShow: true,
          },
        ],
        // 打开弹窗
        openDialog: async (): Promise<void> => {
          console.log(dialogMask);
          await dialogMask?.value?.initConfig(model.dialogFormConfig);
          dialogMask.value?.openDialog('Add');
        },
        // 新增提交
        submitDialogAdd: async (formData: TemplateMaintainPageModel): Promise<boolean> => {
          let { message } = await templateMaintainImpl.addTemplate(formData);
          ElMessage({
            message,
            type: "success",
          });
          return true;
        },
        // 编辑弹窗
        editorTemp: async (formData: TemplateMaintainPageModel): Promise<void> => {
          const { data } = await templateMaintainImpl.queryTemplateById(formData.templateMaintainId);
          await dialogMask?.value?.initConfig(model.dialogFormConfig, data);
          dialogMask.value?.openDialog("Editor");
        },
        // 编辑提交
        submitDialogEditor: async (formData: TemplateMaintainPageModel): Promise<boolean> => {
          let { message } = await templateMaintainImpl.editorTemplate(formData);
          ElMessage({
            message,
            type: "success",
          });
          return true;
        },
        // 删除模板
        delTemp: (row: TemplateMaintainPageModel): void => {
          console.log(row);
        },
        // 模板配置
        tempConfig: (row: TemplateMaintainPageModel): void => {
          console.log(row);
          router.push({
          path: '/templateConfig'
        });
        },
        // 数据库配置
        databaseConfig:(row: TemplateMaintainPageModel)=>{
          console.log(row)
        }
      };
    };
    const model: templateMaintain = reactive(initState());
    let data: ToRefs<templateMaintain> = toRefs(model);

    return {
      ...data,
      templateMaintainImpl,
      dialogMask
    };
  },
});
</script>
<style lang='stylus' scoped>
</style>