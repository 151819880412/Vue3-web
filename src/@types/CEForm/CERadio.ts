import { RadioEmits, RadioProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";

export interface CERadioProps extends RadioProps, RadioEmits {

}

export class CERadio extends CEFormItem implements CERadioProps {
  slotName = 'default';
  slotHtml?: string;
  component = 'el-radio';
  options: any[] = [];
  modelValue: EpPropMergeType<readonly [StringConstructor, NumberConstructor, BooleanConstructor], unknown, unknown> = '';
  border = false;
  disabled = false;
  'update:modelValue': (val: string | number | boolean) => boolean;
  change!: (val: string | number | boolean) => boolean;

  constructor(data: Partial<CERadio>) {
    super({});
    Object.assign(this, data);
  }

}