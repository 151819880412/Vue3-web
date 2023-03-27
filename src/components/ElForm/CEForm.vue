<template>
  <div>
    <el-button @click="submit">提交</el-button>
    <!-- <el-form
      :model="ceFormData"
      :rules="ceRules"
      ref="CEFormRef"
      style="padding: 40px"
    >
      <el-form-item v-for="item in ceFormItems" :key="item.prop" v-bind="item">
        <component
          :is="item.component"
          v-model="ceFormData[item.prop]"
          v-bind="item"
          v-on="item"
        >
          <template v-if="item.slots" v-slot:[item.slots.slotName]="slotProp">
            <span>{{ slotProp?.data?.label }}</span>
            <div v-html="item.slots.slotHtml"></div>
            <div v-if="item.slots.component">
              <component
                v-for="item2 in item.slots.options"
                :key="item2.value"
                :is="item.slots.component"
                v-bind="{ ...item.slots, ...item2 }"
                >{{ item2.showLabel || item2.label }}</component
              >
            </div>
          </template>
        </component>
      </el-form-item>
    </el-form> -->
    <el-form :model="ceFormData" :rules="ceRules" ref="CEFormRef" style="padding: 40px">
      <div v-for="item in ceFormItems" :key="item.prop">
        <el-form-item v-if="item.ceShow" v-bind="transformProps(item)">
          <component :is="item.component" v-model="ceFormData[item.prop]" v-bind="item" v-on="item" :update:modelvalue="updateModelvalue(item)">
            <template v-for="item3 in item.slots" :key="item3.slotName" v-slot:[item3.slotName]="slotProp">
              <span>{{ slotProp?.data?.label }}</span>
              <div v-html="item3.slotHtml"></div>
              <div v-if="item3.component">
                <!-- 单选框和多选框的label和value是反的 -->
                <div v-if="['el-radio-group','el-checkbox-group'].includes(item.component)">
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
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, reactive, ref, toRefs } from "vue";
import {
  ElInput,
  ElRadio,
  ElCheckbox,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElDatePicker,
  ElRate,
  ElUpload,
  ElColorPicker,
  ElCascader,
  ElTransfer,
  ElForm,
  ElFormItem,
  ElButton,
  ElOption,
  ElRadioGroup,
  ElCheckboxGroup,
  ElInputNumber,
  ElImage,
  ElAutocomplete,
  ElTimeSelect,
  TimePickPanel,
} from "element-plus";
// import { CEInput } from "@/@types/CEForm/CEInput";
// import { CEInputNumber } from "@/@types/CEForm/CEInputNumber";
// import { CESelect } from "@/@types/CEForm/CESelect";
// import { CEOption } from "@/@types/CEForm/CEOption";
// import { CECascader } from "@/@types/CEForm/CECascader";
// import { CERadioGroup } from "@/@types/CEForm/CERadioGroup";
// import { CERadio } from "@/@types/CEForm/CERadio";
// import { CECheckboxGroup } from "@/@types/CEForm/CECheckboxGroup";
// import { CECheckbox } from "@/@types/CEForm/CECheckbox";
// import { CESlider } from "@/@types/CEForm/CESlider";
// import { CESwitch } from "@/@types/CEForm/CESwitch";
// import { CEDateTimePicker } from "@/@types/CEForm/CEDateTimePicker";
// import { CERate } from "@/@types/CEForm/CERate";
// import { CEColorPicker } from "@/@types/CEForm/CEColorPicker";
// import { CEUpload } from "@/@types/CEForm/CEUpload";
// import { CETransfer } from "@/@types/CEForm/CETransfer";
// import { CEFormImage } from "@/@types/CEForm/CEImage";
import { CEComponents, CEtypes } from "@/@types/CEForm/CEIndex";

interface CEForm {
  ceFormData: object;
  ceFormItems: CEtypes[];
  ceRules: object;
  initCEForm: (data: CEtypes[]) => void;
  getCEFormData: () => object;
  submit: () => void;
  resetCEForm: () => void;
  validateField: (field: string) => void;
}

export default defineComponent({
  components: {
    ElInput,
    ElRadio,
    ElCheckbox,
    ElSelect,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElDatePicker,
    ElRate,
    ElUpload,
    ElColorPicker,
    ElCascader,
    ElTransfer,
    ElForm,
    ElFormItem,
    ElButton,
    ElOption,
    ElRadioGroup,
    ElCheckboxGroup,
    ElInputNumber,
    ElImage,
    ElAutocomplete,
    ElTimeSelect,
    TimePickPanel,
  },
  setup() {
    const CEFormRef = ref<InstanceType<typeof ElForm>>();

    const initState = (): CEForm => {
      return {
        ceFormData: {},
        ceFormItems:[],
        // ceFormItems: [
        //   new CEInput({
        //     label: "Input1",
        //     prop: "input1",
        //     component: "el-input",
        //     placeholder: "请输入内容",
        //     disabled: false,
        //     clearable: true,
        //     readonly: false,
        //     autofocus: false,
        //     name: "inputName",
        //     rules: [
        //       {
        //         required: true,
        //         message: "请输入内容",
        //         trigger: "blur",
        //       },
        //     ],
        //     resize: "none",
        //     slots: [{
        //       slotName: "prepend",
        //       slotHtml: "<span>111</span>",
        //     }],
        //     type: "text",
        //   }),
        //   new CEInput({
        //     label: "Textarea",
        //     prop: "textarea",
        //     component: "el-input",
        //     placeholder: "请输入内容",
        //     disabled: false,
        //     clearable: true,
        //     readonly: false,
        //     autofocus: false,
        //     name: "inputName",
        //     rules: [
        //       {
        //         required: true,
        //         message: "请输入内容",
        //         trigger: "blur",
        //       },
        //     ],
        //     type: "textarea",
        //   }),
        //   new CEInput({
        //     label: "Password",
        //     prop: "password",
        //     component: "el-input",
        //     placeholder: "请输入内容",
        //     disabled: false,
        //     clearable: true,
        //     readonly: false,
        //     autofocus: true,
        //     name: "inputName",
        //     showPassword: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "请输入内容",
        //         trigger: "blur",
        //       },
        //     ],
        //     resize: "none",
        //     type: "text",
        //   }),
        //   new CEInputNumber({
        //     label: "Input Number",
        //     prop: "inputNumber",
        //     component: "el-input-number",
        //     // width: 100,
        //     // value: 1,
        //     // size: 1,
        //     min: 0,
        //     max: 100,
        //     step: 1,
        //     stepStrictly: false,
        //     // precision: '',
        //     disabled: false,
        //     controls: true,
        //     controlsPosition: "",
        //     name: "inputNumber",
        //     // change: (val: number) => console.log('input number changed to: ', val),
        //     // focus: () => console.log('input number focused'),
        //     // blur: () => console.log('input number blurred'),
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please enter a number",
        //         trigger: "change",
        //       },
        //     ],
        //   }),

        //   new CESelect({
        //     label: "Select",
        //     prop: "select",
        //     component: "el-select",
        //     placeholder: "请选择",
        //     multiple: false,
        //     disabled: false,
        //     clearable: false,
        //     collapseTags: false,
        //     multipleLimit: 0,
        //     remote: false,
        //     filterable: false,
        //     remoteMethod: undefined,
        //     loading: false,
        //     loadingText: "加载中",
        //     noMatchText: "无匹配数据",
        //     noDataText: "暂无数据",
        //     popperClass: "",
        //     reserveKeyword: false,
        //     defaultFirstOption: false,
        //     size: "default",
        //     // prefixIcon: '',
        //     // suffixIcon: '',
        //     // onChange: (val: string | string[]) => console.log('select changed to: ', val),
        //     // onFocus: () => console.log('select focused'),
        //     // onBlur: () => console.log('select blurred'),
        //     name: "select",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "请选择一个选项",
        //         trigger: "change",
        //       },
        //     ],
        //     slots: [new CEOption({
        //       slotName: "default",
        //       component: "el-option",
        //       options: [
        //         {
        //           label: "选项1",
        //           value: "option1",
        //         },
        //         {
        //           label: "选项2",
        //           value: "option2",
        //         },
        //         {
        //           label: "选项3",
        //           value: "option3",
        //         },
        //       ],
        //     })],
        //     filterMethod: (query: string, option: any) => {
        //       return option.label.indexOf(query) !== -1;
        //     },
        //   }),

        //   new CECascader({
        //     label: "Cascader",
        //     prop: "cascader",
        //     component: "el-cascader",
        //     // width: 150,
        //     slots: [{
        //       slotName: "default",
        //     }],
        //     options: [
        //       {
        //         value: "zhinan",
        //         label: "指南",
        //         children: [
        //           {
        //             value: "shejiyuanze",
        //             label: "设计原则",
        //             children: [
        //               {
        //                 value: "yizhi",
        //                 label: "一致",
        //               },
        //               {
        //                 value: "fankui",
        //                 label: "反馈",
        //               },
        //               {
        //                 value: "xiaolv",
        //                 label: "效率",
        //               },
        //               {
        //                 value: "kekong",
        //                 label: "可控",
        //               },
        //             ],
        //           },
        //         ],
        //       },
        //     ],
        //     props: {
        //       value: "value",
        //       label: "label",
        //       children: "children",
        //     },
        //     value: "",
        //     size: "",
        //     placeholder: "请选择",
        //     disabled: undefined,
        //     clearable: true,
        //     // changeOnSelect: false,
        //     filterable: false,
        //     separator: "/",
        //     // beforeFilter: (queryString: string, options: any[]) => {
        //     //   console.log('before filter');
        //     //   return options.filter(option => option.label.toLowerCase().includes(queryString.toLowerCase()));
        //     // },
        //     // onChange: (val: string[]) => console.log('cascader changed to: ', val),
        //     // onFocus: () => console.log('cascader focused'),
        //     // onBlur: () => console.log('cascader blurred'),
        //     name: "cascader",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please select an option",
        //         trigger: "change",
        //       },
        //     ],
        //   }),
        //   new CERadioGroup({
        //     label: "Radio Group",
        //     prop: "radioGroup",
        //     component: "el-radio-group",
        //     // value: '选项2',
        //     size: "",
        //     fill: "#20A0FF",
        //     textColor: "",
        //     disabled: false,
        //     // border: false,
        //     // onChange: (val: string) => console.log('radio group changed to: ', val),
        //     // onFocus: () => console.log('radio group focused'),
        //     // onBlur: () => console.log('radio group blurred'),
        //     name: "radioGroup",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please select an option",
        //         trigger: "change",
        //       },
        //     ],
        //     slots: [new CERadio({
        //       slotName: "default",
        //       label: "Radio",
        //       prop: "radio",
        //       component: "el-radio",
        //       options: [
        //         {
        //           showLabel: "选项1",
        //           label: "option1",
        //         },
        //         {
        //           showLabel: "选项2",
        //           label: "option2",
        //         },
        //         {
        //           showLabel: "选项3",
        //           label: "option3",
        //         },
        //       ],
        //       // defaultValue: '选项2',
        //       disabled: false,
        //       size: "default",
        //       // textColor: '#ffffff',
        //       // fill: '#409EFF',
        //       // borderColor: '#409EFF',
        //       // onChange: (val: string) => console.log('radio changed to: ', val),
        //       // onFocus: () => console.log('radio focused'),
        //       // onBlur: () => console.log('radio blurred'),
        //       name: "radio-group",
        //       // validateEvent: true,
        //       rules: [
        //         {
        //           required: true,
        //           message: "请选择一个选项",
        //           trigger: "change",
        //         },
        //       ],
        //     })],
        //   }),

        //   new CECheckboxGroup({
        //     label: "Checkbox Group",
        //     prop: "checkboxGroup",
        //     component: "el-checkbox-group",
        //     size: "",
        //     // fill: '#20A0FF',
        //     // textColor: '',
        //     disabled: false,
        //     border: false,
        //     rules: [
        //       {
        //         required: true,
        //         message: "请勾选",
        //         trigger: "change",
        //       },
        //     ],
        //     required: true,
        //     slots: [new CECheckbox({
        //       slotName: "default",
        //       label: "Checkbox",
        //       prop: "checkbox",
        //       component: "el-checkbox",
        //       // trueLabel: '选中时的值',
        //       // falseLabel: '未选中时的值',
        //       checked: false,
        //       disabled: false,
        //       size: "default",
        //       border: false,
        //       indeterminate: false,
        //       // onChange: (val: boolean) => console.log('checkbox changed to: ', val),
        //       // onFocus: () => console.log('checkbox focused'),
        //       // onBlur: () => console.log('checkbox blurred'),
        //       name: "checkbox-group",
        //       validateEvent: true,
        //       rules: [
        //         {
        //           required: true,
        //           message: "请勾选",
        //           trigger: "change",
        //         },
        //       ],
        //       options: [
        //         {
        //           showLabel: "选项1",
        //           label: "option1",
        //         },
        //         {
        //           showLabel: "选项2",
        //           label: "option2",
        //         },
        //         {
        //           showLabel: "选项3",
        //           label: "option3",
        //         },
        //       ],
        //     })],
        //   }),

        //   new CESlider({
        //     label: "Slider",
        //     prop: "slider",
        //     component: "el-slider",
        //     min: 0,
        //     max: 100,
        //     step: 1,
        //     disabled: false,
        //     showInput: false,
        //     showInputControls: true,
        //     inputSize: "small",
        //     showStops: false,
        //     showTooltip: true,
        //     formatTooltip: (val: number) => val.toString(),
        //     range: false,
        //     vertical: false,
        //     height: "",
        //     // onChange: (val: number | number[]) => console.log('slider changed to: ', val),
        //     // onFocus: () => console.log('slider focused'),
        //     // onBlur: () => console.log('slider blurred'),
        //     name: "slider",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "请滑动选择一个值",
        //         trigger: "change",
        //       },
        //     ],
        //   }),
        //   new CESwitch({
        //     label: "Switch",
        //     prop: "switch",
        //     component: "el-switch",
        //     // activeIconClass: '',
        //     // inactiveIconClass: '',
        //     activeText: "",
        //     inactiveText: "",
        //     activeColor: "#409EFF",
        //     inactiveColor: "#C0CCDA",
        //     activeValue: true,
        //     inactiveValue: false,
        //     disabled: false,
        //     // onChange: (val: boolean) => console.log('switch changed to: ', val),
        //     // onFocus: () => console.log('switch focused'),
        //     // onBlur: () => console.log('switch blurred'),
        //     name: "switch",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "请切换开关",
        //         trigger: "change",
        //       },
        //     ],
        //   }),
        //   new CEDateTimePicker({
        //     label: "Time Picker",
        //     prop: "timePicker",
        //     component: "el-date-picker",
        //     type: "datetime",
        //     placeholder: "Select time",
        //     readonly: false,
        //     editable: true,
        //     disabled: false,
        //     clearable: true,
        //     size: "default",
        //     popperClass: "",
        //     startPlaceholder: "",
        //     endPlaceholder: "",
        //     isRange: false,
        //     arrowControl: true,
        //     format: "YYYY-MM-DD HH:mm:ss",
        //     valueFormat: "YYYY-MM-DD HH:mm:ss",
        //     // pickerOptions: {
        //     //   selectableRange: '00:00:00-23:59:59',
        //     //   format: 'HH:mm:ss',
        //     //   start: '09:00:00',
        //     //   step: '00:15:00',
        //     //   end: '18:00:00'
        //     // },
        //     // onChange: (val: string | string[]) => console.log('time changed to: ', val),
        //     // onFocus: () => console.log('time focused'),
        //     // onBlur: () => console.log('time blurred'),
        //     name: "timePicker",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please select a time",
        //         trigger: "change",
        //       },
        //     ],
        //   }),
        //   new CEDateTimePicker({
        //     label: "Date Picker",
        //     prop: "datePicker",
        //     component: "el-date-picker",
        //     placeholder: "Select date",
        //     type: "datetimerange",
        //     readonly: false,
        //     editable: true,
        //     disabled: false,
        //     clearable: true,
        //     size: "default",
        //     popperClass: "",
        //     valueFormat: "YYYY-MM-DD HH:mm:ss",
        //     format: "YYYY-MM-DD HH:mm:ss",
        //     shortcuts: [
        //       {
        //         text: "Today",
        //         onClick: () => console.log("Today clicked"),
        //       },
        //       {
        //         text: "Yesterday",
        //         onClick: () => console.log("Yesterday clicked"),
        //       },
        //       {
        //         text: "Last week",
        //         onClick: () => console.log("Last week clicked"),
        //       },
        //     ],
        //     // onChange: (val: string | string[]) => console.log('date changed to: ', val),
        //     // onFocus: () => console.log('date focused'),
        //     // onBlur: () => console.log('date blurred'),
        //     name: "datePicker",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please select a date",
        //         trigger: "change",
        //       },
        //     ],
        //   }),
        //   new CERate({
        //     label: "Rate",
        //     prop: "rate",
        //     component: "el-rate",
        //     colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
        //     voidColor: "#C6D1DE",
        //     disabledVoidColor: "#EFF2F7",
        //     // iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
        //     // voidIconClass: 'el-icon-star-off',
        //     // disabledVoidIconClass: 'el-icon-star-on',
        //     // voidTextColor: '#C6D1DE',
        //     allowHalf: false,
        //     showText: false,
        //     showScore: false,
        //     scoreTemplate: "{value}",
        //     texts: ["Very Bad", "Bad", "Normal", "Good", "Very Good"],
        //     textColor: "#1F2D3D",
        //     disabled: false,
        //     max: 5,
        //     // onChange: (val: number) => console.log('rate changed to: ', val),
        //     // onFocus: () => console.log('rate focused'),
        //     // onBlur: () => console.log('rate blurred'),
        //     name: "rate",
        //     // validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please rate this",
        //         trigger: "change",
        //       },
        //     ],
        //   }),
        //   new CEColorPicker({
        //     label: "Color Picker",
        //     prop: "colorPicker",
        //     component: "el-color-picker",
        //     disabled: false,
        //     showAlpha: false,
        //     colorFormat: "hex",
        //     // onChange: (val: string) => console.log('color changed to: ', val),
        //     // onFocus: () => console.log('color picker focused'),
        //     // onBlur: () => console.log('color picker blurred'),
        //     name: "colorPicker",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please select a color",
        //         trigger: "change",
        //       },
        //     ],
        //   }),
        //   new CEUpload({
        //     label: "Upload",
        //     prop: "upload",
        //     component: "el-upload",
        //     action: "https://jsonplaceholder.typicode.com/posts/",
        //     headers: {},
        //     multiple: false,
        //     data: {},
        //     // name: 'file',
        //     withCredentials: false,
        //     showFileList: true,
        //     fileList: [],
        //     autoUpload: true,
        //     accept: "",
        //     listType: "text",
        //     disabled: false,
        //     limit: 3,
        //     slots: [{
        //       slotName: "default",
        //       slotHtml: `<el-button type="primary">点击上传</el-button>`,
        //       label: "Button",
        //       prop: "button",
        //       component: "el-button",
        //       width: 100,
        //       type: "primary",
        //       size: "",
        //       icon: "",
        //       nativeType: "button",
        //       loading: false,
        //       disabled: false,
        //       plain: false,
        //       autofocus: false,
        //       round: false,
        //       circle: false,
        //       onClick: (event: Event) => console.log("button clicked", event),
        //       onFocus: () => console.log("button focused"),
        //       onBlur: () => console.log("button blurred"),
        //     }],
        //     // beforeUpload: (file: File) => {
        //     //   console.log('before upload', file);
        //     //   return true;
        //     // },
        //     // onRemove: (file: object, fileList: object[]) => console.log('file removed', file, fileList),
        //     // onSuccess: (response: object, file: object, fileList: object[]) => console.log(
        //     //   'file uploaded successfully', response, file, fileList),
        //     // onError: (err: Error, file: object, fileList: object[]) => console.log('file upload error', err, file,
        //     //   fileList),
        //     // onChange: (file: object, fileList: object[]) => console.log('file changed', file, fileList),
        //     // onPreview: (file: object) => console.log('file previewed', file),
        //     // onFocus: () => console.log('upload focused'),
        //     // onBlur: () => console.log('upload blurred'),
        //     name: "upload",
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please upload a file",
        //         trigger: "change",
        //       },
        //     ],
        //   }),
        //   new CETransfer({
        //     label: "Transfer",
        //     prop: "transfer",
        //     component: "el-transfer",
        //     data: [
        //       {
        //         value: 1,
        //         label: "备选项1",
        //         disabled: false,
        //       },
        //       {
        //         value: 2,
        //         label: "备选项2",
        //         disabled: false,
        //       },
        //       {
        //         value: 3,
        //         label: "备选项3",
        //         disabled: false,
        //       },
        //     ],
        //     filterable: true,
        //     filterPlaceholder: "Search",
        //     filterMethod: (query: string, item: any) => {
        //       return item.label.indexOf(query) > -1;
        //     },
        //     titles: ["Source", "Target"],
        //     buttonTexts: ["", ""],
        //     format: {
        //       noChecked: "${total}",
        //       hasChecked: "${checked}/${total}",
        //     },
        //     // 'button-texts': ['To left', 'To right'],
        //     // 'render-content': (h, option) => {
        //     //   return h('span', null, option.label);
        //     // },
        //     // footerFormat: '{total} items',
        //     props: {
        //       label: "label",
        //       key: "value",
        //       disabled: "disabled",
        //     },
        //     targetOrder: "original",
        //     // selected: [],
        //     // onChange: (val: object[], direction: string, moveKeys: string[]) => {
        //     //   console.log(`transfer changed to: ${direction}, ${moveKeys}, ${val}`);
        //     // },
        //     // onFocus: () => console.log('transfer focused'),
        //     // onBlur: () => console.log('transfer blurred'),
        //     name: "transfer",
        //     validateEvent: true,
        //     rules: [
        //       {
        //         required: true,
        //         message: "Please select at least one item",
        //         trigger: "change",
        //       },
        //     ],
        //   }),

        //   new CEFormImage({
        //     label: "Image",
        //     prop: "image",
        //     component: "el-image",
        //     src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        //     fit: "contain",
        //     // alt: '',
        //     // referrerPolicy: '',
        //     lazy: false,
        //     // scrollContainer: null,
        //     previewSrcList: [],
        //     // zIndex: '',
        //     // onClick: (event: Event) => console.log('image clicked', event),
        //     // onLoad: () => console.log('image loaded'),
        //     // onError: () => console.log('image load error'),
        //     // onFocus: () => console.log('image focused'),
        //     // onBlur: () => console.log('image blurred'),
        //     name: "image",
        //   }),
        // ],
        ceRules: {},
        initCEForm(data: CEtypes[]) {
          const arr: CEtypes[] = _.cloneDeep(data);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          model.ceFormItems = CEComponents(arr) as any;
          arr.forEach((item) => {
            if (item.modelValue) {
              model.ceFormData[item.prop] = item.modelValue;
              if (item.rules) {
                model.ceRules[item.prop] = item.rules;
              }
            }
          });
          // const com = CEComponents(ele);
          // com.prop += model.dragComponentList.length;
          // console.log(ele, com, 111);
          // model.dragComponentList.push(com);
          // model.activeItem(ele,model.dragComponentList.length-1)
        },
        getCEFormData: () => {
          return _.cloneDeep(model.ceFormData);
        },
        submit: () => {
          CEFormRef.value?.validate((valid: boolean) => {
            if (valid) {
              console.log(valid);
            }
          });
        },
        resetCEForm: () => {
          CEFormRef.value?.resetFields?.();
        },
        validateField: (field: string): void => {
          CEFormRef.value?.validateField?.(field);
        },
      };
    };
    const model = reactive(initState());
    let data = toRefs(model);

    const transformProps = (element) => {
      const row = _.cloneDeep(element);
      if (!row.showLabel) {
        row.labelWidth = 0;
        row.label = "";
      }
      return row;
    };
    const updateModelvalue =(row)=>{
      console.log(row)
      // model.dragComponentList[model.aciveIndex].defaultValue = row.modelValue
    }
    return {
      ...data,
      CEFormRef,
      transformProps,
      updateModelvalue,
    };
  },
});
</script>
