import { ColorPickerEmits, ColorPickerProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";

export interface CEColorPickerProps extends ColorPickerProps, ColorPickerEmits {

}

export class CEColorPicker extends CEFormItem implements CEColorPickerProps {
  disabled = false;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  showAlpha = false;
  popperClass = '';
  tabindex: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = 0;
  modelValue?: string | undefined;
  id?: string | undefined;
  colorFormat?: string | undefined;
  predefine?: string[] | undefined;
  "update:modelValue": (val: string | null) => boolean = (value: string | null) => {
    this.modelValue = value as string | undefined;
    return true;
  };
  change!: (val: string | null) => boolean;
  activeChange!: (val: string | null) => boolean;

  constructor(data: Partial<CEColorPicker>) {
    super({});
    Object.assign(this, data);
  }

}
