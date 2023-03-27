import { CascaderNode, CascaderProps, CascaderValue, ExpandTrigger } from "element-plus";
import { CEFormItem } from "./CEFormItem";
import { CascaderNodeValue, CascaderNodePathValue, LazyLoad, isDisabled, isLeaf } from "element-plus/es/components/cascader-panel/src/node";
import { EpPropMergeType } from "element-plus/es/utils";


export interface CECascaderProps extends CascaderProps {
  change: (value: CascaderValue) => void;
  expandChange: (value: CascaderValue) => void;
  blur: (event: FocusEvent) => void;
  focus: (event: FocusEvent) => void;
  visibleChange: (value: boolean) => void;
  removeTag: (value: CascaderNode['valueByOption']) => void;

  modelValue:string[] | number[] | any
  // 可选项数据源，键名可通过 Props 属性配置
  options: Record<string, unknown>[];
  // 配置选项，具体见下表
  props: CascaderProps;
  // 尺寸
  size: EpPropMergeType<StringConstructor, "" | "large" | "default" | "small", unknown>;
  // 输入框占位文本
  placeholder: string;
  // 是否禁用
  disabled?: string | isDisabled | undefined;
  // 是否支持清空选项
  clearable: boolean;
  // 输入框中是否显示选中值的完整路径
  "showAllLevels": boolean;
  // 多选模式下是否折叠 Tag
  "collapseTags": boolean;
  // 选项分隔符
  separator: string;
  // 是否可搜索选项
  filterable: boolean;
  // 自定义搜索逻辑，第一个参数是节点 node ，第二个参数是搜索关键词 keyword ，通过返回布尔值表示是否命中
  "filterMethod"?: (node: CascaderNode, keyword: string) => boolean;
  // 搜索关键词输入的去抖延迟，毫秒
  debounce: number;
  // 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise且 reject，则停止筛选
  beforeFilter?: (value: string) => boolean;
  // 自定义浮层类名
  "popperClass": string;
  // 是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false
  teleported: boolean;
  // 标签类型
  "tagType": 'success' | 'info' | 'warning' | 'danger';
  // 输入时是否触发表单的校验
  "validateEvent": boolean;
}

export class CECascader extends CEFormItem implements CECascaderProps {
  modelValue = []
  options: Record<string, unknown>[] = [];
  props: CascaderProps = {};
  placeholder = '';
  clearable = true;
  "showAllLevels": boolean;
  "collapseTags": boolean;
  separator = '/';
  filterable = false;
  "filterMethod"?: ((node: CascaderNode, keyword: string) => boolean) | undefined;
  debounce = 300;
  beforeFilter?: ((value: string) => boolean) | undefined;
  "popperClass": string;
  teleported = true;
  "tagType": "success" | "info" | "warning" | "danger";
  "validateEvent": boolean;

  change!: (value: CascaderValue) => void;
  expandChange!: (value: CascaderValue) => void;
  blur!: (event: FocusEvent) => void;
  focus!: (event: FocusEvent) => void;
  visibleChange!: (value: boolean) => void;
  removeTag!: (value: CascaderNodeValue | CascaderNodePathValue) => void;

  expandTrigger?: ExpandTrigger | undefined;
  multiple?: boolean | undefined;
  checkStrictly?: boolean | undefined;
  emitPath?: boolean | undefined;
  lazy?: boolean | undefined;
  lazyLoad?: LazyLoad | undefined;
  value?: string | undefined;
  children?: string | undefined;
  disabled?: string | isDisabled | undefined;
  leaf?: string | isLeaf | undefined;
  hoverThreshold?: number | undefined;

  constructor(data: Partial<CECascader>) {
    super({});
    Object.assign(this, data);
  }

}