import { ISelectProps, Options, Placement } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { OptionType } from "element-plus/es/components/select-v2/src/select.types";
import { EpPropMergeType } from "element-plus/es/utils";
import { Component, ComputedOptions, MethodOptions } from "vue";
// import { CEOption } from './CEOption';

export interface CESelectProps extends ISelectProps {
  defaultValue: string;
  change: (prev: number | undefined, cur: number | undefined) => boolean;
  visibleChange: (val: boolean) => boolean;
  removeTag: (val: Array<any>) => boolean;
  blur: (e: FocusEvent) => boolean;
  clear: (e: FocusEvent) => boolean;
  focus: (e: FocusEvent) => boolean;
  input: (val: number | null | undefined) => boolean;
  "update:modelValue": (value: string) => boolean;
}

export class CESelect extends CEFormItem implements CESelectProps {
  defaultValue = ''
  // declare slots?: CEOption
  change!: (prev: number | undefined, cur: number | undefined) => boolean;
  visibleChange!: (val: boolean) => boolean;
  removeTag!: (val: any[]) => boolean;
  blur!: (e: FocusEvent) => boolean;
  clear!: (e: FocusEvent) => boolean;
  focus!: (e: FocusEvent) => boolean;
  input!: (val: number | null | undefined) => boolean;
  disabled = false;
  validateEvent = true;
  allowCreate = false;
  autocomplete: "inline" | "none" | "both" | "list" = 'none';
  automaticDropdown = false;
  clearable = true;
  clearIcon!: string | Component<any, any, any, ComputedOptions, MethodOptions>;
  effect = 'light';
  collapseTags = false;
  collapseTagsTooltip = false;
  defaultFirstOption = false;
  filterable = false;
  height!: number;
  itemHeight!: number;
  loading = false;
  multiple = false;
  multipleLimit = 0;
  reserveKeyword = true;
  teleported: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  persistent = true;
  popperClass = '';
  popperOptions: Partial<Options> = {};
  remote = false;
  valueKey = 'value';
  scrollbarAlwaysOn!: boolean;
  placement: Placement = 'bottom-start';
  id?: string | undefined;
  modelValue?: any;
  placeholder?: string | undefined;
  estimatedOptionHeight?: number | undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  filterMethod?: Function | undefined;
  loadingText?: string | undefined;
  noDataText?: string | undefined;
  noMatchText?: string | undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  remoteMethod?: Function | undefined;
  options?: OptionType<any>[] | undefined;

  "update:modelValue": ((value: string) => boolean) = (value: string) => {
    this.modelValue = value;
    return true;
  };

  constructor(data: Partial<CESelect>) {
    super({});
    Object.assign(this, data);
  }
  
}