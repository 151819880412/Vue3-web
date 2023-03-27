// import {
//   ISelectProps, InputProps, RadioProps, CheckboxProps, SliderProps, SwitchProps, TimePickerDefaultProps,
//   RateProps, UploadProps, ColorPickerProps, CascaderProps, TransferProps, FormProps, FormItemProps, ButtonProps, IOptionProps,
//   RadioGroupProps, CheckboxGroupProps, InputNumberProps, ImageProps, AutocompleteProps, CascaderNode, CascaderValue, InputAutoSize, InputEmits,
// } from "element-plus";
// import { EpPropMergeType } from "element-plus/es/utils";
// import { StyleValue } from "vue";

// declare interface CEFormItems<T = object> extends FormItemProps {
//   component: string;
//   prop: string;
//   name: string;
//   rules: FormItemProps['rules'];
//   slots?: T & { slotName: string, slotHtml?: string; };
// }

// export class CEFormItem implements CEFormItems {
//   component = '';
//   prop = '';
//   name = '';
//   rules = {};
//   slots = {
//     slotName: "default"
//   };
//   labelWidth: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = '';
//   inlineMessage: EpPropMergeType<readonly [StringConstructor, BooleanConstructor], unknown, unknown> = '';
//   showMessage: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
//   label = '';
//   required: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
//   error: string | undefined;
//   validateStatus: EpPropMergeType<StringConstructor, "" | "error" | "success" | "validating", unknown> = 'error';
//   for: string | undefined;
//   size: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> = 'default';
// }






// export interface CESelectProps extends CEFormItems, ISelectProps {
//   name: CEFormItems['name'];
//   size: ISelectProps['size'];
//   label: ISelectProps['label'];

// }

// export interface CECascaderProps extends CEFormItems {
//   // 可选项数据源，键名可通过 Props 属性配置
//   options: Record<string, unknown>[];
//   // 配置选项，具体见下表
//   props: CascaderProps;
//   // 尺寸
//   size: 'large' | 'default' | 'small';
//   // 输入框占位文本
//   placeholder: string;
//   // 是否禁用
//   disabled: boolean;
//   // 是否支持清空选项
//   clearable: boolean;
//   // 输入框中是否显示选中值的完整路径
//   "showAllLevels": boolean;
//   // 多选模式下是否折叠 Tag
//   "collapseTags": boolean;
//   // 选项分隔符
//   separator: string;
//   // 是否可搜索选项
//   filterable: boolean;
//   // 自定义搜索逻辑，第一个参数是节点 node ，第二个参数是搜索关键词 keyword ，通过返回布尔值表示是否命中
//   "filterMethod"?: (node: CascaderNode, keyword: string) => boolean;
//   // 搜索关键词输入的去抖延迟，毫秒
//   debounce: number;
//   // 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise且 reject，则停止筛选
//   beforeFilter?: (value: string) => boolean;
//   // 自定义浮层类名
//   "popperClass": string;
//   // 是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false
//   teleported: boolean;
//   // 标签类型
//   "tagType": 'success' | 'info' | 'warning' | 'danger';
//   // 输入时是否触发表单的校验
//   "validateEvent": boolean;
//   // 当绑定值变化时触发的事件
//   change?: (value: CascaderValue) => void;
//   // 当展开节点发生变化时触发
//   expandChange?: (value: CascaderValue) => void;
//   // 当失去焦点时触发
//   blur?: (event: FocusEvent) => void;
//   // 当获得焦点时触发
//   focus?: (event: FocusEvent) => void;
//   // 下拉框出现/隐藏时触发	
//   visibleChange?: (value: boolean) => void;
//   // 在多选模式下，移除Tag时触发	
//   removeTag?: (value: CascaderNode['valueByOption']) => void;

// }


// export interface CERadioProps extends RadioProps, RadioGroupProps, CEFormItems {
//   name: CEFormItems['name'];
//   label: string;
//   "update:modelValue"?: (val: string | number | boolean) => boolean;
//   change?: (val: string | number | boolean) => boolean;
// }
// export interface CECheckboxGroupProps extends CheckboxProps, CheckboxGroupProps, CEFormItems {
//   name: CEFormItems['name'];
//   size: CheckboxProps['size'];
//   label: CEFormItems['label'];
//   validateEvent: CheckboxGroupProps['validateEvent'];
//   modelValue: any;
//   disabled: CheckboxGroupProps['disabled'];

// }
// export interface CESliderProps extends SliderProps, CEFormItems {
//   name: CEFormItems['name'];
// }
// export interface CESwitchProps extends SwitchProps, CEFormItems {
//   name: CEFormItems['name'];
// }
// export interface CETimePickerDefaultProps extends TimePickerDefaultProps, CEFormItems {
//   name: CEFormItems['name'];
// }
// export interface CERateProps extends RateProps, CEFormItems {

// }
// export interface CEUploadProps extends UploadProps, CEFormItems {
//   name: CEFormItems['name'];
// }
// export interface CEColorPickerProps extends ColorPickerProps, CEFormItems {

// }

// export interface CETransferProps extends TransferProps, CEFormItems {

// }
// export interface CEFormProps extends FormProps, CEFormItems {
//   rules: FormProps['rules'];
//   inlineMessage: FormProps['inlineMessage'];


// }
// export interface CEFormItemProps extends FormItemProps, CEFormItems {
//   prop: CEFormItems['prop'];
//   rules: CEFormItems['rules'];

// }
// export interface CEButtonProps extends ButtonProps, CEFormItems {

// }
// export interface CEIOptionProps extends IOptionProps, CEFormItems {

// }
// export interface CERadioGroupProps extends RadioProps, RadioGroupProps, CEFormItems {
//   name: CEFormItems['name'];
//   label: string;

// }
// export interface CECheckboxGroupProps extends CheckboxGroupProps, CEFormItems {

// }

// export interface CEImageProps extends ImageProps, CEFormItems {

// }
// export interface CEAutocompleteProps extends AutocompleteProps, CEFormItems {

// }

// // export type CEFormConfig = CESelectProps |
// //   CEInputProps |
// //   CERadioProps |
// //   CECheckboxGroupProps |
// //   CESliderProps |
// //   CESwitchProps |
// //   CETimePickerDefaultProps |
// //   CERateProps |
// //   CEUploadProps |
// //   CEColorPickerProps |
// //   CECascaderProps |
// //   CETransferProps |
// //   CEFormProps |
// //   CEFormItemProps |
// //   CEButtonProps |
// //   CEIOptionProps |
// //   CERadioGroupProps |
// //   CECheckboxGroupProps |
// //   CEInputNumberProps |
// //   CEImageProps |
// //   CEAutocompleteProps;

// export type CEFormConfig = [
//   // CEInputProps,
//   // CEInputProps,
//   // CEInputProps,
//   CEInputNumberProps,
//   CESelectProps,
//   CECascaderProps,
//   CERadioGroupProps,
//   CECheckboxGroupProps,
//   CESliderProps,
//   CESwitchProps,
//   CETimePickerDefaultProps,
//   CETimePickerDefaultProps,
//   CERateProps,
//   CEColorPickerProps,
//   CEUploadProps,
//   CETransferProps,
//   CEFormProps,
//   CEFormItemProps,
//   CEButtonProps,
//   CEImageProps,

//   // CEIOptionProps,
//   // CERadioGroupProps,
//   // CECheckboxGroupProps,
//   // CEAutocompleteProps
// ];