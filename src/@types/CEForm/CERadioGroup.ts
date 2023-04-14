import { RadioGroupEmits, RadioGroupProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";
// import { CERadio } from "./CERadio";

export interface CERadioGroupProps extends RadioGroupProps, RadioGroupEmits {
  defaultValue: string | number;
}

export class CERadioGroup extends CEFormItem implements CERadioGroupProps {
  defaultValue = '';
  // declare slots?: CERadio[]
  'update:modelValue': (val: string | number | boolean) => boolean = (val: string | number | boolean) => {
    this.modelValue = val;
    return true;
  };
  change!: (val: string | number | boolean) => boolean;
  fill = '	#409EFF';
  modelValue: EpPropMergeType<readonly [StringConstructor, NumberConstructor, BooleanConstructor], unknown, unknown> = '';
  disabled = false;
  textColor = '	#ffffff';
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  id?: string | undefined;

  constructor(data: Partial<CERadioGroup>) {
    super({});
    Object.assign(this, data);
  }
}