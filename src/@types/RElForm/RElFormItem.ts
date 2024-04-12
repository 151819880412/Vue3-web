import { FormItemProps, FormItemRule } from "element-plus";
import { EpPropMergeType } from "element-plus/es/utils";

export interface RElFormItemProps extends FormItemProps {

}

export class RElFormItem implements RElFormItemProps {
  labelWidth: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = '110';
  inlineMessage: EpPropMergeType<readonly [StringConstructor, BooleanConstructor], unknown, unknown> = false;
  showMessage: boolean = true;
  label?: string | undefined;
  prop: string = '';
  required?: boolean;
  rules?: FormItemRule | FormItemRule[];
  error?: string | undefined;
  validateStatus?: EpPropMergeType<StringConstructor, "" | "error" | "success" | "validating", unknown> | undefined;
  for?: string | undefined;
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined = 'default';

  constructor(data: Partial<RElFormItem>) {
    Object.assign(this, data);
  }

}