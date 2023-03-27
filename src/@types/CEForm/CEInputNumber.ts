import { InputNumberEmits, InputNumberProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";

export interface CEInputNumberProps extends InputNumberProps, InputNumberEmits {
  name: CEFormItem['name'];
  change: (prev: number | undefined, cur: number | undefined) => boolean;
  blur: (e: FocusEvent) => boolean;
  focus: (e: FocusEvent) => boolean;
  input: (val: number | null | undefined) => boolean;
  "update:modelValue": (val: number | undefined) => boolean;
}

export class CEInputNumber extends CEFormItem implements CEInputNumberProps {
  change!: (prev: number | undefined, cur: number | undefined) => boolean;
  blur!: (e: FocusEvent) => boolean;
  focus!: (e: FocusEvent) => boolean;
  input!: (val: number | null | undefined) => boolean;
  "update:modelValue": (val: number | undefined) => boolean = (val: number | undefined) => {
    this.modelValue = val;
    return true;
  };
  step = 1;
  stepStrictly = false;
  max = Infinity;
  min = -Infinity;
  readonly = false;
  disabled = false;
  controls: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  controlsPosition: EpPropMergeType<StringConstructor, "" | "right", unknown> = '';
  valueOnClear: number | null | 'min' | 'max' = null;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  id?: string | undefined;
  modelValue?: number | undefined;
  placeholder?: string | undefined;
  precision?: number | undefined;
  constructor(data: Partial<CEInputNumber>) {
    super({});
    Object.assign(this, data);
  }
}