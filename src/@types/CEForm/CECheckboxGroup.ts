import { CheckboxGroupEmits, CheckboxGroupProps, CheckboxValueType } from "element-plus";
import { CEFormItem } from "./CEFormItem";
// import { CECheckbox } from "./CECheckbox";


export interface CECheckboxGroupProps extends CheckboxGroupProps, CheckboxGroupEmits {

}

export class CECheckboxGroup extends CEFormItem implements CECheckboxGroupProps {
  // declare slots?: CECheckbox[];

  indeterminate = false;
  disabled = false;
  checked = false;
  border = false;
  validateEvent = true;
  modelValue: (string | number)[] = [];
  trueLabel?: string | number | undefined;
  falseLabel?: string | number | undefined;
  id?: string | undefined;
  controls?: string | undefined;
  tabindex?: string | number | undefined;
  tag = 'div';
  min?: number | undefined;
  max?: number | undefined;
  fill?: string | undefined;
  textColor?: string | undefined;
  'update:modelValue': (val: CheckboxValueType[]) => boolean = (val: CheckboxValueType[]) => {
    this.modelValue = val as unknown as (string | number)[];
    return true;
  };
  change!: (val: CheckboxValueType[]) => boolean;

  constructor(data: Partial<CECheckboxGroup>) {
    super({});
    Object.assign(this, data);
  }

}