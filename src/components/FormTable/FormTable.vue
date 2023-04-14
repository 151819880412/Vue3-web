<template>
  <div class='FormTable'>
    <!-- form -->
    <component :is="formTable.is" :model="formTable.model" :rules="formTable.rules" ref="ceFormTable">
      <!-- table/form-item -->
      <component v-for="(item, index) in formTable.children" :key="index" v-bind="item" :is="item.is">

        <!-- column/input -->
        <component v-for="(item2, index2) in item.children" :key="index2" v-bind="item2" :is="item2.is"
          v-model="formTable.model[item2.prop || '']">

          <!-- form-item/append -->
          <template v-for="item3 in item2.slots" :key="item3.slotName" v-slot:[item3.slotName]="slotProp">
            <component :is='item3.is' v-bind="item3" v-on="getEventHandlers(item3, slotProp)" class="ceSlots"
              :prop="renderProp(item3, slotProp)" :rules="renderRules(item3)">
              <!-- input/ -->
              <template v-if="item3.slots">
                <template v-for="item4 in item3.slots" :key="item4.slotName">
                  <component :is='item4.is' v-bind="item4" v-model="slotProp.row[item3.prop]">
                  </component>
                </template>
              </template>
              <!-- /append -->
              <template v-else>
                {{ item3.label }}
              </template>

            </component>

          </template>
        </component>
      </component>
    </component>
  </div>
</template>

<script lang='ts'>
type form = Partial<CEFormItem> & { children?: any; };
type table = Partial<CETable<any>> & { children?: any; };
type formTables = {
  is: string;
  model: any;
  rules: FormRules,
  children: form[] | table[];
};

interface FormTable {
  submit: () => Promise<any>;
  getEventHandlers: (row: CEFormItem, slotProp: { row: any, column: any, $index: number; }) => object;
  renderProp: (row: CEFormItem, slotProp: { row: any, column: any, $index: number; }) => string;
  renderRules: (row: CEFormItem) => Arrayable<FormItemRule> | undefined;
  formTable: formTables;
  initCEForm: (data: formTables) => void;
}
import { CEFormItem } from '@/@types/CEForm/CEFormItem';
import { CETable } from '@/@types/CETable/CETable';
import { ElForm, FormItemRule, FormRules } from 'element-plus';
import { Arrayable } from 'element-plus/es/utils';
import { reactive, defineComponent, ref, toRefs, ToRefs } from 'vue';
export default defineComponent({
  name: 'FormTable',
  props: [],
  setup() {
    // const formData: any = reactive({ tableData: [] });
    const ceFormTable = ref<InstanceType<typeof ElForm>>();

    const initState = (): FormTable => {
      return {
        formTable: {
          is: '',
          model: "",
          rules: {},
          children: []
        },
        // formTable: {
        //   is: 'el-form',
        //   model: formData,
        //   rules: {
        //     tableName: [
        //       {
        //         required: true,
        //         message: "请输入表名",
        //         trigger: "blur",
        //       },
        //     ],
        //     name: [
        //       {
        //         required: true,
        //         message: "请输入列名",
        //         trigger: "blur",
        //       },
        //     ],
        //     type: [
        //       {
        //         required: true,
        //         message: "请输入类型",
        //         trigger: "blur",
        //       },
        //     ],
        //     length: [
        //       {
        //         required: true,
        //         message: "请输入长度",
        //         trigger: "change",
        //       },
        //     ],

        //   },
        //   children: [
        //     {
        //       is: "el-form-item",
        //       prop: "tableName",
        //       label: "表名称",
        //       children: [
        //         {
        //           is: "el-input",
        //           prop: "tableName",
        //         }
        //       ]
        //     } as form,
        //     {
        //       is: "el-table",
        //       data: formData.tableData,
        //       border: true,
        //       children: [
        //         {
        //           is: "el-table-column",
        //           width: '70px',
        //           align: 'center',
        //           slots: [
        //             {
        //               slotName: 'header',
        //               is: "el-button",
        //               icon: "Plus",
        //               circle: true,
        //               size: "mini",
        //               border: true,
        //               click: () => {
        //                 formData.tableData.push({
        //                   name: "",
        //                   type: "",
        //                   length: 20,
        //                   default: "",
        //                   isNullable: false
        //                 });
        //               }
        //             },
        //             {
        //               slotName: 'default',
        //               is: "el-button",
        //               icon: "Minus",
        //               circle: true,
        //               size: "mini",
        //               border: true,
        //               click: (slotProp) => {
        //                 console.log(222, slotProp);
        //               }
        //             }
        //           ]
        //         },
        //         {
        //           is: "el-table-column",
        //           label: '序号',
        //           width: '70px',
        //           align: 'center',
        //           type: 'index',
        //         },
        //         {
        //           is: "el-table-column",
        //           prop: 'name',
        //           label: '列名',
        //           align: 'center',
        //           slots: [
        //             {
        //               slotName: 'default',
        //               is: "el-form-item",
        //               prop: "name",
        //               slots: [
        //                 {
        //                   slotName: 'default',
        //                   is: "el-input",
        //                   model: "",
        //                 }
        //               ]
        //             }
        //           ]
        //         },
        //         {
        //           is: "el-table-column",
        //           prop: 'type',
        //           label: '类型',
        //           align: 'center',
        //           slots: [
        //             {
        //               slotName: 'default',
        //               is: "el-form-item",
        //               prop: "type",
        //               slots: [
        //                 {
        //                   slotName: 'default',
        //                   is: "el-input",
        //                   model: "",
        //                 }
        //               ]
        //             }
        //           ]
        //         },
        //         {
        //           is: "el-table-column",
        //           prop: 'length',
        //           label: '长度',
        //           align: 'center',
        //           slots: [
        //             {
        //               slotName: 'default',
        //               is: "el-form-item",
        //               prop: "length",
        //               slots: [
        //                 {
        //                   slotName: 'default',
        //                   is: "el-input-number",
        //                   max: 20,
        //                   model: 0,
        //                 }
        //               ]
        //             }
        //           ]
        //         },
        //         {
        //           is: "el-table-column",
        //           prop: 'default',
        //           label: '默认值',
        //           align: 'center',
        //           slots: [
        //             {
        //               slotName: 'default',
        //               is: "el-form-item",
        //               prop: "default",
        //               slots: [
        //                 {
        //                   slotName: 'default',
        //                   prop: "default",
        //                   is: "el-input",
        //                   model: "",
        //                 }
        //               ]
        //             }
        //           ]
        //         },
        //         {
        //           is: "el-table-column",
        //           prop: 'isNullable',
        //           label: '能否为空',
        //           align: 'center',
        //           slots: [
        //             {
        //               slotName: 'default',
        //               is: "el-form-item",
        //               prop: "isNullable",
        //               class: "ce-switeh",
        //               slots: [
        //                 {
        //                   slotName: 'default',
        //                   is: "el-switch",
        //                   model: true,
        //                   modelValue: true,
        //                   activeValue: true,
        //                   inactiveValue: false,
        //                 }
        //               ]
        //             }
        //           ]
        //         },
        //       ]
        //     } as table
        //   ]
        // },
        initCEForm: (data: formTables) => {
          model.formTable = data;
        },
        submit: (): Promise<any> => {
          return new Promise((res) => {
            ceFormTable.value?.validate((valid: boolean) => {
              if (valid) {
                res(model.formTable);
              }
            });
          });
        },
        getEventHandlers: (row, slotProp) => {
          const handlers = {};
          for (const key in row) {
            if (row.hasOwnProperty(key) && typeof row[key] === 'function') {
              handlers[key] = () => row[key](slotProp);
            }
          }
          return handlers;
        },
        renderProp: (row, slotProp) => {
          if (row.is === 'el-form-item') {
            return 'tableData.' + slotProp.$index + '.' + row.prop;
          }
          return row.prop;
        },
        renderRules: (row) => {
          return model.formTable.rules![row.prop];
        }
      };
    };
    const model: FormTable = reactive(initState());
    let data: ToRefs<FormTable> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
    };

    return {
      ...data,
      resetState,
      ceFormTable
    };
  }
});
</script>
<style lang="stylus" scoped>
  /deep/.ceSlots span{
    margin:0 !important
  }
  /deep/.ce-switeh div{
    justify-content: center;
  }
</style>