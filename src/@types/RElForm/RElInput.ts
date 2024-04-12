import { InputAutoSize, InputEmits, InputProps } from "element-plus";
import { RElFormItem } from "./RElFormItem";
import { EpPropMergeType } from "element-plus/es/utils";
import { StyleValue, Component } from "vue";
import { renderIcon } from "@/assets/icons";

export interface RElInputProps extends InputProps, InputEmits {
  defaultValue: string;
}

export class RElInput extends RElFormItem implements RElInputProps {
  formData: any;
  defaultValue: string = '';
  value: string | number = '';
  disabled: boolean = false;
  type: string = 'text';
  modelValue: string | number = '';
  autosize: InputAutoSize = false;
  autocomplete: string = 'off';
  readonly: boolean = false;
  clearable: boolean = true;
  showPassword: boolean = false;
  showWordLimit: boolean = false;
  tabindex: string | number = 0;
  validateEvent: boolean = true;
  inputStyle: StyleValue = {};
  id?: string | undefined;
  resize?: EpPropMergeType<StringConstructor, "none" | "both" | "horizontal" | "vertical", unknown> | undefined = 'none';
  formatter?: Function | undefined;
  parser?: Function | undefined;
  placeholder?: string | undefined;
  form?: string | undefined;
  suffixIcon?: string | Component = renderIcon(this.suffixIcon as string, false);
  prefixIcon?: string | Component = renderIcon(this.prefixIcon as string, false);
  containerRole?: string | undefined;
  "update:modelValue": (value: string) => boolean = (value: string) => {
    this.modelValue = value;
    this.value = value;
    this.formData[this.prop] = value;
    return true;
  };
  "onUpdate:modelValue": (value: string) => boolean = (value: string) => this["update:modelValue"](value);
  input: (value: string) => boolean = (value: string) => {
    this.modelValue = value;
    return true;
  };
  change!: (value: string) => boolean;
  focus: (evt: FocusEvent) => boolean = () => {
    this.formData[this.prop] = '';
    return true;
  };
  blur!: (evt: FocusEvent) => boolean;
  clear!: () => boolean;
  mouseleave!: (evt: MouseEvent) => boolean;
  mouseenter!: (evt: MouseEvent) => boolean;
  keydown!: (evt: Event | KeyboardEvent) => boolean;
  compositionstart!: (evt: CompositionEvent) => boolean;
  compositionupdate!: (evt: CompositionEvent) => boolean;
  compositionend!: (evt: CompositionEvent) => boolean;

  constructor(data: Partial<RElInput>) {
    super({});
    Object.assign(this, data);
  }



}