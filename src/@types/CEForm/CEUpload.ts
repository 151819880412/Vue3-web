import { UploadFile, UploadFiles, UploadProgressEvent, UploadProps, UploadRawFile, UploadRequestHandler, UploadUserFile } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { Awaitable, EpPropMergeType } from "element-plus/es/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CEUploadProps extends UploadProps {

}

export class CEUpload extends CEFormItem implements CEUploadProps {
  modelValue=[]
  type = '';
  disabled = false;
  slots: (object[] & { slotName: string; slotHtml?: string | undefined; }[]) | Array<never> = [];
  beforeUpload!: (rawFile: UploadRawFile) => Awaitable<boolean | void | File | Blob | null | undefined>;
  onRemove!: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onChange!: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onPreview!: (uploadFile: UploadFile) => void;
  onSuccess!: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onProgress!: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onError!: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onExceed!: (files: File[], uploadFiles: UploadUserFile[]) => void;
  action = '';
  method = 'post';
  data: Record<string, any> = {};
  multiple: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  drag: EpPropMergeType<BooleanConstructor, unknown, unknown> = false;
  withCredentials = false;
  showFileList: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  accept = '';
  fileList: UploadUserFile[] = [];
  autoUpload: EpPropMergeType<BooleanConstructor, unknown, unknown> = true;
  listType: EpPropMergeType<StringConstructor, "text" | "picture" | "picture-card", unknown> = 'text';
  httpRequest!: UploadRequestHandler;
  beforeRemove?: ((uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>) | undefined;
  headers?: Headers | Record<string, any> | undefined;
  limit?: number | undefined;

  constructor(data: Partial<CEUpload>) {
    super({});
    Object.assign(this, data);
  }

}