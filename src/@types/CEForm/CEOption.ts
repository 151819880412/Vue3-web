import { OptionItemProps } from "element-plus/es/components/select-v2/src/select.types";
import { CEFormItemProps } from './CEFormItem';
import { EpPropMergeType } from "element-plus/es/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CEOptionProps extends OptionItemProps {
}

export class CEOption implements CEOptionProps, CEFormItemProps {
  slotName = 'default';
  slotHtml?: string;
  component = 'el-option';
  ceShow = true;
  showLabel = true;
  prop = '';
  name = '';
  rules = {};
  slots: (object[] & { slotName: string; slotHtml?: string | undefined; }[]) | Array<never> = [];
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