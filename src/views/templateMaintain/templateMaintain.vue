<template>
  <div class='templateMaintain'>
    111
    <CETable ref="ceTable" :searchFn="templateMaintainImpl.queryTemListByPage" />
    <CEDialogMask ref="ceDialogMask"></CEDialogMask>

    111
  </div>
</template>

<script lang='ts'>
interface templateMaintain {
  dialogFormConfig: any;
  editorTemp: (row: TemplateMaintainPageModel) => void;
  submitDialogEdit: (row: TemplateMaintainPageModel) => Promise<boolean>;
  openDialog: () => Promise<void>;
  submitDialogAdd: (row: TemplateMaintainPageModel) => Promise<boolean>;
  submitDialogDatabaseConfig: (row: any) => Promise<boolean>;
  delTemp: (row: TemplateMaintainPageModel) => Promise<void>;
  tempConfig: (row: TemplateMaintainPageModel) => void;
  databaseConfig: (row: TemplateMaintainPageModel) => void;

}
import { reactive, toRefs, getCurrentInstance, defineComponent, ComponentInternalInstance, ToRefs, ref, onMounted, nextTick, provide } from 'vue';
import CETable from '@/components/ElTable/CE-Table.vue';
import { CETableProps } from '@/@types/CETable/CETable';
import { TemplateMaintainPageModel } from '@/api/templateMaintain/model/templateMaintain';
import templateMaintainImpl from '@/api/templateMaintain';
import CEDialogMask from "@/components/DialogMask/CEDialogMask.vue";
import { ElMessage } from 'element-plus';
import EventBus from '@/utils/mitt/mitt';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'templateMaintain',
  props: [],
  setup() {
    const ctx: ComponentInternalInstance | null = getCurrentInstance();
    provide("Pctx", ctx);
    const ceTable = ref<InstanceType<typeof CETable>>();
    const ceDialogMask = ref<InstanceType<typeof CEDialogMask>>();
    const router = useRouter();

    const initState = (): templateMaintain => {
      return {
        dialogFormConfig: [
          {
            label: "模板名称",
            prop: "templateMaintainName",
            component: "el-input",
            placeholder: "请输入内容",
            disabled: false,
            clearable: true,
            readonly: false,
            autofocus: false,
            required: true,
            name: "templateMaintainName",
            rules: [{ message: "请输入模板名称", required: true, trigger: "blur" }],
            resize: "none",
            type: "text",
          },
        ],
        // 打开弹窗
        openDialog: async (): Promise<void> => {
          ceDialogMask?.value?.initComponent({ configList: model.dialogFormConfig, type: "Add", data: {} });
          ceDialogMask.value?.openDialog('Add');
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
        submitDialogDatabaseConfig: async (formData: any): Promise<boolean> => {
          // let { message } = await templateMaintainImpl.addTemplate(formData);
          // ElMessage({
          //   message,
          //   type: "success",
          // });
          // return true;
          console.log(formData);
          return false;
        },
        // 编辑弹窗
        editorTemp: async (formData: TemplateMaintainPageModel): Promise<void> => {
          const { data } = await templateMaintainImpl.queryTemplateById(formData.templateMaintainId);
          console.log(data);
          ceDialogMask?.value?.initComponent({ configList: model.dialogFormConfig, data, type: "Edit" });
        },
        // 编辑提交
        submitDialogEdit: async (formData: TemplateMaintainPageModel): Promise<boolean> => {
          let { message } = await templateMaintainImpl.editorTemplate(formData);
          ElMessage({
            message,
            type: "success",
          });
          return true;
        },
        // 删除
        delTemp: async (formData: TemplateMaintainPageModel): Promise<void> => {
          let { message } = await templateMaintainImpl.delTemplate(formData);
          ElMessage({
            message,
            type: "success",
          });
          EventBus.emit('refresh');
        },
        // 模板配置
        tempConfig: (row: TemplateMaintainPageModel): void => {
          console.log(row);
          router.push({
            path: '/templateConfig'
          });
        },
        // 数据库配置
        databaseConfig: (row: TemplateMaintainPageModel) => {

          const ceTableData: Partial<CETableProps<any>> = {
            border: true,
            data: [],
            column: [
              {
                type: "selection",
                label: "勾选",
              },
              {
                label: "模板名称",
                prop: "templateMaintainName",
              }, {
                label: "状态",
                prop: "state",
                ceFormatter: "state",
                slots: {
                  formatter: "",
                  slotName: "a",
                  slotLabel: ""
                },
              },
              {
                label: "创建时间",
                prop: "createdTime",
              },
              {
                label: "更新时间",
                prop: "updatedTime",
              }
            ]
          };
          const formTable: any = reactive({ tableData: [] });

          const configList: any = {
            component: 'el-form',
            model: formTable,
            rules: {
              tableName: [
                {
                  required: true,
                  message: "请输入表名",
                  trigger: "blur",
                },
              ],
              name: [
                {
                  required: true,
                  message: "请输入列名",
                  trigger: "blur",
                },
              ],
              type: [
                {
                  required: true,
                  message: "请输入类型",
                  trigger: "blur",
                },
              ],
              length: [
                {
                  required: true,
                  message: "请输入长度",
                  trigger: "change",
                },
              ],

            },
            children: [
              {
                component: "el-form-item",
                prop: "tableName",
                label: "表名称",
                children: [
                  {
                    component: "el-input",
                    prop: "tableName",
                  }
                ]
              },
              {
                component: "el-form-item",
                prop: "isPrimary",
                label: "主键",
                children: [
                  {
                    component: "el-select",
                    prop: "isPrimary",
                    visibleChange:()=>{
                      configList.children[1].children[0].slots[0].options = []
                      formTable.tableData.forEach(item=>{
                        configList.children[1].children[0].slots[0].options.push({
                          label:item.name,
                          value:item.name,
                        })
                      })
                      console.log(configList)
                    },
                    slots: [
                      {
                        slotName: "default",
                        component: "el-option",
                        options: [],
                      },
                    ],
                  }
                ]
              },
              {
                component: "el-form-item",
                prop: "isUnique",
                label: "索引",
                children: [
                  {
                    component: "el-select",
                    prop: "isUnique",
                    multiple: true,
                    visibleChange:()=>{
                      configList.children[2].children[0].slots[0].options = []
                      formTable.tableData.forEach(item=>{
                        configList.children[2].children[0].slots[0].options.push({
                          label:item.name,
                          value:item.name,
                        })
                      })
                      console.log(configList)
                    },
                    slots: [
                      {
                        slotName: "default",
                        component: "el-option",
                        options: [],
                      },
                    ],
                  }
                ]
              },
              {
                component: "el-table",
                data: formTable.tableData,
                border: true,
                children: [
                  {
                    component: "el-table-column",
                    width: '70px',
                    align: 'center',
                    slots: [
                      {
                        slotName: 'header',
                        component: "el-button",
                        icon: "Plus",
                        circle: true,
                        size: "mini",
                        border: true,
                        click: () => {
                          formTable.tableData.push({
                            name: "",
                            type: "",
                            length: 20,
                            default: "",
                            isNullable: false
                          });
                        }
                      },
                      {
                        slotName: 'default',
                        component: "el-button",
                        icon: "Minus",
                        circle: true,
                        size: "mini",
                        border: true,
                        click: (slotProp) => {
                          console.log(222, slotProp);
                        }
                      }
                    ]
                  },
                  {
                    component: "el-table-column",
                    label: '序号',
                    width: '70px',
                    align: 'center',
                    type: 'index',
                  },
                  {
                    component: "el-table-column",
                    prop: 'name',
                    label: '列名',
                    align: 'center',
                    slots: [
                      {
                        slotName: 'default',
                        component: "el-form-item",
                        prop: "name",
                        slots: [
                          {
                            slotName: 'default',
                            component: "el-input",
                            model: "",
                          }
                        ]
                      }
                    ]
                  },
                  {
                    component: "el-table-column",
                    prop: 'type',
                    label: '类型',
                    align: 'center',
                    slots: [
                      {
                        slotName: 'default',
                        component: "el-form-item",
                        prop: "type",
                        slots: [
                          {
                            slotName: 'default',
                            component: "el-input",
                            model: "",
                          }
                        ]
                      }
                    ]
                  },
                  {
                    component: "el-table-column",
                    prop: 'length',
                    label: '长度',
                    align: 'center',
                    slots: [
                      {
                        slotName: 'default',
                        component: "el-form-item",
                        prop: "length",
                        slots: [
                          {
                            slotName: 'default',
                            component: "el-input-number",
                            max: 20,
                            model: 0,
                          }
                        ]
                      }
                    ]
                  },
                  {
                    component: "el-table-column",
                    prop: 'default',
                    label: '默认值',
                    align: 'center',
                    slots: [
                      {
                        slotName: 'default',
                        component: "el-form-item",
                        prop: "default",
                        slots: [
                          {
                            slotName: 'default',
                            prop: "default",
                            component: "el-input",
                            model: "",
                          }
                        ]
                      }
                    ]
                  },
                  {
                    component: "el-table-column",
                    prop: 'isNullable',
                    label: '能否为空',
                    align: 'center',
                    slots: [
                      {
                        slotName: 'default',
                        component: "el-form-item",
                        prop: "isNullable",
                        class: "ce-switeh",
                        slots: [
                          {
                            slotName: 'default',
                            component: "el-switch",
                            model: true,
                            modelValue: true,
                            activeValue: true,
                            inactiveValue: false,
                          }
                        ]
                      }
                    ]
                  },
                ]
              }
            ]
          };
          console.log(configList, ceTableData);
          ceDialogMask?.value?.initComponent({ configList: configList, data: {}, type: "DatabaseConfig", component: 'form-table' });

          console.log(row);
        }
      };
    };
    const model: templateMaintain = reactive(initState());
    let data: ToRefs<templateMaintain> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
    };

    onMounted(() => {
      nextTick(() => {
        const ceTableData: Partial<CETableProps<any>> = {
          border: true,
          data: [],
          column: [
            {
              type: "selection",
              label: "勾选",
            },
            {
              label: "模板名称",
              prop: "templateMaintainName",
            }, {
              label: "状态",
              prop: "state",
              ceFormatter: "state",
              slots: {
                formatter: "",
                slotName: "a",
                slotLabel: ""
              },
            },
            {
              label: "创建时间",
              prop: "createdTime",
            },
            {
              label: "更新时间",
              prop: "updatedTime",
            }, {
              type: 'operation',
              label: "操作",
              operationBtn: [
                {
                  label: "编辑",
                  operationMethod: "editorTemp",
                  ceShow: true,
                },
                {
                  label: "删除",
                  operationMethod: 'delTemp',
                  ceShow: true,
                },
                {
                  label: "模板配置",
                  operationMethod: 'tempConfig',
                  ceShow: true,
                },
                {
                  label: "数据库配置",
                  operationMethod: 'databaseConfig',
                  ceShow: true,
                },
              ]
            }
          ]
        };

        ceTable.value?.initCETable(ceTableData);

        console.log(ceTable.value, 111);
      });
    });
    return {
      ...data,
      resetState,
      ceTable,
      templateMaintainImpl,
      ceDialogMask
    };
  },
  components: {
    CETable
  }
});
</script>
<style lang='stylus' scoped>
</style>