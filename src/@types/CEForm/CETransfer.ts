import { TransferDataItem, TransferDirection, TransferEmits, TransferFormat, TransferKey, TransferProps, TransferPropsAlias, renderContent } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { EpPropMergeType } from "element-plus/es/utils";

export interface CETransferProps extends TransferProps, TransferEmits {

}

export class CETransfer extends CEFormItem implements CETransferProps {
  data: TransferDataItem[] = [];
  titles: [string, string] = ['List 1', 'List 2'];
  buttonTexts: [string, string] = ['To left', 'To right'];
  leftDefaultChecked: TransferKey[] = [];
  rightDefaultChecked: TransferKey[] = [];
  modelValue: TransferKey[] = [];
  format: TransferFormat = { noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' };
  filterable = false;
  props: TransferPropsAlias = {};
  targetOrder: EpPropMergeType<StringConstructor, "push" | "unshift" | "original", unknown> = 'original';
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  filterPlaceholder?: string | undefined;
  filterMethod?: ((query: string, item: TransferDataItem) => boolean) | undefined;
  renderContent?: renderContent | undefined;
  change!: (value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => boolean;
  "update:modelValue": (value: TransferKey[]) => boolean = (value: TransferKey[]) => {
    this.modelValue = value;
    return true;
  };
  "left-check-change": (value: TransferKey[], movedKeys?: TransferKey[] | undefined) => boolean;
  "right-check-change": (value: TransferKey[], movedKeys?: TransferKey[] | undefined) => boolean;

  constructor(data: Partial<CETransfer>) {
    super({});
    Object.assign(this, data);
  }

}