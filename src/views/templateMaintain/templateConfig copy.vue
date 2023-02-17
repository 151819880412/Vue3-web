<template>
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
            <div class="components-item">
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
        <nested-draggable :nestedDraggableList="dragComponentList" :formData="formData">
      </nested-draggable>
      <!-- <draggable class="list-group el-row" :list="dragComponentList" group="people" item-key="field">
          <template #item="{ element }">
            <div :class="getClass(element)">
            {{ element }}
              <DraggableForm :formConfig="element" :formData="formData" ref="dialogMask" />
            </div>
          </template>
        </draggable> -->
      </el-form>


    </div>
    <div class="right-board">
      right-board
      <el-button @click="submitForm">提交</el-button>
    </div>
  </div>
</template>

<script lang='ts'>
interface templateChildrenType extends FormInterface<Rules, Options> {
  title: string;
  icon: string;
}
interface templateType {
  title: string;
  icon: string;
  children?: templateChildrenType[];
}

interface TemplateConfig {
  templateList: templateType[];
  centerList: templateType[];
  onMove: (e) => boolean;
  getClass: (e) => string;
  dragComponentList: Array<FormInterface<Rules, Options>>;
  formData: any;
  formRules: {
    [x: string]: Rules[];
  };
  submitForm: () => void;
  cloneElement: (item: FormInterface<Rules, Options>) => FormInterface<Rules, Options>;
}
import { reactive, toRefs, defineComponent, ToRefs, ref } from 'vue';
import draggable from "vuedraggable";
import DraggableForm from "@/components/ElForm/DraggableForm.vue";
import { FormInterface, Rules, Options } from '#/form-config';
import _ from 'lodash';

import nestedDraggable from "./aaa.vue";
    
// import templateMaintainImpl from '@/api/templateMaintain/index';
export default defineComponent({
  name: 'TemplateConfig',
  props: [],
  setup() {

    const formRef = ref();

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
                defaultValue: "",
                placeholder: "请输入单行文本",
                maxlength: 40,
                required: true,
                rules: [{ message: "请输入单行文本", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                },
                labelWidth: "120px"
              },
              {
                title: "多行文本",
                icon: "ArrowLeft",
                type: "input",
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
                  max: 10,
                  min: 1
                },
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
                field: "slider",
                isShow: true,
                defaultValue: 1,
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
                field: "field",
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
                field: "field",
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
          {
            title: "布局型组件",
            icon: "Fold",
            children: [
              {
                title: "行容器",
                icon: "ArrowLeft",
                type: "row",
                field: "field",
                required: false,
                col: {
                  span: 24,
                },
              },
              // {
              //   title: "按钮",
              //   icon: "ArrowLeft"
              // },
            ]
          }
        ],
        centerList: [],
        onMove: (e) => {
          if (e.to.className.indexOf('list-group') > -1) return true;
          return false;
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
        dragComponentList: [
              {
                title: "单行文本",
                type: "input",
                field: "input",
                isShow: true,
                defaultValue: "",
                placeholder: "请输入单行文本",
                maxlength: 40,
                required: true,
                rules: [{ message: "请输入单行文本", required: true, trigger: "blur" }],
                col: {
                  span: 12,
                },
                props: {
                  clearable: true,
                },
                labelWidth: "120px",
                children:[],
              },
              {
                title: "多行文本",
                type: "input",
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
                labelWidth: "120px",
                children:[],
              },
              {
                title: "密码",
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
                labelWidth: "120px",
                children:[],
              },
              {
                title: "计数器",
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
                  max: 10,
                  min: 1
                },
                labelWidth: "120px",
                children:[],
              },
              {
                title: "行容器",
                type: "row",
                field: "field",
                required: false,
                col: {
                  span: 24,
                },
                children:[],
              },
            ],
        formData: {a:1},
        formRules: {},
        submitForm: () => {
          console.log(model.formData);
          // formRef.value?.resetFields?.();
          // formRef.value?.clearValidate?.();
        },
        cloneElement: (item: FormInterface<Rules, Options>) => {
          const row = _.cloneDeep(item);
          row.field += model.dragComponentList.length;
          // 默认值
          if (row.defaultValue) {
            model.formData[row.field] = row.defaultValue;
          }
          // if(row.rules){
          //   model.formRules[row.field] = row.rules
          // }
          return row;
        }
      };
    };
    const model: TemplateConfig = reactive(initState());
    let data: ToRefs<TemplateConfig> = toRefs(model);

    return {
      ...data,
      formRef,
    };
  },
  components: {
    draggable,
    DraggableForm,
    nestedDraggable
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
</style>