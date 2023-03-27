import { InputAutoSize, InputEmits, InputProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";
import { StyleValue } from "vue";

export interface CEInputProps extends InputProps, InputEmits {

}

export class CEInput extends CEFormItem implements CEInputProps {
  type = 'text';
  disabled = false;
  autosize: InputAutoSize = false;
  // modelValue: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>;
  modelValue = '';
  autocomplete = 'off';
  readonly: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  clearable: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  showPassword: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  showWordLimit: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  tabindex: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = 0;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  inputStyle: StyleValue = [];
  id?: string | undefined;
  resize: EpPropMergeType<StringConstructor, "vertical" | "none" | "both" | "horizontal", unknown> = 'none';
  // eslint-disable-next-line @typescript-eslint/ban-types
  formatter?: (value: string | number) => string | undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  parser?: (value: string) => string | undefined;
  placeholder?: string | undefined;
  form?: string | undefined;
  suffixIcon?: string = '';
  prefixIcon?: string = '';
  containerRole?: string | undefined;
  autofocus = false;
  "update:modelValue": ((val: string) => boolean) = (val: string) => {
    this.modelValue = val;
    return true;
  };
  input: ((value: string) => boolean) = (value: string) => {
    this.modelValue = value;
    return true;
  };
  change!: ((value: string) => boolean);
  focus!: ((evt: FocusEvent) => boolean);
  blur!: ((evt: FocusEvent) => boolean);
  clear!: (() => boolean);
  mouseleave!: ((evt: MouseEvent) => boolean);
  mouseenter!: ((evt: MouseEvent) => boolean);
  keydown!: ((evt: Event | KeyboardEvent) => boolean);
  compositionstart!: ((evt: CompositionEvent) => boolean);
  compositionupdate!: ((evt: CompositionEvent) => boolean);
  compositionend!: ((evt: CompositionEvent) => boolean);

  constructor(data: Partial<CEInput>) {
    super({});
    Object.assign(this, data);
  }

}