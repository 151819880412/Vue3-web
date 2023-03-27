import { FormItemProps } from "element-plus";
import { EpPropMergeType } from "element-plus/es/utils";

export interface CEColProps {
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  push?: number;
  offset?: number;
  pull?: number;
  tag?: string;
}

export interface CEFormItemProps<T = object> extends FormItemProps {
  component: string;
  prop: string;
  name: string;
  rules: FormItemProps['rules'];
  ceShow:boolean
  showLabel:boolean
  slots: (T & { slotName: string, slotHtml?: string; }[])|Array<never>;
}

export class CEFormItem<T = object> implements CEFormItemProps {
  component = '';
  prop = '';
  name = '';
  rules = {};
  ceShow = true;
  showLabel = true;
  slots: (T & { slotName: string, slotHtml?: string; }[])|Array<never> = [];
  col?: CEColProps = {
    span: 12,
    // xs: 1,
    // sm: 1,
    // md: 1,
    // lg: 1,
    // xl: 1,
    push: 0,
    tag: 'div',
    offset: 0,
    pull: 0
  };


  // slots = {
  //   slotName: "default",
  // };
  labelWidth: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> = '100px';
  inlineMessage: EpPropMergeType<readonly [StringConstructor, BooleanConstructor], unknown, unknown> = '';
  showMessage: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  label = '';
  required: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  error: string | undefined;
  validateStatus: EpPropMergeType<StringConstructor, "" | "error" | "success" | "validating", unknown> = 'error';
  for: string | undefined;
  size: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> = 'default';

  constructor(data: Partial<CEFormItem>) {
    Object.assign(this, data);
  }

}