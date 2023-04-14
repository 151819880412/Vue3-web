import { SwitchEmits, SwitchProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";
import { Component } from "vue";

export interface CESwitchProps extends SwitchProps, SwitchEmits {
  defaultValue: string | number | boolean;

}

export class CESwitch extends CEFormItem implements CESwitchProps {
  defaultValue = '';
  modelValue: EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> = '';
  value: EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> = '';
  disabled: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  width: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = '';
  inlinePrompt: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  activeText = '';
  inactiveText = '';
  activeColor = '';
  inactiveColor = '';
  borderColor = '';
  activeValue: EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> = true;
  inactiveValue: EpPropMergeType<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown> = false;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  loading: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  activeIcon?: string | Component | undefined = '';
  inactiveIcon?: string | Component | undefined = '';
  id?: string | undefined;
  beforeChange?: (() => boolean | Promise<boolean>) | undefined;
  tabindex?: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> | undefined;
  "update:modelValue": (val: string | number | boolean) => boolean = (value: string | number | boolean) => {
    this.modelValue = value;
    return true;
  };
  change!: (val: string | number | boolean) => boolean;
  input!: (val: string | number | boolean) => boolean;

  constructor(data: Partial<CESwitch>) {
    super({});
    Object.assign(this, data);
  }

}