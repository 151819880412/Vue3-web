import { OptionItemProps } from "element-plus/es/components/select-v2/src/select.types";
import { CEFormItemProps } from './CEFormItem';
import { EpPropMergeType } from "element-plus/es/utils";
import { CEtypes } from "./CEIndex";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CEOptionProps extends OptionItemProps {
  defaultValue: string;
}

export class CEOption implements CEOptionProps, CEFormItemProps {
  defaultValue = '';
  slotName = 'default';
  slotHtml?: string;
  component = 'el-option';
  modelValue = '';
  ceShow = true;
  showLabel = true;
  prop = '';
  name = '';
  rules = {};
  // slots: (object[] & { slotName: string; slotHtml?: string | undefined; }[]) | Array<never> = [];
  slots: never[] | (CEtypes & {
    slotName: string; slotHtml?: string | undefined;
  }[]) = [];
  labelWidth: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = '';
  inlineMessage: EpPropMergeType<readonly [StringConstructor, BooleanConstructor], unknown, unknown> = false;
  showMessage: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  label?: string | undefined;
  required?: EpPropMergeType<BooleanConstructor, unknown, unknown> | undefined;
  error?: string | undefined;
  validateStatus?: EpPropMergeType<StringConstructor, "" | "error" | "success" | "validating", unknown> | undefined;
  for?: string | undefined;
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined;
  item: any;
  index = 0;
  disabled = false;
  options: any[] = [];

  constructor(data: Partial<CEOption & { slotName: string, slotHtml?: string; }>) {
    Object.assign(this, data);
  }


}