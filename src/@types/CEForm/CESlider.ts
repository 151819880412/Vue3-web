import { SliderProps, SliderEmits, Placement } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType, Arrayable } from "element-plus/es/utils";


export interface CESliderProps extends SliderProps, SliderEmits {
  defaultValue: number;

}

export class CESlider extends CEFormItem implements CESliderProps {
  defaultValue = 0;
  modelValue: EpPropMergeType<(new (...args: any[]) => number | number[]) | (() => Arrayable<number>) | ((new (...args: any[]) => number | number[]) | (() => Arrayable<number>))[], unknown, unknown> = 0;
  disabled = false;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  min = 0;
  max = 100;
  step = 1;
  showInput = false;
  showInputControls: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  showStops = false;
  showTooltip: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  range = false;
  vertical = false;
  debounce = 300;
  placement: EpPropMergeType<StringConstructor, Placement, unknown> = 'top';
  id?: string | undefined;
  inputSize?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never> | undefined;
  formatTooltip?: ((val: number) => string | number) | undefined;
  height?: string | undefined;
  rangeStartLabel?: string | undefined;
  rangeEndLabel?: string | undefined;
  formatValueText?: ((val: number) => string) | undefined;
  tooltipClass?: string | undefined;
  marks?: any | undefined = undefined;
  'update:modelValue': (value: Arrayable<number>) => boolean = (value: Arrayable<number>) => {
    this.modelValue = value;
    return true;
  };
  input!: (value: Arrayable<number>) => boolean;
  change!: (value: Arrayable<number>) => boolean;

  constructor(data: Partial<CESlider>) {
    super({});
    Object.assign(this, data);
  }

}