<template>
  <component :is='"el-input"' v-bind="formData.props"></component>
  <div class='templateConfig'>
    <div class="left-board">
      <div v-for="item in templateList" :key="item.title" style="margin-bottom:20px">
        <div class="components-title">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.title }}
        </div>
        <draggable :list="item.children" :group="{ name: 'people', pull: 'clone', put: true }" item-key="name"
          :clone="cloneElement" :move="onMove">
          <template #item="{ element }">
            <div class="components-item" @click="addComponents(element)">
              <div class="components-body">
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                {{ element.title }}
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="center-board">
      <el-form ref="formRef" :model="formData" :rules="formRules">
        <draggable class="list-group el-row" :list="dragComponentList" group="people" item-key="field">
          <template #item="{ element, index }">
            <div :class="[aciveIndex == index ? 'active-item' : '', getClass(element)]"
              @click="activeItem(element, index)">
              <DraggableForm :formConfig="element" :formData="formData" ref="dialogMask" />
            </div>
          </template>
        </draggable>
      </el-form>
    </div>
    <div class="right-board">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="rightTabConfig">
        <el-tab-pane label="组件属性" name="componentProps">
          <div style="padding:8px 30px 0 8px" v-if="dragComponentList[aciveIndex]">
            <ElForms :formConfig="formConfig" :formData="formData" ref="dialogMask" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="表单属性" name="formProps">Config</el-tab-pane>
      </el-tabs>
      <el-button @click="submitForm">提交</el-button>
    </div>
  </div>
  <DialogIcon ref="dialogIcon" />
</template>

<script lang='ts'>
interface templateChildrenType extends FormInterface<Rules, Options> {
  title: string;
  icon: string;
}
interface templateType {
  title: string;
  icon: string;
  children?: Array<templateChildrenType>;
}

interface TemplateConfig {
  templateList: templateType[];
  formConfig: FormInterface<Rules, Options>[];
  centerList: templateType[];
  onMove: (e) => boolean;
  addComponents: (ele: FormInterface<Rules, Options>) => void;
  getClass: (e: FormInterface<Rules, Options>) => string;
  activeItem: (e: FormInterface<Rules, Options>, index: number) => void;
  dragComponentList: Array<FormInterface<Rules, Options>>;
  formData: any;
  formRules: {
    [x: string]: Rules[];
  };
  submitForm: () => void;
  cloneElement: (item: FormInterface<Rules, Options>) => FormInterface<Rules, Options>;
  aciveIndex: number;
  activeName: string;
  handleClick: (tab: TabsPaneContext, event: Event) => void;
  hidenField: (hideArr: string[], showArr: string[]) => void;
}
import { reactive, toRefs, defineComponent, ToRefs, ref, Ref } from 'vue';
import draggable from "vuedraggable";
import DraggableForm from "@/components/ElForm/DraggableForm.vue";
import ElForms from "@/components/ElForm/ElForms.vue";
import { FormInterface, Rules, Options } from '#/form-config';
import _ from 'lodash';
import { TabsPaneContext } from 'element-plus';
import DialogIcon from '@/components/DialogIcon/DialogIcon.vue';

export default defineComponent({
  name: 'TemplateConfig',
  props: [],
  setup() {

    const formRef = ref();
    const dialogIcon = ref() as Ref<InstanceType<typeof DialogIcon>>;

    const initState = (): TemplateConfig => {
      return {
        templateList: [
          {
            title: "输入型组件",
            icon: "Fold",
            children: [
              {
                title: "单行文本",
                icon: "ArrowLeft",
                type: "input",
                field: "input",
                isShow: true,
                defaultValue: "1",
                placeholder: "请输入单行文本",
                maxlength: 40,
                required: true,
                rules: [{ message: "请输入单行文本", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  type: 'text'
                },
                showWordLimit: true,
                clearable: true,
                labelWidth: "120px"
              },
              {
                title: "多行文本",
                icon: "ArrowLeft",
                type: "textarea",
                field: "textarea",
                isShow: true,
                defaultValue: "",
                placeholder: "请输入多行文本",
                maxlength: 40,
                required: true,
                rules: [{ message: "请输入多行文本", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                  type: 'textarea'
                },
                labelWidth: "120px"
              },
              {
                title: "密码",
                icon: "ArrowLeft",
                type: "input",
                field: "password",
                isShow: true,
                defaultValue: "",
                placeholder: "请输入密码",
                maxlength: 40,
                required: true,
                rules: [{ message: "请输入密码", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                  'show-password': true,
                  type: "password"
                },
                labelWidth: "120px"
              },
              {
                title: "计数器",
                icon: "ArrowLeft",
                type: "inputNumber",
                field: "inputNumber",
                isShow: true,
                defaultValue: 3,
                placeholder: "请输入计数器",
                maxlength: 40,
                required: true,
                rules: [{ message: "请输入计数器", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                },
                max: 10,
                min: 1,
                step: 1,
                precision: 0,
                labelWidth: "120px"
              },
              // {
              //   title: "编辑器",
              //   icon: "ArrowLeft",
              // },
            ]
          },
          {
            title: "选择型组件",
            icon: "Fold",
            children: [
              {
                title: "下拉选择",
                icon: "ArrowLeft",
                type: "select",
                field: "select",
                defaultValue: "请选择下拉选择",
                maxlength: 40,
                required: true,
                isShow: true,
                rules: [{ message: "请选择下拉选择", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                options: [
                  {
                    label: "选项一",
                    value: 1,
                  },
                  {
                    label: "选项二",
                    value: 2,
                  },
                  {
                    label: "选项三",
                    value: 3,
                  },
                ]
              },
              {
                title: "级联选择",
                icon: "ArrowLeft",
                type: "cascader",
                field: "cascader",
                defaultValue: "请选择级联选择",
                maxlength: 40,
                isShow: true,
                required: true,
                rules: [{ message: "请选择级联选择", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                options: [
                  {
                    label: "选项1",
                    value: "1",
                    children: [
                      {
                        label: "选项1.1",
                        value: "1.1",
                        children: [
                          {
                            label: "选项1.1.1",
                            value: "1.1.1",
                          },
                          {
                            label: "选项1.1.2",
                            value: "1.1.2",
                          },
                          {
                            label: "选项1.1.3",
                            value: "1.1.3",
                          },
                        ],
                      },
                      {
                        label: "选项1.2",
                        value: "1.2",
                        children: [
                          {
                            label: "选项1.2.1",
                            value: "1.2.1",
                          },
                          {
                            label: "选项1.2.2",
                            value: "1.2.2",
                          },
                        ],
                      },
                    ],
                  },
                ]
              },
              {
                title: "单选框组",
                icon: "ArrowLeft",
                type: "radioGroup",
                field: "radioGroup",
                defaultValue: "请选择单选框组",
                maxlength: 40,
                isShow: true,
                required: true,
                rules: [{ message: "请选择单选框组", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                options: [
                  {
                    label: "选项一",
                    value: 1,
                  },
                  {
                    label: "选项二",
                    value: 2,
                  },
                  {
                    label: "选项三",
                    value: 3,
                  },
                ]
              },
              {
                title: "多选框组",
                icon: "ArrowLeft",
                type: "checkboxGroup",
                field: "checkboxGroup",
                defaultValue: "请选择多选框组",
                maxlength: 40,
                isShow: true,
                required: true,
                rules: [{ message: "请选择多选框组", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                options: [
                  {
                    label: "选项一",
                    value: 1,
                  },
                  {
                    label: "选项二",
                    value: 2,
                  },
                  {
                    label: "选项三",
                    value: 3,
                  },
                ]
              },
              {
                title: "开关",
                icon: "ArrowLeft",
                type: "switch",
                field: "delFlag",
                defaultValue: 0,
                maxlength: 40,
                required: true,
                rules: [{ message: "请输入是否显示", required: true, trigger: "blur" }],
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
                title: "滑块",
                icon: "ArrowLeft",
                type: "slider",
                field: "span",
                isShow: true,
                defaultValue: 12,
                placeholder: "请选择滑块",
                maxlength: 40,
                required: true,
                rules: [{ message: "请选择滑块", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                  min: 1,
                  max: 24
                },
                labelWidth: "120px"
              },
              {
                title: "时间",
                icon: "ArrowLeft",
                type: "timePicker",
                field: "timePicker",
                isShow: true,
                // defaultValue: "16:54:26",
                placeholder: "请选择时间",
                maxlength: 40,
                required: true,
                rules: [{ message: "请选择时间", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                  format: 'HH:mm:ss',
                  "value-format": "HH:mm:ss",
                },
                labelWidth: "120px"
              },
              {
                title: "时间范围",
                icon: "ArrowLeft",
                type: "timePicker",
                field: "timePicker",
                isShow: true,
                // defaultValue: "",
                placeholder: "请选择时间范围",
                maxlength: 40,
                required: true,
                rules: [{ message: "请选择时间范围", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                  "is-range": true,
                  format: 'HH:mm:ss',
                  "value-format": "HH:mm:ss",
                },
                labelWidth: "120px"
              },
              {
                title: "日期",
                icon: "ArrowLeft",
                type: "datePicker",
                field: "datePicker",
                isShow: true,
                defaultValue: "",
                placeholder: "请选择日期",
                maxlength: 40,
                required: true,
                rules: [{ message: "请选择日期", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                  format: 'YYYY-MM-DD',
                  "value-format": "YYYY-MM-DD",
                },
                labelWidth: "120px"
              },
              {
                title: "日期范围",
                icon: "ArrowLeft",
                type: "datePicker",
                field: "datetimerange",
                isShow: true,
                defaultValue: "",
                placeholder: "请选择日期范围",
                maxlength: 40,
                required: true,
                rules: [{ message: "请选择日期范围", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  type: "datetimerange",
                  clearable: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                  "value-format": "YYYY-MM-DD HH:mm:ss",
                  shortcuts: [
                    {
                      text: '过去一周',
                      value: () => {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        return [start, end];
                      },
                    },
                    {
                      text: '过去一个月',
                      value: () => {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                      },
                    },
                    {
                      text: '过去三个月',
                      value: () => {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        return [start, end];
                      },
                    },
                  ],
                  'range-separator': "至",
                  'start-placeholder': "开始时间",
                  'end-placeholder': "结束时间",
                },
                labelWidth: "120px"
              },
              {
                title: "评分",
                icon: "ArrowLeft",
                type: "rate",
                field: "rate",
                isShow: true,
                defaultValue: "",
                placeholder: "请选择评分",
                maxlength: 40,
                required: true,
                rules: [{ message: "请选择评分", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                  "allow-half": true
                },
                labelWidth: "120px"
              },
              {
                title: "颜色",
                icon: "ArrowLeft",
                type: "colorPicker",
                field: "colorPicker",
                isShow: true,
                defaultValue: "",
                placeholder: "请选择颜色",
                maxlength: 40,
                required: true,
                rules: [{ message: "请选择颜色", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                },
                labelWidth: "120px"
              },
              // {
              //   title: "上传",
              //   icon: "ArrowLeft"
              // },
            ]
          },
          // {
          //   title: "布局型组件",
          //   icon: "Fold",
          //   children: [
          //     {
          //       title: "行容器",
          //       icon: "ArrowLeft",
          //       type: "row",
          //       field: "field",
          //       required: false,
          //       col: {
          //         span: 24,
          //       },
          //     },
          //     // {
          //     //   title: "按钮",
          //     //   icon: "ArrowLeft"
          //     // },
          //   ]
          // }
        ],
        formConfig: [
          {
            title: "组件类型",
            type: "select",
            field: "type",
            isShow: true,
            placeholder: "请选择组件类型",
            required: false,
            col: {
              span: 24,
            },
            options: [
              {
                label: "单行文本",
                value: 'input',
              },
              {
                label: "多行文本",
                value: 'textarea',
              },
              {
                label: "密码",
                value: 'password',
              },
              {
                label: "计数器",
                value: 'inputNumber',
              },
              {
                label: "下拉选择",
                value: 'select',
              },
              {
                label: "级联选择",
                value: 'cascader',
              },
              {
                label: "单选框组",
                value: 'radioGroup',
              },
              {
                label: "多选框组",
                value: 'checkboxGroup',
              },
              {
                label: "滑块",
                value: 'slider',
              },
              {
                label: "时间",
                value: 'timePicker',
              },
              {
                label: "时间范围",
                value: 'timePicker',
              },
              {
                label: "日期",
                value: 'datePicker',
              },
              {
                label: "日期范围",
                value: 'datePicker',
              },
              {
                label: "评分",
                value: 'rate',
              },
              {
                label: "颜色",
                value: 'colorPicker',
              },
            ],
            labelWidth: "120px"
          },
          {
            title: "标题",
            type: "input",
            field: "title",
            isShow: true,
            placeholder: "请输入标题",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "字段名",
            type: "input",
            field: "field",
            isShow: true,
            placeholder: "请输入字段名",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "占位提示",
            type: "input",
            field: "placeholder",
            isShow: true,
            placeholder: "请输入占位提示",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "表单栅格",
            type: "slider",
            field: "span",
            isShow: true,
            placeholder: "请选择表单栅格",
            required: false,
            defaultValue:12,
            col: {
              span: 24,
            },
            props: {
              min: 1,
              max: 24,
            },
            on: {
              input: (val: string | number | string[] | number[]) => {
                model.dragComponentList[model.aciveIndex].col!.span = (val as number)
              }
            },
            labelWidth: "120px"
          },
          {
            title: "标签宽度",
            type: "input",
            field: "labelWidth",
            isShow: true,
            placeholder: "请输入标签宽度",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "默认值",
            type: "input",
            field: "defaultValue",
            isShow: true,
            placeholder: "请输入默认值",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "前缀",
            type: "input",
            field: "prepend",
            isShow: true,
            placeholder: "请输入前缀",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "后缀",
            type: "input",
            field: "append",
            isShow: true,
            placeholder: "请输入后缀",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "前图标",
            type: "input",
            field: "prefixIcon",
            isShow: true,
            placeholder: "请输入前图标",
            required: false,
            col: {
              span: 24,
            },
            sloatsOn: {
              click: async () => {
                let data = await dialogIcon.value.openIconDialog();
                dialogIcon.value.resetState();
                model.formData.prefixIcon = data;
                console.log(model.formData.prefixIcon,111 )
              }
            },
            labelWidth: "120px",
            append: '选择',
            readonly: true
          },
          {
            title: "后图标",
            type: "input",
            field: "suffixIcon",
            isShow: true,
            placeholder: "请输入后图标",
            required: false,
            col: {
              span: 24,
            },
            sloatsOn: {
              click: async () => {
                let data = await dialogIcon.value.openIconDialog();
                dialogIcon.value.resetState();
                model.formData.suffixIcon = data;
                console.log(model.formData.suffixIcon,222 )
              }
            },
            readonly: true,
            append: '选择',
            labelWidth: "120px"
          },
          {
            title: "最多输入",
            type: "input",
            field: "maxlength",
            isShow: true,
            placeholder: "请输入最多输入",
            required: false,
            col: {
              span: 24,
            },
            props: {
              append: "个字符"
            },
            labelWidth: "120px"
          },
          // inputNumber
          // props: {
          // clearable: true,
          // max: 10,
          // min: 1
          // },
          {
            title: "最小值",
            type: "inputNumber",
            field: "min",
            isShow: false,
            placeholder: "请输入最小值",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "最大值",
            type: "inputNumber",
            field: "max",
            isShow: false,
            placeholder: "请输入最大值",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            // :step="2" step-strictly
            title: "步长",
            type: "inputNumber",
            field: "step",
            isShow: false,
            placeholder: "请输入步长",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "精度",
            type: "inputNumber",
            field: "precision",
            isShow: false,
            placeholder: "请输入精度",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "显示标签",
            type: "switch",
            field: "isShow",
            isShow: true,
            placeholder: "请选择显示标签",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "输入统计",
            type: "switch",
            field: "showWordLimit",
            isShow: true,
            placeholder: "请选择输入统计",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "能否清空",
            type: "switch",
            field: "clearable",
            isShow: true,
            placeholder: "请选择能否清空",
            defaultValue: true,
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "是否禁用",
            type: "switch",
            field: "disabled",
            isShow: true,
            placeholder: "请选择显示标签",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
          {
            title: "是否必填",
            type: "switch",
            field: "required",
            isShow: true,
            placeholder: "请选择是否必填",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px"
          },
        ],
        centerList: [],
        onMove: (e) => {
          if (e.to.className.indexOf('list-group') > -1) return true;
          return false;
        },
        addComponents: (ele: FormInterface<Rules, Options>) => {
          const e = _.cloneDeep(ele)
          model.formData = e;
          model.cloneElement(e);
          model.dragComponentList.push(e);
        },
        getClass: (e) => {
          let classArr = ["el-col"];
          for (const key in e?.col) {
            if (key == "span") {
              classArr.push(`el-col-${e.col[key]}`);
            } else {
              classArr.push(`el-col-${key}-${e.col[key]}`);
            }
          }
          return classArr.join(' ');
        },
        hidenField: (hideArr: string[], showArr: string[]) => {
          model.formConfig = initState().formConfig;
          let hideField = model.formConfig.filter(obj => hideArr.includes(obj.field));
          hideField.forEach(item => {
            item.isShow = false;
          });
          let showField = model.formConfig.filter(obj => showArr.includes(obj.field));
          showField.forEach(item => {
            item.isShow = true;
          });
        },
        activeItem: (e: FormInterface<Rules, Options>, index: number) => {
          if (model.aciveIndex == index) return;
          let hideArr: string[] = [];
          let showArr: string[] = [];
          switch (e.type) {
            case 'textarea':
              hideArr = ['prepend', 'append', 'prefixIcon', 'suffixIcon'];
              model.hidenField(hideArr, showArr);
              break;
            case 'inputNumber':
              hideArr = ['prepend', 'append', 'prefixIcon', 'suffixIcon', 'showWordLimit', 'clearable'];
              showArr = ['min', 'max', 'step', 'precision'];
              model.hidenField(hideArr, showArr);
              break;
            default:
              model.hidenField(hideArr, showArr);
              break;
          }
          console.log(e, index);
          model.aciveIndex = index;
          model.formData = e;
        },
        dragComponentList: [],
        formData: {},
        formRules: {},
        submitForm: () => {
          console.log(model.formData, model.dragComponentList);
          formRef.value?.resetFields?.();
          formRef.value?.clearValidate?.();
        },
        cloneElement: (item: FormInterface<Rules, Options>) => {
          const row = item;
          row.field += model.dragComponentList.length;
          // 默认值
          if (row.defaultValue) {
            model.formData[row.field] = row.defaultValue;
          }
          model.formData.span = 12
          // if(row.rules){
          //   model.formRules[row.field] = row.rules
          // }
          return row;
        },
        aciveIndex: 0,
        handleClick: (tab: TabsPaneContext, event: Event) => {
          console.log(tab, event);
        },
        activeName: "componentProps"
      };
    };
    const model: TemplateConfig = reactive(initState());
    let data: ToRefs<TemplateConfig> = toRefs(model);


    return {
      ...data,
      formRef,
      dialogIcon,
    };
  },
  components: {
    draggable,
    DraggableForm,
    ElForms,
    DialogIcon
  }
});
</script>
<style lang='stylus' scoped>
.templateConfig{
  position: relative;
  padding:8px 8px 0 8px
}
.left-board{
  width: 260px
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  padding:8px
}
.components-title{
  font-size: 14px;
  color: #222;
  margin: 6px 2px;
}
.center-board{
  height: calc(100vh - 8px);
  width: auto;
  margin: 0 350px 0 260px;  
}
.list-group{
  width:100%
}
.right-board{
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;  
}
.components-item {
    display: inline-block;
    width: 48%;
    margin: 1%;
    -webkit-transition: -webkit-transform 0ms!important;
    transition: -webkit-transform 0ms!important;
    transition: transform 0ms!important;
    transition: transform 0ms,-webkit-transform 0ms!important;
}
.components-body{
  padding: 8px 10px;
  background: #f6f7ff;
  font-size: 12px;
  cursor: move;
  border: 1px dashed #f6f7ff;
  border-radius: 3px;  
}
.components-body:hover {
  border: 1px dashed #787be8;
  color: #787be8;
}
.active-item{
  background: #f6f7ff;
  border-radius: 6px;  
}
/deep/ .el-tabs__nav{
  width:100%
}
/deep/ .el-tabs__item{
  width:50%;
  text-align:center
}
/deep/.el-input-group__append{
  padding:0
}
/deep/.pointer{
  cursor: pointer;
  padding:0 20px
}
</style>