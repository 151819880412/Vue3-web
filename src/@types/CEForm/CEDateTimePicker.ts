import { DateModelType, Options, SingleOrRange, TimePickerDefaultProps } from "element-plus";
import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds } from "element-plus/es/components/time-picker/src/props/shared";
import { EpPropMergeType } from "element-plus/es/utils";
import { Component, } from "vue";
import { CEFormItem } from "./CEFormItem";

// export interface TimePickerDefaultEmits {
//   change: (prev: number | undefined, cur: number | undefined) => boolean;
//   blur: (e: FocusEvent) => boolean;
//   focus: (e: FocusEvent) => boolean;
//   calendarChange: (arr: Date[]) => boolean;
//   visibleChange: (val: boolean) => boolean;
//   "update:modelValue": (value: string) => boolean;
// }

export interface CEDateTimePickerProps extends TimePickerDefaultProps {
  change: (prev: number | undefined, cur: number | undefined) => boolean;
  blur: (e: FocusEvent) => boolean;
  focus: (e: FocusEvent) => boolean;
  calendarChange: (arr: Date[]) => boolean;
  visibleChange: (val: boolean) => boolean;
  "update:modelValue": (value: string) => boolean;
}

export class CEDateTimePicker extends CEFormItem implements CEDateTimePickerProps {
  clearable: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  clearIcon: string | Component = 'CircleClose';
  editable = true;
  prefixIcon: string | Component = "Date";
  readonly: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  disabled: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  placeholder = '';
  popperOptions!: Partial<Options>;
  rangeSeparator = '-';
  isRange!: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  disabledDate?: (date: Date) => void | undefined;
  cellClassName?: (date: Date) => void | undefined;
  declare label: string;
  disabledHours?: GetDisabledHours | undefined;
  disabledMinutes?: GetDisabledMinutes | undefined;
  disabledSeconds?: GetDisabledSeconds | undefined;
  id?: EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | ((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>))[], unknown, unknown> | undefined;
  format?: string | undefined;
  valueFormat?: string | undefined;
  declare size: 'large' | 'default' | 'small';
  startPlaceholder?: string | undefined;
  endPlaceholder?: string | undefined;
  defaultValue?: Date | [Date, Date] | undefined = undefined;
  defaultTime?: Date | [Date, Date] | undefined = undefined;
  change!: (prev: number | undefined, cur: number | undefined) => boolean;
  blur!: (e: FocusEvent) => boolean;
  focus!: (e: FocusEvent) => boolean;
  calendarChange!: (arr: Date[]) => boolean;
  visibleChange!: (val: boolean) => boolean;
  "update:modelValue": (value: string) => boolean = (value: string)=>{
    this.modelValue = value
    return true
  };
  shortcuts: unknown[] = [];
  arrowControl = false;
  tabindex = 0;
  validateEvent = true;
  unlinkPanels = false;
  name = '';
  popperClass = '';
  type: 'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange' = 'date';
  modelValue: Date | number | string | [DateModelType, DateModelType] = '';

  constructor(data: Partial<CEDateTimePicker>) {
    super({});
    Object.assign(this, data);
  }

}