import { RateEmits, RateProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";
import { Component } from "vue";

export interface CERateProps extends RateProps, RateEmits {
  defaultValue: number;

}

export class CERate extends CEFormItem implements CERateProps {
  defaultValue = 0;
  modelValue = 0;
  textColor = '	#1F2D3D';
  lowThreshold = 2;
  highThreshold = 4;
  max = 5;
  colors: string[] | Record<number, string> = ['#F7BA2A', '#F7BA2A', '#F7BA2A'];
  voidColor = '#C6D1DE';
  disabledVoidColor = '#EFF2F7';
  icons: string[] | Component[] | Record<number, string | Component> = ['StarFilled', 'StarFilled', 'StarFilled'];
  voidIcon: string | Component = 'Star';
  disabledVoidIcon: string | Component = 'StarFilled';
  texts: string[] = ['Extremely bad', 'Disappointed', 'Fair', 'Satisfied', 'Surprise'];
  scoreTemplate = '';
  clearable: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  disabled?: EpPropMergeType<BooleanConstructor, unknown, unknown> | undefined;
  id?: string | undefined;
  allowHalf?: EpPropMergeType<BooleanConstructor, unknown, unknown> | undefined;
  showText?: EpPropMergeType<BooleanConstructor, unknown, unknown> | undefined;
  showScore?: EpPropMergeType<BooleanConstructor, unknown, unknown> | undefined;
  change!: (value: number) => boolean;
  'update:modelValue': (value: number) => boolean = (value: number) => {
    this.modelValue = value;
    return true;
  };
  constructor(data: Partial<CERate>) {
    super({});
    Object.assign(this, data);
  }
}