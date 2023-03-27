<template>
  <div class='templateConfig'>
    <div class="left-board">
      <div v-for="item in templateList" :key="item.title" style="margin-bottom:20px">
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
      <draggable class="list-group el-row" :list="dragComponentList" group="people" item-key="field">
        <template #item="{ element, index }">
          <div :class="[aciveIndex == index ? 'active-item' : '', getClass(element)]" @click="activeItem(element, index)">
            <div>
              <el-form :model="formData" ref="form" style="padding:40px">
                <el-form-item v-bind="element">
                  <component :is="element.component" v-model="formData[element.prop]" v-bind="element">
                    <template v-if="element.slots" v-slot:[element.slots.slotName]="slotProp">
                      <span>{{ slotProp?.data?.label }}</span>
                      <div v-html="element.slots.slotHtml"></div>
                      <div v-if="element.slots.component">
                        <component v-for="item2 in element.slots.options" :key="item2.value" :is='element.slots.component'
                          v-bind="{ ...element.slots, ...item2 }">{{ item2.showLabel || item2.label }}</component>
                      </div>
                    </template>
                  </component>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <!-- <div class="right-board">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="rightTabConfig">
        <el-tab-pane label="组件属性" name="componentProps">
          <div style="padding:8px 30px 0 8px" v-if="dragComponentList[aciveIndex]">
            <ElForms :formConfig="formConfig" :formData="formData" ref="dialogMask" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="表单属性" name="formProps">Config</el-tab-pane>
      </el-tabs>
      <el-button @click="submitForm">提交</el-button>
    </div> -->
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
  templateList: any[];
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
            label: "输入型组件",
            icon: "Fold",
            children: [
              {
                label: '单行文本',
                prop: 'input',
                component: 'el-input',
                placeholder: '请输入内容',
                disabled: false,
                clearable: true,
                readonly: false,
                autofocus: false,
                name: 'inputName',
                rules: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                resize: 'none',
                slots: {
                  slotName: "prepend",
                  slotHtml: "<span>111</span>"
                },
                type: "text"
              },
              {
                label: '多行文本',
                prop: 'textarea',
                component: 'el-input',
                placeholder: '请输入内容',
                disabled: false,
                clearable: true,
                readonly: false,
                autofocus: false,
                name: 'inputName',
                rules: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                type: "textarea"
              },
              {
                label: '密码',
                prop: 'password',
                component: 'el-input',
                placeholder: '请输入内容',
                disabled: false,
                clearable: true,
                readonly: false,
                autofocus: true,
                name: 'inputName',
                showPassword: true,
                rules: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                resize: 'none',
                type: "text"
              },
              {
                label: '计数器',
                prop: 'inputNumber',
                component: 'el-input-number',
                width: 100,
                value: 1,
                size: 1,
                min: 0,
                max: 100,
                step: 1,
                stepStrictly: false,
                precision: '',
                disabled: false,
                controls: true,
                controlsPosition: '',
                name: 'inputNumber',
                onChange: (val: number) => console.log('input number changed to: ', val),
                onFocus: () => console.log('input number focused'),
                onBlur: () => console.log('input number blurred'),
                validateEvent: true,
                rules: [
                  { required: true, message: 'Please enter a number', trigger: 'change' },
                ],
              },
            ]
          },
          {
            label: "选择型组件",
            icon: "Fold",
            children: [{
              label: '下拉选择',
              prop: 'select',
              component: 'el-select',
              placeholder: '请选择',
              multiple: false,
              disabled: false,
              clearable: false,
              collapseTags: false,
              multipleLimit: 0,
              remote: false,
              filterable: false,
              remoteMethod: null,
              loading: false,
              loadingText: '加载中',
              noMatchText: '无匹配数据',
              noDataText: '暂无数据',
              popperClass: '',
              reserveKeyword: false,
              defaultFirstOption: false,
              size: 'medium',
              prefixIcon: '',
              suffixIcon: '',
              onChange: (val: string | string[]) => console.log('select changed to: ', val),
              onFocus: () => console.log('select focused'),
              onBlur: () => console.log('select blurred'),
              name: 'select',
              validateEvent: true,
              rules: [
                { required: true, message: '请选择一个选项', trigger: 'change' },
              ],
              slots: {
                slotName: "default",
                component: 'el-option',
                options: [
                  { label: '选项1', value: 'option1' },
                  { label: '选项2', value: 'option2' },
                  { label: '选项3', value: 'option3' },
                ],
              },
              filterMethod: (query: string, option: any) => {
                return option.label.indexOf(query) !== -1;
              },
            },
            {
              label: '级联选择',
              prop: 'cascader',
              component: 'el-cascader',
              width: 150,
              slots: {
                slotName: 'default',
              },
              options: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [
                    {
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [
                        {
                          value: 'yizhi',
                          label: '一致'
                        },
                        {
                          value: 'fankui',
                          label: '反馈'
                        },
                        {
                          value: 'xiaolv',
                          label: '效率'
                        },
                        {
                          value: 'kekong',
                          label: '可控'
                        }
                      ]
                    }
                  ]
                }
              ],
              props: {
                value: 'value',
                label: 'label',
                children: 'children'
              },
              value: [],
              size: '',
              placeholder: '请选择',
              disabled: false,
              clearable: true,
              changeOnSelect: false,
              filterable: false,
              separator: '/',
              beforeFilter: (queryString: string, options: any[]) => {
                console.log('before filter');
                return options.filter(option => option.label.toLowerCase().includes(queryString.toLowerCase()));
              },
              onChange: (val: string[]) => console.log('cascader changed to: ', val),
              onFocus: () => console.log('cascader focused'),
              onBlur: () => console.log('cascader blurred'),
              name: 'cascader',
              validateEvent: true,
              rules: [
                { required: true, message: 'Please select an option', trigger: 'change' },
              ],
            },
            {
              label: '单选框组',
              prop: 'radioGroup',
              component: 'el-radio-group',
              width: 100,
              value: '选项2',
              size: '',
              fill: '#20A0FF',
              textColor: '',
              disabled: false,
              border: false,
              onChange: (val: string) => console.log('radio group changed to: ', val),
              onFocus: () => console.log('radio group focused'),
              onBlur: () => console.log('radio group blurred'),
              name: 'radioGroup',
              validateEvent: true,
              rules: [
                { required: true, message: 'Please select an option', trigger: 'change' },
              ],
              slots: {
                slotName: "default",
                label: 'Radio',
                prop: 'radio',
                component: 'el-radio',
                options: [
                  { showLabel: '选项1', label: 'option1' },
                  { showLabel: '选项2', label: 'option2' },
                  { showLabel: '选项3', label: 'option3' },
                ],
                defaultValue: '选项2',
                disabled: false,
                size: 'medium',
                textColor: '#ffffff',
                fill: '#409EFF',
                borderColor: '#409EFF',
                onChange: (val: string) => console.log('radio changed to: ', val),
                onFocus: () => console.log('radio focused'),
                onBlur: () => console.log('radio blurred'),
                name: 'radio-group',
                validateEvent: true,
                rules: [
                  { required: true, message: '请选择一个选项', trigger: 'change' },
                ],
              },
            },
            {
              label: '多选框组',
              prop: 'checkboxGroup',
              component: 'el-checkbox-group',
              width: 100,
              value: [],
              size: '',
              fill: '#20A0FF',
              textColor: '',
              disabled: false,
              border: false,
              slots: {
                slotName: "default",
                label: 'Checkbox',
                prop: 'checkbox',
                component: 'el-checkbox',
                // trueLabel: '选中时的值',
                // falseLabel: '未选中时的值',
                checked: false,
                disabled: false,
                size: 'medium',
                border: false,
                indeterminate: false,
                onChange: (val: boolean) => console.log('checkbox changed to: ', val),
                onFocus: () => console.log('checkbox focused'),
                onBlur: () => console.log('checkbox blurred'),
                name: 'checkbox-group',
                validateEvent: true,
                rules: [
                  { required: true, message: '请勾选', trigger: 'change' },
                ],
                options: [
                  { showLabel: '选项1', label: 'option1' },
                  { showLabel: '选项2', label: 'option2' },
                  { showLabel: '选项3', label: 'option3' },
                ],
              }
            },
            {
              label: '滑块',
              prop: 'slider',
              component: 'el-slider',
              min: 0,
              max: 100,
              step: 1,
              disabled: false,
              showInput: false,
              showInputControls: true,
              inputSize: 'small',
              showStops: false,
              showTooltip: true,
              formatTooltip: (val: number) => val.toString(),
              range: false,
              vertical: false,
              height: '',
              onChange: (val: number | number[]) => console.log('slider changed to: ', val),
              onFocus: () => console.log('slider focused'),
              onBlur: () => console.log('slider blurred'),
              name: 'slider',
              validateEvent: true,
              rules: [
                { required: true, message: '请滑动选择一个值', trigger: 'change' },
              ],
            },
            {
              label: '开关',
              prop: 'switch',
              component: 'el-switch',
              width: 40,
              activeIconClass: '',
              inactiveIconClass: '',
              activeText: '',
              inactiveText: '',
              activeColor: '#409EFF',
              inactiveColor: '#C0CCDA',
              activeValue: true,
              inactiveValue: false,
              disabled: false,
              onChange: (val: boolean) => console.log('switch changed to: ', val),
              onFocus: () => console.log('switch focused'),
              onBlur: () => console.log('switch blurred'),
              name: 'switch',
              validateEvent: true,
              rules: [
                { required: true, message: '请切换开关', trigger: 'change' },
              ],
            },
            {
              label: '时间选择',
              prop: 'timePicker',
              component: 'el-date-picker',
              type: "datetime",
              width: 100,
              placeholder: 'Select time',
              readonly: false,
              editable: true,
              disabled: false,
              clearable: true,
              size: '',
              popperClass: '',
              startPlaceholder: '',
              endPlaceholder: '',
              isRange: false,
              arrowControl: true,
              format: 'YYYY-MM-DD HH:mm:ss',
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              pickerOptions: {
                selectableRange: '00:00:00-23:59:59',
                format: 'HH:mm:ss',
                start: '09:00:00',
                step: '00:15:00',
                end: '18:00:00'
              },
              onChange: (val: string | string[]) => console.log('time changed to: ', val),
              onFocus: () => console.log('time focused'),
              onBlur: () => console.log('time blurred'),
              name: 'timePicker',
              validateEvent: true,
              rules: [
                { required: true, message: 'Please select a time', trigger: 'change' },
              ],
            },
            {
              label: '日期时间',
              prop: 'datePicker',
              component: 'el-date-picker',
              width: 100,
              placeholder: 'Select date',
              type: "datetimerange",
              readonly: false,
              editable: true,
              disabled: false,
              clearable: true,
              size: '',
              popperClass: '',
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              format: 'YYYY-MM-DD HH:mm:ss',
              shortcuts: [
                {
                  text: 'Today',
                  onClick: () => console.log('Today clicked')
                },
                {
                  text: 'Yesterday',
                  onClick: () => console.log('Yesterday clicked')
                },
                {
                  text: 'Last week',
                  onClick: () => console.log('Last week clicked')
                }
              ],
              onChange: (val: string | string[]) => console.log('date changed to: ', val),
              onFocus: () => console.log('date focused'),
              onBlur: () => console.log('date blurred'),
              name: 'datePicker',
              validateEvent: true,
              rules: [
                { required: true, message: 'Please select a date', trigger: 'change' },
              ],
            },
            {
              label: '评分',
              prop: 'rate',
              component: 'el-rate',
              width: 80,
              value: 0,
              colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
              voidColor: '#C6D1DE',
              disabledVoidColor: '#EFF2F7',
              iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
              voidIconClass: 'el-icon-star-off',
              disabledVoidIconClass: 'el-icon-star-on',
              allowHalf: false,
              showText: false,
              showScore: false,
              scoreTemplate: '{value}',
              texts: ['Very Bad', 'Bad', 'Normal', 'Good', 'Very Good'],
              textColor: '#1F2D3D',
              voidTextColor: '#C6D1DE',
              disabled: false,
              max: 5,
              onChange: (val: number) => console.log('rate changed to: ', val),
              onFocus: () => console.log('rate focused'),
              onBlur: () => console.log('rate blurred'),
              name: 'rate',
              validateEvent: true,
              rules: [
                { required: true, message: 'Please rate this', trigger: 'change' },
              ],
            },
            {
              label: '颜色选择',
              prop: 'colorPicker',
              component: 'el-color-picker',
              width: 100,
              value: '#409EFF',
              disabled: false,
              showAlpha: false,
              colorFormat: 'hex',
              onChange: (val: string) => console.log('color changed to: ', val),
              onFocus: () => console.log('color picker focused'),
              onBlur: () => console.log('color picker blurred'),
              name: 'colorPicker',
              validateEvent: true,
              rules: [
                { required: true, message: 'Please select a color', trigger: 'change' },
              ],
            },
            {
              label: '上传',
              prop: 'upload',
              component: 'el-upload',
              width: 150,
              action: 'https://jsonplaceholder.typicode.com/posts/',
              headers: {},
              multiple: false,
              data: {},
              // name: 'file',
              withCredentials: false,
              showFileList: true,
              fileList: [],
              autoUpload: true,
              accept: '',
              listType: 'text',
              disabled: false,
              limit: 3,
              slots: {
                slotName: 'default',
                slotHtml: `<el-button type="primary">点击上传</el-button>`,
                label: 'Button',
                prop: 'button',
                component: 'el-button',
                width: 100,
                type: 'primary',
                size: '',
                icon: '',
                nativeType: 'button',
                loading: false,
                disabled: false,
                plain: false,
                autofocus: false,
                round: false,
                circle: false,
                onClick: (event: Event) => console.log('button clicked', event),
                onFocus: () => console.log('button focused'),
                onBlur: () => console.log('button blurred'),
              },
              beforeUpload: (file: File) => {
                console.log('before upload', file);
                return true;
              },
              onRemove: (file: object, fileList: object[]) => console.log('file removed', file, fileList),
              onSuccess: (response: object, file: object, fileList: object[]) => console.log('file uploaded successfully', response, file, fileList),
              onError: (err: Error, file: object, fileList: object[]) => console.log('file upload error', err, file, fileList),
              onChange: (file: object, fileList: object[]) => console.log('file changed', file, fileList),
              onPreview: (file: object) => console.log('file previewed', file),
              onFocus: () => console.log('upload focused'),
              onBlur: () => console.log('upload blurred'),
              name: 'upload',
              validateEvent: true,
              rules: [
                { required: true, message: 'Please upload a file', trigger: 'change' },
              ],
            },
            {
              label: '穿梭框',
              prop: 'transfer',
              component: 'el-transfer',
              width: 200,
              data: [
                {
                  value: 1,
                  label: '备选项1',
                  disabled: false,
                },
                {
                  value: 2,
                  label: '备选项2',
                  disabled: false,
                },
                {
                  value: 3,
                  label: '备选项3',
                  disabled: false,
                },
              ],
              filterable: true,
              filterPlaceholder: 'Search',
              filterMethod: (query: string, item: any) => {
                return item.label.indexOf(query) > -1;
              },
              titles: ['Source', 'Target'],
              buttonTexts: ['', ''],
              format: {
                noChecked: '${total}',
                hasChecked: '${checked}/${total}',
              },
              'button-texts': ['To left', 'To right'],
              // 'render-content': (h, option) => {
              //   return h('span', null, option.label);
              // },
              footerFormat: '{total} items',
              props: {
                label: 'label',
                key: 'value',
                disabled: 'disabled'
              },
              targetOrder: 'original',
              selected: [],
              onChange: (val: object[], direction: string, moveKeys: string[]) => {
                console.log(`transfer changed to: ${direction}, ${moveKeys}, ${val}`);
              },
              onFocus: () => console.log('transfer focused'),
              onBlur: () => console.log('transfer blurred'),
              name: 'transfer',
              validateEvent: true,
              rules: [
                { required: true, message: 'Please select at least one item', trigger: 'change' },
              ],
            },]
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
            defaultValue: 12,
            col: {
              span: 24,
            },
            props: {
              min: 1,
              max: 24,
            },
            on: {
              input: (val: string | number | string[] | number[]) => {
                model.dragComponentList[model.aciveIndex].col!.span = (val as number);
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
                console.log(model.formData.prefixIcon, 111);
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
                console.log(model.formData.suffixIcon, 222);
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
          const e = _.cloneDeep(ele);
          model.formData = e;
          model.cloneElement(e);
          model.dragComponentList.push(_.cloneDeep(e));
          console.log(model.dragComponentList);
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
          // model.formData = e;
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
          model.formData.span = 12;
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
      console.log(data,model,2222)


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