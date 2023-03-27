import { FormEmits, FormItemProp, FormItemRule, FormProps } from "element-plus";
import { EpPropMergeType, Arrayable } from "element-plus/es/utils";


export interface CEFormProps extends FormProps, FormEmits {

}

export class CEForm implements CEFormProps {
  label?:string
  prop?:string
  component?:string
  name?:string
  
  labelWidth: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = '';
  inlineMessage = false;
  showMessage: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  disabled = false;
  labelPosition: EpPropMergeType<StringConstructor, "left" | "right" | "top", unknown> = 'right';
  requireAsteriskPosition: EpPropMergeType<StringConstructor, "left" | "right", unknown> = 'left';
  labelSuffix = '';
  inline = false;
  statusIcon = false;
  validateOnRuleChange: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  hideRequiredAsterisk: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  scrollToError = true;
  rules?: Partial<Record<string, Arrayable<FormItemRule>>> | undefined;
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined;
  model?: Record<string, any> | undefined;
  validate!: (prop: FormItemProp, isValid: boolean, message: string) => boolean;

  constructor(data: Partial<CEForm>) {
    Object.assign(this, data);
  }

}