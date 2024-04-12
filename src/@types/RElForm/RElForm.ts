import { FormEmits, FormItemProp, FormItemRule, FormProps } from "element-plus";
import { EpPropMergeType, Arrayable } from "element-plus/es/utils";

export interface RElFormProps extends FormProps, FormEmits {

}

export class RElForm implements RElFormProps {
  ref:any
  labelPosition: EpPropMergeType<StringConstructor, "top" | "right" | "left", unknown> = 'left';
  requireAsteriskPosition: EpPropMergeType<StringConstructor, "right" | "left", unknown> = 'left';
  labelWidth: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = '110';
  labelSuffix: string = "：";
  inline: boolean = false;
  inlineMessage: boolean = false;
  statusIcon: boolean = false;
  showMessage: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  validateOnRuleChange: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  hideRequiredAsterisk: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  scrollToError: boolean = true;
  disabled: boolean = false;
  model?: Record<string, any> | undefined;
  rules?: Partial<Record<string, Arrayable<FormItemRule>>> | undefined;
  scrollIntoViewOptions?: EpPropMergeType<readonly [ObjectConstructor, BooleanConstructor], unknown, unknown> | undefined = true;
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined = 'default';
  validate!: (prop: FormItemProp, isValid: boolean, message: string) => boolean;

  constructor(data: Partial<RElForm>) {
    Object.assign(this, data);
  }

}
