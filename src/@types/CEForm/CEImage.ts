import { ImageEmits, ImageProps } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";


export interface CEImageProps extends ImageProps, ImageEmits {
  defaultValue: string;

}

export class CEFormImage extends CEFormItem implements CEImageProps {
  defaultValue = '';
  modelValue = [];
  hideOnClickModal: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  src = '';
  fit: EpPropMergeType<StringConstructor, "" | "fill" | "none" | "contain" | "cover" | "scale-down", unknown> = '';
  lazy: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  previewSrcList: string[] = [];
  previewTeleported: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  initialIndex = 0;
  infinite: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  closeOnPressEscape: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  loading?: EpPropMergeType<StringConstructor, "lazy" | "eager", unknown> | undefined;
  scrollContainer?: EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement | undefined) | ((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement | undefined))[], unknown, unknown>;
  zIndex?: number | undefined;
  load!: (evt: Event) => boolean;
  switch!: (val: number) => boolean;
  close!: () => boolean;
  show!: () => boolean;
  declare error: any;

  constructor(data: Partial<CEFormImage>) {
    super({});
    Object.assign(this, data);
  }

}