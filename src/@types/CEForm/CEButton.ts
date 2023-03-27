import { ButtonEmits, ButtonProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";
import { Component } from "vue";

export interface CEButtonProps extends ButtonProps, ButtonEmits {

}

export class CEFormButton extends CEFormItem implements CEButtonProps {
  modelValue=[]
  type: EpPropMergeType<StringConstructor, "" | "success" | "default" | "info" | "warning" | "danger" | "text" | "primary", unknown> = '';
  disabled = false;
  text = false;
  nativeType: EpPropMergeType<StringConstructor, "button" | "submit" | "reset", unknown> = 'button';
  loading = false;
  loadingIcon: string | Component = 'Loading';
  plain = false;
  link = false;
  bg = false;
  autofocus = true;
  round = false;
  circle = false;
  dark = false;
  icon?: string | Component | undefined;
  color?: string | undefined;
  autoInsertSpace?: EpPropMergeType<BooleanConstructor, unknown, unknown> | undefined;
  click!: (evt: MouseEvent) => boolean;
}

export class CEButton implements CEButtonProps {
  type: EpPropMergeType<StringConstructor, "" | "success" | "default" | "info" | "warning" | "danger" | "text" | "primary", unknown> = '';
  disabled = false;
  text = false;
  nativeType: EpPropMergeType<StringConstructor, "button" | "submit" | "reset", unknown> = 'button';
  loading = false;
  loadingIcon: string | Component = 'Loading';
  plain = false;
  link = false;
  bg = false;
  autofocus = true;
  round = false;
  circle = false;
  dark = false;
  icon?: string | Component | undefined;
  color?: string | undefined;
  autoInsertSpace?: EpPropMergeType<BooleanConstructor, unknown, unknown> | undefined;
  click!: (evt: MouseEvent) => boolean;
}