import { CheckboxEmits, CheckboxProps, CheckboxValueType } from "element-plus";
import { CEFormItem } from "./CEFormItem";


export interface CECheckboxProps extends CheckboxProps, CheckboxEmits {
  defaultValue: string;

}

export class CECheckbox extends CEFormItem implements CECheckboxProps {
  defaultValue = '';
  slotName = 'default';
  slotHtml?: string;
  component = 'el-checkbox';
  options: any[] = [];

  indeterminate = false;
  disabled = false;
  checked = false;
  border = false;
  validateEvent = true;
  modelValue?: string | number | boolean | undefined;
  trueLabel?: string | number | undefined;
  falseLabel?: string | number | undefined;
  id?: string | undefined;
  controls?: string | undefined;
  tabindex?: string | number | undefined;
  'update:modelValue': (val: CheckboxValueType) => boolean = (val: CheckboxValueType) => {
    this.modelValue = val;
    return true;
  };
  change!: (val: CheckboxValueType) => boolean;

  constructor(data: Partial<CECheckbox>) {
    super({});
    Object.assign(this, data);
  }
}