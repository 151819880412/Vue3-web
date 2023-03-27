<template>
  <!-- <el-button @click="submitForm">提交</el-button> -->
  <div class="templateConfig">
    <div class="left-board">
      <div v-for="item in templateList" :key="item.title" style="margin-bottom: 20px">
        <div class="components-title">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.label }}
        </div>
        <draggable :list="item.children" :group="{ name: 'people', pull: 'clone', put: true }" item-key="name"
          :clone="cloneElement" :move="onMove">
          <template #item="{ element }">
            <div class="components-item" @click="addComponents(element)">
              <div class="components-body">
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                {{ element.label }}
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div class="center-board">
      <draggable class="list-group el-row" :list="dragComponentList" group="people" item-key="prop"
        @update="updateDrag">
        <template #item="{ element, index }">
          <div :class="[
              aciveIndex == index ? 'active-item' : '',
              getClass(element),
            ]" @click="activeItem(element, index)">
            <el-form :model="ceFormData" :rules="ceRules" ref="CEFormRef" style="padding: 40px">
              <el-form-item v-if="element.ceShow" v-bind="transformProps(element)">
                <component :is="element.component" v-model="ceFormData[element.prop]" v-bind="element" v-on="element" :update:modelvalue="updateModelvalue(element)">
                  <template v-for="item3 in element.slots" :key="item3.id" v-slot:[item3.slotName]="slotProp">
                    <span>{{ slotProp?.data?.label }}</span>
                    <div v-html="item3.slotHtml"></div>
                    <div v-if="item3.component">
                      <!-- 单选框和多选框的label和value是反的 -->
                      <div v-if="['el-radio-group','el-checkbox-group'].includes(element.component)">
                      <component v-for="item2 in item3.options" :key="item2.value" :is="item3.component"
                        v-bind="{ ...item3, ...item2 }" :label="item2.value">{{ item2.showLabel || item2.label }}</component>
                      </div>
                      <div v-else>
                        <component v-for="item2 in item3.options" :key="item2.value" :is="item2.component||item3.component"
                        v-bind="{ ...item3, ...item2 }">{{ item2.showLabel || item2.label }}</component>
                      </div>
                    </div>
                  </template>
                </component>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </draggable>
    </div>
    <div class="right-board">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="rightTabConfig">
        <el-tab-pane label="组件属性" name="componentProps">
          <div style="padding: 8px 30px 0 8px" v-if="dragComponentList[aciveIndex]">
            <el-form :model="dragComponentList[aciveIndex]" :rules="ceRules" ref="CEFormRef" style="padding: 10px">
              <div v-for="element in formConfig" :key="element.prop">
                <el-form-item v-if="element.ceShow" v-bind="element">
                  <component :is="element.component" v-model="dragComponentList[aciveIndex][element.prop]"
                    class="rightCom" v-bind="element" v-on="element">
                    <template v-for="item3 in element.slots" :key="item3.id" v-slot:[item3.slotName]="slotProp">
                      <span>{{ slotProp?.data?.label }}</span>
                      <div v-html="item3.slotHtml" v-on="item3" v-bind="item3"></div>
                      <div v-if="item3.component">
                        <div v-for="item2 in item3.options" :key="item2.value">
                          <component :is="item3.component" v-if="typeof item2.ceShow==='function'?item2.ceShow():item2.ceShow"
                          v-bind="{ ...item3, ...item2 }" v-on="item2">{{ item2.showLabel || item2.label }}</component>
                        </div>
                      </div>
                    </template>
                  </component>
                </el-form-item>
              </div>
              <div v-if="showOptions(dragComponentList[aciveIndex])">
                <el-divider>
                  <span>选项</span>
                </el-divider>
                  <draggable :list="dragComponentList[aciveIndex].slots[0].options" :animation="340" group="selectItem" handle=".option-drag">
                    <template #item="{ element,index }">
                      <div style="display:flex;align-items: center;margin:8px">
                        <div class="select-line-icon option-drag">
                          <el-icon>
                            <operation />
                          </el-icon>
                        </div>
                        <el-input placeholder="选项名" v-model="element.label" />
                        <el-input placeholder="选项值" v-model="element.value" />
                        <el-icon class="close-btn select-line-icon" @click="changeOption(false,index)">
                          <remove />
                        </el-icon>
                      </div>
                    </template>
                  </draggable>
                  <div style="margin-left: 20px">
                    <el-button  icon="circle-plus" type="text" @click="changeOption(true,NaN)">
                      添加规则
                    </el-button>
                  </div>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="表单属性" name="formProps">Config</el-tab-pane>
      </el-tabs>
      <el-button @click="submitForm">提交</el-button>
      <el-button @click="backSys">返回</el-button>
    </div>

    <DialogIcon ref="dialogIcon" />
  </div>
</template>

<script lang="ts">
interface templateConfig {
  templateList: any[];
  dragComponentList: Array<any>;
  aciveIndex: number;
  cloneElement: (item) => void;
  onMove: (e) => boolean;
  addComponents: (ele) => void;
  getClass: (e) => string;
  activeItem: (e, index: number) => void;
  hidenField: (hideArr: string[], showArr: string[]) => void;
  ceFormData: any;
  ceRules: any;
  updateDrag: (e) => void;
  handleClick: (tab: TabsPaneContext, event: Event) => void;
  activeName: string;
  formConfig: any;
  changeOption:(type:boolean,index:number)=>void
  showOptions:(row)=>boolean

}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ElMessage, TabsPaneContext } from "element-plus";
import _ from "lodash";
import {
  reactive,
  toRefs,
  defineComponent,
  ToRefs,
  Ref,
  ref,
} from "vue";
import draggable from "vuedraggable";
import ElForms from "@/components/ElForm/ElForms.vue";
import { CEComponent } from "@/@types/CEForm/CEIndex";
import DialogIcon from "@/components/DialogIcon/DialogIcon.vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "templateConfig",
  props: [],
  setup() {
    const dialogIcon = ref() as Ref<InstanceType<typeof DialogIcon>>;

    const initState = (): templateConfig => {
      return {
        templateList: [
          {
            label: "输入型组件",
            icon: "Fold",
            children: [
              {
                label: "单行文本",
                prop: "input",
                component: "el-input",
                placeholder: "请输入内容",
                disabled: false,
                clearable: true,
                readonly: false,
                autofocus: false,
                name: "inputName",
                rules: [
                  {
                    required: true,
                    message: "请输入内容",
                    trigger: "blur",
                  },
                ],
                resize: "none",
                slots: [
                  // {
                  //   slotName: "prefix",
                  //   slotHtml: "<span>111</span>",
                  // },
                  // {
                  //   slotName: "suffix",
                  //   slotHtml: "<span>222</span>",
                  // },
                  // {
                  //   slotName: "prepend",
                  //   slotHtml: "<span>222</span>",
                  // },
                  // {
                  //   slotName: "append",
                  //   slotHtml: "<span>222</span>",
                  // },
                ],
                type: "text",
              },
              {
                label: "多行文本",
                prop: "textarea",
                component: "el-input",
                placeholder: "请输入内容",
                disabled: false,
                clearable: true,
                readonly: false,
                autofocus: false,
                name: "inputName",
                rules: [
                  {
                    required: true,
                    message: "请输入内容",
                    trigger: "blur",
                  },
                ],
                type: "textarea",
              },
              {
                label: "密码",
                prop: "password",
                component: "el-input",
                placeholder: "请输入内容",
                disabled: false,
                clearable: true,
                readonly: false,
                autofocus: true,
                name: "inputName",
                showPassword: true,
                rules: [
                  {
                    required: true,
                    message: "请输入内容",
                    trigger: "blur",
                  },
                ],
                resize: "none",
                type: "password",
                // "update:modelValue":(val)=>{
                //   console.log(val)
                //   return true
                // }
              },
              {
                label: "计数器",
                prop: "inputNumber",
                component: "el-input-number",
                // width: 100,
                // value: 1,
                // size: 1,
                min: 0,
                max: 100,
                step: 1,
                stepStrictly: false,
                // precision: '',
                disabled: false,
                controls: true,
                controlsPosition: "",
                name: "inputNumber",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "Please enter a number",
                    trigger: "change",
                  },
                ],
              },
            ],
          },
          {
            label: "选择型组件",
            icon: "Fold",
            children: [
              {
                label: "下拉选择",
                prop: "select",
                component: "el-select",
                placeholder: "请选择",
                multiple: false,
                disabled: false,
                clearable: false,
                collapseTags: false,
                multipleLimit: 0,
                remote: false,
                filterable: false,
                remoteMethod: undefined,
                loading: false,
                loadingText: "加载中",
                noMatchText: "无匹配数据",
                noDataText: "暂无数据",
                popperClass: "",
                reserveKeyword: false,
                defaultFirstOption: false,
                size: "default",
                // prefixIcon: '',
                // suffixIcon: '',
                // onChange: (val: string | string[]) => console.log('select changed to: ', val),
                // onFocus: () => console.log('select focused'),
                // onBlur: () => console.log('select blurred'),
                name: "select",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "请选择一个选项",
                    trigger: "change",
                  },
                ],
                slots: [
                  {
                    slotName: "default",
                    component: "el-option",
                    options: [
                      {
                        label: "选项1",
                        value: "option1",
                      },
                      {
                        label: "选项2",
                        value: "option2",
                      },
                      {
                        label: "选项3",
                        value: "option3",
                      },
                    ],
                  },
                ],
                filterMethod: (query: string, option: any) => {
                  return option.label.indexOf(query) !== -1;
                },
              },

              {
                label: "级联选择",
                prop: "cascader",
                component: "el-cascader",
                slots: [
                  {
                    slotName: "default",
                  },
                ],
                options: [
                  {
                    value: "zhinan",
                    label: "指南",
                    children: [
                      {
                        value: "shejiyuanze",
                        label: "设计原则",
                        children: [
                          {
                            value: "yizhi",
                            label: "一致",
                          },
                          {
                            value: "fankui",
                            label: "反馈",
                          },
                          {
                            value: "xiaolv",
                            label: "效率",
                          },
                          {
                            value: "kekong",
                            label: "可控",
                          },
                        ],
                      },
                    ],
                  },
                ],
                props: {
                  value: "value",
                  label: "label",
                  children: "children",
                },
                value: "",
                size: "",
                placeholder: "请选择",
                disabled: undefined,
                clearable: true,
                // changeOnSelect: false,
                filterable: false,
                separator: "/",
                // beforeFilter: (queryString: string, options: any[]) => {
                //   console.log('before filter');
                //   return options.filter(option => option.label.toLowerCase().includes(queryString.toLowerCase()));
                // },
                // onChange: (val: string[]) => console.log('cascader changed to: ', val),
                // onFocus: () => console.log('cascader focused'),
                // onBlur: () => console.log('cascader blurred'),
                name: "cascader",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "Please select an option",
                    trigger: "change",
                  },
                ],
              },
              {
                label: "单选框组",
                prop: "radioGroup",
                component: "el-radio-group",
                // value: '选项2',
                size: "",
                fill: "#20A0FF",
                textColor: "",
                disabled: false,
                // border: false,
                // onChange: (val: string) => console.log('radio group changed to: ', val),
                // onFocus: () => console.log('radio group focused'),
                // onBlur: () => console.log('radio group blurred'),
                name: "radioGroup",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "Please select an option",
                    trigger: "change",
                  },
                ],
                slots: [
                  {
                    slotName: "default",
                    label: "Radio",
                    prop: "radio",
                    component: "el-radio",
                    options: [
                      {
                        label: "选项1",
                        value:'1',
                      },
                      {
                        label: "选项2",
                        value:'2',
                      },
                      {
                        label: "选项3",
                        value:'3',
                      },
                    ],
                    // defaultValue: '选项2',
                    disabled: false,
                    size: "default",
                    // textColor: '#ffffff',
                    // fill: '#409EFF',
                    // borderColor: '#409EFF',
                    // onChange: (val: string) => console.log('radio changed to: ', val),
                    // onFocus: () => console.log('radio focused'),
                    // onBlur: () => console.log('radio blurred'),
                    name: "radio-group",
                    // validateEvent: true,
                    rules: [
                      {
                        required: true,
                        message: "请选择一个选项",
                        trigger: "change",
                      },
                    ],
                  },
                ],
              },

              {
                label: "多选框组",
                prop: "checkboxGroup",
                component: "el-checkbox-group",
                size: "",
                // fill: '#20A0FF',
                // textColor: '',
                disabled: false,
                border: false,
                rules: [
                  {
                    required: true,
                    message: "请勾选",
                    trigger: "change",
                  },
                ],
                required: true,
                slots: [
                  {
                    slotName: "default",
                    label: "Checkbox",
                    prop: "checkbox",
                    component: "el-checkbox",
                    // trueLabel: '选中时的值',
                    // falseLabel: '未选中时的值',
                    checked: false,
                    disabled: false,
                    size: "default",
                    border: false,
                    indeterminate: false,
                    // onChange: (val: boolean) => console.log('checkbox changed to: ', val),
                    // onFocus: () => console.log('checkbox focused'),
                    // onBlur: () => console.log('checkbox blurred'),
                    name: "checkbox-group",
                    validateEvent: true,
                    rules: [
                      {
                        required: true,
                        message: "请勾选",
                        trigger: "change",
                      },
                    ],
                    options: [
                      {
                        label: "选项1",
                        value:'11',
                      },
                      {
                        label: "选项2",
                        value:'22',
                      },
                      {
                        label: "选项3",
                        value:'33',
                      },
                    ],
                  },
                ],
              },

              {
                label: "滑块",
                prop: "slider",
                component: "el-slider",
                min: 0,
                max: 100,
                step: 1,
                disabled: false,
                showInput: false,
                showInputControls: true,
                inputSize: "small",
                showStops: false,
                showTooltip: true,
                formatTooltip: (val: number) => val.toString(),
                range: false,
                vertical: false,
                height: "",
                // onChange: (val: number | number[]) => console.log('slider changed to: ', val),
                // onFocus: () => console.log('slider focused'),
                // onBlur: () => console.log('slider blurred'),
                name: "slider",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "请滑动选择一个值",
                    trigger: "change",
                  },
                ],
              },
              {
                label: "开关",
                prop: "switch",
                component: "el-switch",
                // activeIconClass: '',
                // inactiveIconClass: '',
                activeText: "",
                inactiveText: "",
                activeColor: "#409EFF",
                inactiveColor: "#C0CCDA",
                activeValue: true,
                inactiveValue: false,
                disabled: false,
                // onChange: (val: boolean) => console.log('switch changed to: ', val),
                // onFocus: () => console.log('switch focused'),
                // onBlur: () => console.log('switch blurred'),
                name: "switch",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "请切换开关",
                    trigger: "change",
                  },
                ],
              },
              {
                label: "日期选择",
                prop: "timePicker",
                component: "el-date-picker",
                type: "datetime",
                placeholder: "请选择日期",
                readonly: false,
                editable: true,
                disabled: false,
                clearable: true,
                size: "default",
                popperClass: "",
                startPlaceholder: "",
                endPlaceholder: "",
                isRange: false,
                arrowControl: true,
                format: "YYYY-MM-DD HH:mm:ss",
                valueFormat: "YYYY-MM-DD HH:mm:ss",
                // pickerOptions: {
                //   selectableRange: '00:00:00-23:59:59',
                //   format: 'HH:mm:ss',
                //   start: '09:00:00',
                //   step: '00:15:00',
                //   end: '18:00:00'
                // },
                // onChange: (val: string | string[]) => console.log('time changed to: ', val),
                // onFocus: () => console.log('time focused'),
                // onBlur: () => console.log('time blurred'),
                name: "timePicker",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "Please select a time",
                    trigger: "change",
                  },
                ],
              },
              {
                label: "日期范围",
                prop: "datePicker",
                component: "el-date-picker",
                placeholder: "请选择日期范围",
                type: "datetimerange",
                readonly: false,
                editable: true,
                disabled: false,
                clearable: true,
                size: "default",
                popperClass: "",
                valueFormat: "YYYY-MM-DD HH:mm:ss",
                format: "YYYY-MM-DD HH:mm:ss",
                shortcuts: [
                  {
                    text: "Today",
                    onClick: () => console.log("Today clicked"),
                  },
                  {
                    text: "Yesterday",
                    onClick: () => console.log("Yesterday clicked"),
                  },
                  {
                    text: "Last week",
                    onClick: () => console.log("Last week clicked"),
                  },
                ],
                // onChange: (val: string | string[]) => console.log('date changed to: ', val),
                // onFocus: () => console.log('date focused'),
                // onBlur: () => console.log('date blurred'),
                name: "datePicker",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "Please select a date",
                    trigger: "change",
                  },
                ],
              },
              {
                label: "评分",
                prop: "rate",
                component: "el-rate",
                colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
                voidColor: "#C6D1DE",
                disabledVoidColor: "#EFF2F7",
                // iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
                // voidIconClass: 'el-icon-star-off',
                // disabledVoidIconClass: 'el-icon-star-on',
                // voidTextColor: '#C6D1DE',
                allowHalf: false,
                showText: false,
                showScore: false,
                scoreTemplate: "{value}",
                texts: ["Very Bad", "Bad", "Normal", "Good", "Very Good"],
                textColor: "#1F2D3D",
                disabled: false,
                max: 5,
                // onChange: (val: number) => console.log('rate changed to: ', val),
                // onFocus: () => console.log('rate focused'),
                // onBlur: () => console.log('rate blurred'),
                name: "rate",
                // validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "Please rate this",
                    trigger: "change",
                  },
                ],
                ceShow:true
              },
              {
                label: "颜色选择",
                prop: "colorPicker",
                component: "el-color-picker",
                disabled: false,
                showAlpha: false,
                colorFormat: "hex",
                // onChange: (val: string) => console.log('color changed to: ', val),
                // onFocus: () => console.log('color picker focused'),
                // onBlur: () => console.log('color picker blurred'),
                name: "colorPicker",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "Please select a color",
                    trigger: "change",
                  },
                ],
              },
              {
                label: "上传",
                prop: "file",
                component: "el-upload",
                action: "https://jsonplaceholder.typicode.com/posts/",
                headers: {},
                multiple: false,
                data: {},
                // name: 'file',
                withCredentials: false,
                showFileList: true,
                fileList: [],
                autoUpload: true,
                accept: "",
                listType: "text",
                disabled: false,
                limit: 0,
                slots: [{
                  slotName: "default",
                  component: "el-button",
                  // slotHtml: `<aaa type="primary">点击上传</aaa>`,
                  options:[{
                    label: "点击上传",
                    prop: "button",
                    class:"123",
                    component: "el-button",
                    width: 100,
                    type: "primary",
                    size: "",
                    icon: "",
                    nativeType: "button",
                    loading: false,
                    disabled: false,
                    plain: false,
                    autofocus: false,
                    round: false,
                    circle: false,
                    // onClick: (event: Event) =>
                    //   console.log("button clicked", event),
                    // onFocus: () => console.log("button focused"),
                    // onBlur: () => console.log("button blurred"),
                  }]
                }],
                fileSize:10,
                beforeUpload: (file: File) => {
                  console.log(file.size / 1024 / 1024,)
                  const fileSize = file.size / 1024 / 1024
                  if (fileSize>model.dragComponentList[model.aciveIndex].fileSize) {
                    ElMessage({
                    message:"文件大小超出限制",
                    type: "error",
                  });
                    return false;
                  }
                  return true;
                },
                // onRemove: (file: object, fileList: object[]) => console.log('file removed', file, fileList),
                // onSuccess: (response: object, file: object, fileList: object[]) => console.log(
                //   'file uploaded successfully', response, file, fileList),
                // onError: (err: Error, file: object, fileList: object[]) => console.log('file upload error', err, file,
                //   fileList),
                // onChange: (file: object, fileList: object[]) => console.log('file changed', file, fileList),
                // onPreview: (file: object) => console.log('file previewed', file),
                // onFocus: () => console.log('upload focused'),
                // onBlur: () => console.log('upload blurred'),
                name: "file",
                rules: [
                  {
                    required: true,
                    message: "Please upload a file",
                    trigger: "change",
                  },
                ],
              },
              {
                label: "穿梭框",
                prop: "transfer",
                component: "el-transfer",
                data: [
                  {
                    value: 1,
                    label: "备选项1",
                    disabled: false,
                  },
                  {
                    value: 2,
                    label: "备选项2",
                    disabled: false,
                  },
                  {
                    value: 3,
                    label: "备选项3",
                    disabled: false,
                  },
                ],
                filterable: true,
                filterPlaceholder: "Search",
                filterMethod: (query: string, item: any) => {
                  return item.label.indexOf(query) > -1;
                },
                titles: ["Source", "Target"],
                buttonTexts: ["", ""],
                format: {
                  noChecked: "${total}",
                  hasChecked: "${checked}/${total}",
                },
                // 'button-texts': ['To left', 'To right'],
                // 'render-content': (h, option) => {
                //   return h('span', null, option.label);
                // },
                // footerFormat: '{total} items',
                props: {
                  label: "label",
                  key: "value",
                  disabled: "disabled",
                },
                targetOrder: "original",
                // selected: [],
                // onChange: (val: object[], direction: string, moveKeys: string[]) => {
                //   console.log(`transfer changed to: ${direction}, ${moveKeys}, ${val}`);
                // },
                // onFocus: () => console.log('transfer focused'),
                // onBlur: () => console.log('transfer blurred'),
                name: "transfer",
                validateEvent: true,
                rules: [
                  {
                    required: true,
                    message: "Please select at least one item",
                    trigger: "change",
                  },
                ],
              },
            ],
          },
        ],
        dragComponentList: [],
        aciveIndex: -1,
        cloneElement: (item) => {
          const com = _.cloneDeep(item);
          com.prop += model.dragComponentList.length;
          return com;
        },
        onMove: (e) => {
          if (e.to.className.indexOf("list-group") > -1) return true;
          return false;
        },
        addComponents: (ele) => {
          console.log(JSON.parse(JSON.stringify(ele)))
          console.log(JSON.parse(JSON.stringify(CEComponent(ele))),CEComponent(ele))
          const com = CEComponent(ele);
          com.prop += model.dragComponentList.length;
          console.log(ele, com, 111);
          model.dragComponentList.push(com);
          model.activeItem(ele,model.dragComponentList.length-1)
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
          return classArr.join(" ");
        },
        activeItem: (_e, index: number) => {
          if (model.aciveIndex == index) return;
          let hideArr: string[] = ['maxlength','prepend', 'append', 'prefixIcon', 'suffixIcon', 'showWordLimit', 'clearable','min', 'max', 'step', 'precision','activeText',
            'inactiveText','activeValue','inactiveValue','activeColor','inactiveColor','showStops','range','min', 'max', 'step','type','format','rangeSeparator'
          ];
          let showArr: string[] = [];
          model.aciveIndex = index;
          // 区分日期选择和日期范围
          model.dragComponentList[index].componentProps = model.dragComponentList[index].type?'el-'+model.dragComponentList[index].type:model.dragComponentList[index].component
          console.log(model.dragComponentList[index].componentProps)
          switch (model.dragComponentList[index].componentProps) {
            case 'el-textarea':
              model.hidenField(hideArr, showArr);
              break;
            case 'el-input-number':
              showArr = ['min', 'max', 'step', 'precision'];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-select':
              showArr = [];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-radio-group':
              showArr = [];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-checkbox-group':
              showArr = [];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-switch':
              showArr = ['activeText','inactiveText','activeValue','inactiveValue','activeColor','inactiveColor'];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-slider':
              showArr = ['showStops','range','min', 'max', 'step'];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-datetime':
              showArr = ['type','format'];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-datetimerange':
              showArr = ['type','format','rangeSeparator'];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-rate':
              showArr = ['max'];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-color-picker':
              showArr = [];
              model.hidenField(hideArr, showArr);
              break;
            case 'el-upload':
              showArr = ['name','accept','fileSize','action','listType','limit','autoUpload'];
              model.hidenField(hideArr, showArr);
              break;
            default:
              model.hidenField(hideArr, showArr);
              break;
          }
        },
        hidenField: (hideArr: string[], showArr: string[]) => {
          model.formConfig = initState().formConfig;
          let hideField = model.formConfig.filter(obj => hideArr.includes(obj.prop));
          hideField.forEach(item => {
            item.ceShow = false;
          });
          let showField = model.formConfig.filter(obj => showArr.includes(obj.prop));
          showField.forEach(item => {
            item.ceShow = true;
          });
        },
        ceFormData: {},
        ceRules: {},
        updateDrag: (e) => {
          model.aciveIndex = e.newIndex;
        },
        handleClick: (tab: TabsPaneContext, event: Event) => {
          console.log(tab, event);
        },
        activeName: "componentProps",
        formConfig: [
          {
            label: "组件类型",
            component: "el-select",
            prop: "componentProps",
            placeholder: "请选择组件类型",
            required: true,
            labelWidth: "120px",
            col: {
              span: 24,
            },
            slots: [
              {
                slotName: "default",
                component: "el-option",
                options: [
                  {
                    label: "单行文本",
                    value: "el-text",
                    ceShow:true,
                  },
                  {
                    label: "多行文本",
                    value: "el-textarea",
                    ceShow:true,
                  },
                  {
                    label: "密码",
                    value: "el-password",
                    ceShow:true,
                  },
                  {
                    label: "计数器",
                    value: "el-input-number",
                    ceShow:true,
                  },
                  {
                    label: "下拉选择",
                    value: "el-select",
                    ceShow:true,
                  },
                  {
                    label: "级联选择",
                    value: "el-cascader",
                    ceShow:true,
                  },
                  {
                    label: "单选框组",
                    value: "el-radioGroup",
                    ceShow:true,
                  },
                  {
                    label: "多选框组",
                    value: "el-checkbox-group",
                    ceShow:true,
                  },
                  {
                    label: "滑块",
                    value: "el-slider",
                    ceShow:true,
                  },
                  {
                    label: "日期选择",
                    value: "el-datetime",
                    ceShow:true,
                  },
                  {
                    label: "日期范围",
                    value: "el-datetimerange",
                    ceShow:true,
                  },
                  {
                    label: "评分",
                    value: "el-rate",
                    ceShow:true,
                  },
                  {
                    label: "颜色",
                    value: "el-color-picker",
                    ceShow:true,
                  },
                  {
                    label: "开关",
                    value: "el-switch",
                    ceShow:true,
                  },
                  {
                    label: "上传",
                    value: "el-upload",
                    ceShow:true,
                  },
                  {
                    label: "穿梭框",
                    value: "el-transfer",
                    ceShow:true,
                  },
                ],
              },
            ],
            ceShow: true,
          },
          {
            label: "标题",
            component: "el-input",
            prop: "label",
            placeholder: "请输入标题",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "字段名",
            component: "el-input",
            prop: "prop",
            placeholder: "请输入字段名",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "占位提示",
            component: "el-input",
            prop: "placeholder",
            placeholder: "请输入占位提示",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "表单栅格",
            component: "el-slider",
            prop: "col.span",
            placeholder: "请选择表单栅格",
            required: false,
            modelValue: 12,
            col: {
              span: 24,
            },
            props: {
              min: 1,
              max: 24,
            },
            "update:modelValue": (val: number) => {
              model.dragComponentList[model.aciveIndex].col.span = val;
              model.getClass(model.dragComponentList[model.aciveIndex]);
            },
            min: 0,
            max: 24,
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "标签宽度",
            component: "el-input",
            prop: "labelWidth",
            placeholder: "请输入标签宽度",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "默认值",
            component: "el-input",
            prop: "defaultValue",
            placeholder: "请输入默认值",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
            "update:modelValue": (val: string) => {
              model.dragComponentList[model.aciveIndex].modelValue = val;
              model.ceFormData[model.dragComponentList[model.aciveIndex].prop] = val
            },
          },
          {
            label: "前缀",
            component: "el-input",
            prop: "prepend",
            placeholder: "请输入前缀",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            "update:modelValue": (val: string) => {
              const slot = model.dragComponentList[
                model.aciveIndex
              ].slots.filter((item) => item.slotName === "prepend");
              if (val) {
                if (slot.length > 0) {
                  slot[0].slotHtml = "<span>" + val + "</span>";
                } else {
                  model.dragComponentList[model.aciveIndex].slots.push({
                    slotName: "prepend",
                    slotHtml: "<span>" + val + "</span>",
                  });
                }
              } else {
                const index = model.dragComponentList[
                  model.aciveIndex
                ].slots.findIndex((item) => item.slotName === "prepend");
                if (index !== -1) {
                  model.dragComponentList[model.aciveIndex].slots.splice(
                    index,
                    1
                  );
                }
              }
            },
            ceShow: true,
          },
          {
            label: "后缀",
            component: "el-input",
            prop: "append",
            placeholder: "请输入后缀",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            "update:modelValue": (val: string) => {
              const slot = model.dragComponentList[
                model.aciveIndex
              ].slots.filter((item) => item.slotName === "append");
              if (val) {
                if (slot.length > 0) {
                  slot[0].slotHtml = "<span>" + val + "</span>";
                } else {
                  model.dragComponentList[model.aciveIndex].slots.push({
                    slotName: "append",
                    slotHtml: "<span>" + val + "</span>",
                  });
                }
              } else {
                const index = model.dragComponentList[
                  model.aciveIndex
                ].slots.findIndex((item) => item.slotName === "append");
                if (index !== -1) {
                  model.dragComponentList[model.aciveIndex].slots.splice(
                    index,
                    1
                  );
                }
              }
            },
            ceShow: true,
          },
          {
            label: "前图标",
            component: "el-input",
            prop: "prefixIcon",
            placeholder: "请输入前图标",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            append: "选择",
            readonly: true,
            slots: [
              {
                slotName: "append",
                slotHtml: `<el-button type="primary">点击上传</el-button>`,
                style: "cursor: pointer",
                label: "Button",
                prop: "button",
                component: "el-button",
                width: 100,
                type: "primary",
                size: "",
                icon: "",
                nativeType: "button",
                loading: false,
                disabled: false,
                plain: false,
                autofocus: false,
                round: false,
                circle: false,
                click: async () => {
                  let data = await dialogIcon.value.openIconDialog();
                  dialogIcon.value.resetState();
                  model.dragComponentList[model.aciveIndex].prefixIcon = data;
                },
              },
            ],
            "update:modelValue": (val: string) => {
              const slot = model.dragComponentList[
                model.aciveIndex
              ].slots.filter((item) => item.slotName === "prefix");
              if (val) {
                if (slot.length > 0) {
                  slot[0].slotHtml = "<span>" + val + "</span>";
                } else {
                  model.dragComponentList[model.aciveIndex].slots.push({
                    slotName: "prefix",
                    slotHtml: "<span>" + val + "</span>",
                  });
                }
              } else {
                const index = model.dragComponentList[
                  model.aciveIndex
                ].slots.findIndex((item) => item.slotName === "prefix");
                if (index !== -1) {
                  model.dragComponentList[model.aciveIndex].slots.splice(
                    index,
                    1
                  );
                }
              }
            },
            ceShow: true,
          },
          {
            label: "后图标",
            component: "el-input",
            prop: "suffixIcon",
            placeholder: "请输入后图标",
            required: false,
            col: {
              span: 24,
            },
            slots: [
              {
                slotName: "append",
                slotHtml: `<el-button type="primary">点击上传</el-button>`,
                style: "cursor: pointer",
                label: "Button",
                prop: "button",
                component: "el-button",
                width: 100,
                type: "primary",
                size: "",
                icon: "",
                nativeType: "button",
                loading: false,
                disabled: false,
                plain: false,
                autofocus: false,
                round: false,
                circle: false,
                click: async () => {
                  let data = await dialogIcon.value.openIconDialog();
                  dialogIcon.value.resetState();
                  model.dragComponentList[model.aciveIndex].suffixIcon = data;
                },
              },
            ],
            readonly: true,
            append: "选择",
            labelWidth: "120px",
            "update:modelValue": (val: string) => {
              const slot = model.dragComponentList[
                model.aciveIndex
              ].slots.filter((item) => item.slotName === "suffix");
              if (val) {
                if (slot.length > 0) {
                  slot[0].slotHtml = "<span>" + val + "</span>";
                } else {
                  model.dragComponentList[model.aciveIndex].slots.push({
                    slotName: "suffix",
                    slotHtml: "<span>" + val + "</span>",
                  });
                }
              } else {
                const index = model.dragComponentList[
                  model.aciveIndex
                ].slots.findIndex((item) => item.slotName === "suffix");
                if (index !== -1) {
                  model.dragComponentList[model.aciveIndex].slots.splice(
                    index,
                    1
                  );
                }
              }
            },
            ceShow: true,
          },
          {
            label: "最多输入",
            component: "el-input",
            prop: "maxlength",
            placeholder: "请输入最多输入",
            required: false,
            col: {
              span: 24,
            },
            props: {
              append: "个字符",
            },
            labelWidth: "120px",
            ceShow: true,
          },
          // inputNumber
          // props: {
          // clearable: true,
          // max: 10,
          // min: 1
          // },
          {
            label: "最小值",
            component: "el-inputNumber",
            prop: "min",
            placeholder: "请输入最小值",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "最大值",
            component: "el-inputNumber",
            prop: "max",
            placeholder: "请输入最大值",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            // :step="2" step-strictly
            label: "步长",
            component: "el-inputNumber",
            prop: "step",
            placeholder: "请输入步长",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "精度",
            component: "el-inputNumber",
            prop: "precision",
            placeholder: "请输入精度",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "开启提示",
            component: "el-input",
            prop: "activeText",
            placeholder: "请输入开启提示",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "关闭提示",
            component: "el-input",
            prop: "inactiveText",
            placeholder: "请输入关闭提示",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "开启值",
            component: "el-input",
            prop: "activeValue",
            placeholder: "请输入开启值",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "关闭值",
            component: "el-input",
            prop: "inactiveValue",
            placeholder: "请输入关闭值",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "开启颜色",
            component: "el-color-picker",
            prop: "activeColor",
            placeholder: "请选择开启颜色",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "关闭颜色",
            component: "el-color-picker",
            prop: "inactiveColor",
            placeholder: "请选择关闭颜色",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            labelWidth: "120px",
            label: "时间类型",
            prop: "type",
            component: "el-select",
            placeholder: "请选择时间类型",
            multiple: false,
            disabled: false,
            clearable: false,
            collapseTags: false,
            multipleLimit: 0,
            remote: false,
            filterable: false,
            remoteMethod: undefined,
            loading: false,
            loadingText: "加载中",
            noMatchText: "无匹配数据",
            noDataText: "暂无数据",
            popperClass: "",
            reserveKeyword: false,
            defaultFirstOption: false,
            size: "default",
            name: "select",
            validateEvent: true,
            slots: [
              {
                slotName: "default",
                component: "el-option",
                options: [
                  {
                    label: "日(date)",
                    value: "date",
                    ceShow:()=>model.dragComponentList[model.aciveIndex].componentProps==='el-datetime'
                  },
                  // {
                  //   label: "周(week)",
                  //   value: "week",
                  // },
                  {
                    label: "月(month)",
                    value: "month",
                    ceShow:()=>model.dragComponentList[model.aciveIndex].componentProps==='el-datetime'
                  },
                  {
                    label: "年(year)",
                    value: "year",
                    ceShow:()=>model.dragComponentList[model.aciveIndex].componentProps==='el-datetime'
                  },
                  {
                    label: "日期时间(datetime)",
                    value: "datetime",
                    ceShow:()=>model.dragComponentList[model.aciveIndex].componentProps==='el-datetime'
                  },
                  {
                    label: "日期范围(daterange)",
                    value: "daterange",
                    ceShow:()=>model.dragComponentList[model.aciveIndex].componentProps==='el-datetimerange'
                  },
                  {
                    label: "月范围(monthrange)",
                    value: "monthrange",
                    ceShow:()=>model.dragComponentList[model.aciveIndex].componentProps==='el-datetimerange'
                  },
                  {
                    label: "日期时间范围(datetimerange)",
                    value: "datetimerange",
                    ceShow:()=>model.dragComponentList[model.aciveIndex].componentProps==='el-datetimerange'
                  },
                ],
              },
            ],
            'update:modelValue':(val:string)=>{
              console.log(val)
              switch (val) {
                case 'date':
                  model.dragComponentList[model.aciveIndex].format = 'YYYY-MM-DD'
                  model.dragComponentList[model.aciveIndex].valueFormat = 'YYYY-MM-DD'
                  break;
                // case 'week':
                //   model.dragComponentList[model.aciveIndex].format = "gggg 第 ww 周"
                //   model.dragComponentList[model.aciveIndex].valueFormat = "gggg 第 ww 周"
                //   break;
                case 'month':
                  model.dragComponentList[model.aciveIndex].format = 'YYYY-MM'
                  model.dragComponentList[model.aciveIndex].valueFormat = 'YYYY-MM'
                  break;
                case 'year':
                  model.dragComponentList[model.aciveIndex].format = 'YYYY'
                  model.dragComponentList[model.aciveIndex].valueFormat = 'YYYY'
                  break;
                case 'datetime':
                  model.dragComponentList[model.aciveIndex].format = 'YYYY-MM-DD HH:mm:ss'
                  model.dragComponentList[model.aciveIndex].valueFormat = 'YYYY-MM-DD HH:mm:ss'
                  break;
                case 'daterange':
                  model.dragComponentList[model.aciveIndex].format = 'YYYY-MM-DD'
                  model.dragComponentList[model.aciveIndex].valueFormat = 'YYYY-MM-DD'
                  break;
                case 'monthrange':
                  model.dragComponentList[model.aciveIndex].format = 'YYYY-MM'
                  model.dragComponentList[model.aciveIndex].valueFormat = 'YYYY-MM'
                  break;
                case 'datetimerange':
                  model.dragComponentList[model.aciveIndex].format = 'YYYY-MM-DD HH:mm:ss'
                  model.dragComponentList[model.aciveIndex].valueFormat = 'YYYY-MM-DD HH:mm:ss'
                  break;
                default:
                  break;
              }
            }
          },
          {
            label: "时间格式",
            component: "el-input",
            prop: "format",
            placeholder: "请输入时间格式",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
            'update:modelValue':(val:string)=>{
              model.dragComponentList[model.aciveIndex].valueFormat = val
            }
          },
          {
            label: "分隔符",
            component: "el-input",
            prop: "rangeSeparator",
            placeholder: "请输入分隔符",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "文件字段名",
            component: "el-input",
            prop: "name",
            placeholder: "请输入分隔符",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "文件类型",
            component: "el-input",
            prop: "accept",
            placeholder: "请输入分隔符",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "文件大小",
            component: "el-input",
            prop: "fileSize",
            placeholder: "请输入分隔符",
            required: false,
            col: {
              span: 24,
            },
            slots:[
              {
                slotName: "append",
                slotHtml: "<span>MB</span>",
              },
            ],
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "上传地址",
            component: "el-input",
            prop: "action",
            placeholder: "请输入分隔符",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "列表类型",
            component: "el-select",
            prop: "listType",
            placeholder: "请选择列表类型",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
            slots: [
              {
                slotName: "default",
                component: "el-option",
                options: [
                  {
                    label: "文本",
                    value: "text",
                    ceShow:true,
                  },
                  {
                    label: "图片",
                    value: "picture",
                    ceShow:true,
                  },
                  {
                    label: "照片墙",
                    value: "picture-card",
                    ceShow:true,
                  },
                ],
              },
            ],
          },
          {
            label: "显示标签",
            component: "el-switch",
            prop: "showLabel",
            placeholder: "请选择显示标签",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "是否多选",
            component: "el-switch",
            prop: "limit",
            placeholder: "请选择是否多选",
            required: false,
            activeValue: 0,
            inactiveValue: 1,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "立即上传",
            component: "el-switch",
            prop: "autoUpload",
            placeholder: "请选择是否多选",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          
          {
            label: "显示间断点",
            component: "el-switch",
            prop: "showStops",
            placeholder: "请选择关闭颜色",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "范围选择",
            component: "el-switch",
            prop: "range",
            placeholder: "请选择关闭颜色",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: false,
          },
          {
            label: "输入统计",
            component: "el-switch",
            prop: "showWordLimit",
            placeholder: "请选择输入统计",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "能否清空",
            component: "el-switch",
            prop: "clearable",
            placeholder: "请选择能否清空",
            defaultValue: true,
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "是否禁用",
            component: "el-switch",
            prop: "disabled",
            placeholder: "请选择显示标签",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
          {
            label: "是否必填",
            component: "el-switch",
            prop: "required",
            placeholder: "请选择是否必填",
            required: false,
            col: {
              span: 24,
            },
            labelWidth: "120px",
            ceShow: true,
          },
        ],
        changeOption:(type:boolean,index:number):void=>{
          if(type){
            model.dragComponentList[model.aciveIndex].slots[0].options.push({
              label:"",
              value:"",
            })
          }else{
            model.dragComponentList[model.aciveIndex].slots[0].options.splice(index,1)
          }
        },
        showOptions:(row):boolean=>{
          return ['el-select','el-radio-group','el-checkbox-group'].includes(row.component)
        }
      };
    };
    const model: templateConfig = reactive(initState());
    let data: ToRefs<templateConfig> = toRefs(model);
    let resetState = (): void => {
      Object.assign(model, initState()); // 将新状态对象的属性分配到现有响应式对象
    };
    const submitForm = () => {
      console.log(model.ceFormData,model);
    };


    const transformProps = (element) => {
      const row = _.cloneDeep(element);
      if (!row.showLabel) {
        row.labelWidth = 0;
        row.label = "";
      }
      return row;
    };

    const updateModelvalue =(row)=>{
      model.dragComponentList[model.aciveIndex].defaultValue = row.modelValue
    }
    const router = useRouter();

    const backSys = ()=>{
      router.push({
          path: '/system/templateMaintain'
        });
    }

    return {
      ...data,
      resetState,
      submitForm,
      backSys,
      dialogIcon,
      transformProps,
      updateModelvalue
    };
  },
  components: {
    draggable,
    ElForms,
    DialogIcon,
  },
});
</script>
<style lang="stylus" scoped>
.templateConfig{
  position: relative;
  padding:8px 8px 0 8px
}

.left-board{
  width: 260px
  // position: absolute;
  // left: 0;
  // top: 0;
  // height: 100%;
  // padding:8px
  float: left
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

/deep/.pointer{
  cursor: pointer;
  padding:0 20px
}
/deep/ .el-select {
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
/deep/.pointer{
  cursor: pointer;
  padding:0 20px
}
/deep/.rightCom .el-input-group__append{
  padding:0 10px
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
</style>
