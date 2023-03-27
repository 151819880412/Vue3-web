import { getUuid } from "@/utils";

export interface CETableColumnProps {
  ceId: string;
  type: 'selection' | 'index' | 'expand';
  index?: number | ((index: number) => number);
  label?: string;
  columnKey?: string;
  prop?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: string | boolean;
  renderHeader?: ({ column, $index }) => any;
  sortable?: boolean | string;
  sortMethod?: (a: any, b: any) => number;
  sortBy?: string | string[] | ((row: any, index: number) => any);
  sortOrders?: Array<'ascending' | 'descending' | null>;
  resizable?: boolean;
  formatter?: (row: any, column: any, cellValue: any, index: number) => any;
  showOverflowTooltip?: boolean | object;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  className?: string;
  labelClassName?: string;
  selectable?: (row: any, index: number) => boolean;
  reserveSelection?: boolean;
  filters?: Array<{ text: string, value: string; }>;
  filterPlacement?: string;
  filterMultiple?: boolean;
  filterMethod?: (value: any, row: any, column: any) => boolean;
  filteredValue?: any[];
}

export class CEColumn implements CETableColumnProps {
  ceId: string = getUuid();
  type: 'selection' | 'index' | 'expand' = 'expand';
  index?: number | ((index: number) => number) | undefined;
  label?: string | undefined;
  columnKey?: string | undefined;
  prop?: string | undefined;
  width?: string | number | undefined;
  minWidth?: string | number | undefined;
  fixed?: string | boolean | undefined;
  renderHeader?: (({ column, $index }: { column: any; $index: any; }) => any) | undefined;
  sortable?: string | boolean | undefined;
  sortMethod?: ((a: any, b: any) => number) | undefined;
  sortBy?: string | string[] | ((row: any, index: number) => any) | undefined;
  sortOrders?: ("ascending" | "descending" | null)[] | undefined;
  resizable?: boolean | undefined;
  formatter?: ((row: any, column: any, cellValue: any, index: number) => any) | undefined;
  showOverflowTooltip?: boolean | object | undefined;
  align?: "left" | "center" | "right" | undefined;
  headerAlign?: "left" | "center" | "right" | undefined;
  className?: string | undefined;
  labelClassName?: string | undefined;
  selectable?: ((row: any, index: number) => boolean) | undefined;
  reserveSelection?: boolean | undefined;
  filters?: { text: string; value: string; }[] | undefined;
  filterPlacement?: string | undefined;
  filterMultiple?: boolean | undefined;
  filterMethod?: ((value: any, row: any, column: any) => boolean) | undefined;
  filteredValue?: any[] | undefined;

}


// export interface CETableColumnProps<T> extends TableColumnCtx<T> {
//   ceShow:boolean
// }

// export class CEColumn<T>  implements CETableColumnProps<T> {
//   ceShow = true;
//   id!: string;
//   realWidth!: number;
//   type!: string;
//   label!: string;
//   className!: string;
//   labelClassName!: string;
//   property!: string;
//   prop!: string;
//   width!: string | number;
//   minWidth!: string | number;
//   renderHeader!: (data: { column: TableColumnCtx<T>; $index: number; }) => VNode<RendererNode, RendererElement, { [key: string]: any; }>;
//   sortable: string | boolean = false;
//   sortMethod!: (a: T, b: T) => number;
//   sortBy!: string | string[] | ((row: T, index: number) => string);
//   resizable = true;
//   columnKey!: string;
//   rawColumnKey!: string;
//   align: 'left' | 'center' | 'right' = 'center';
//   headerAlign!: string;
//   showTooltipWhenOverflow = true;
//   showOverflowTooltip = true;
//   fixed!: string | boolean;
//   formatter!: (row: T, column: TableColumnCtx<T>, cellValue: any, index: number) => string | VNode<RendererNode, RendererElement, { [key: string]: any; }>;
//   selectable!: (row: T, index: number) => boolean;
//   reserveSelection = false;
//   filterMethod!: FilterMethods<T>;
//   filteredValue!: string[];
//   filters!: Filters;
//   filterPlacement!: string;
//   filterMultiple = true;
//   index!: number | ((index: number) => number);
//   sortOrders: ("ascending" | "descending" | null)[] = ['ascending', 'descending', null];
//   renderCell!: (data: any) => void;
//   colSpan!: number;
//   rowSpan!: number;
//   children!: TableColumnCtx<T>[];
//   level!: number;
//   filterable!: boolean | FilterMethods<T> | Filters;
//   order!: string;
//   isColumnGroup!: boolean;
//   isSubColumn!: boolean;
//   columns!: TableColumnCtx<T>[];
//   getColumnIndex!: () => number;
//   no!: number;
//   filterOpened?: boolean | undefined;

// }



/**
- `id`: 列的唯一标识符。
- `realWidth`: 实际宽度，单位是像素。
- `type`: 列类型，有 `selection`（选择列）、 `index`（序号列）、 `expand`（展开列）和普通列（默认为空）。
- `label`: 列标题文本。
- `className`: 列 class 名称。
- `labelClassName`: 列标题的 class 名称。
- `property`: 列字段名，用于数据绑定。
- `prop`: 列字段名，用于数据绑定（与 `property` 相同）。
- `width`: 列宽度，单位是像素。
- `minWidth`: 列最小宽度，单位是像素。
- `renderHeader`: 列标题的自定义渲染方法。
- `sortable`: 是否可排序。
- `sortMethod`: 自定义排序方法。
- `sortBy`: 排序优先级。
- `resizable`: 是否可调整列宽。
- `columnKey`: 作为列的绑定值，以便排序和过滤等操作。
- `rawColumnKey`: 原始列的绑定值。
- `align`: 列对齐方式，包括 `left`、`center` 和 `right`。
- `headerAlign`: 列标题对齐方式。
- `showTooltipWhenOverflow`: 当单元格内容溢出时，是否显示提示框。
- `showOverflowTooltip`: 是否显示单元格内容不限行的提示框。
- `fixed`: 是否固定列。
- `formatter`: 单元格内容的自定义渲染方法。
- `selectable`: 单元格是否可选。
- `reserveSelection`: 多选、全选时是否保留之前的选择。
- `filterMethod`: 自定义筛选方法。
- `filteredValue`: 已选中的筛选条件。
- `filters`: 筛选菜单选项，格式为 `{ text: string, value: any }[]`。
- `filterPlacement`: 筛选菜单的弹出位置。
- `filterMultiple`: 是否可多选筛选菜单中的选项。
- `index`: 序号列对应的序号值。
- `sortOrders`: 排序方式，包括 `ascending`（升序）和 `descending`（降序）。
- `renderCell`: 单元格内容的自定义渲染方法。
- `colSpan`: 单元格合并列数量。
- `rowSpan`: 单元格合并行数量。
- `children`: 子列的配置列表。
- `level`: 列的级别，用于子列合并。
- `filterable`: 是否可筛选。
- `order`: 排序优先级。
- `isColumnGroup`: 是否为组合列。
- `isSubColumn`: 是否为子列。
- `columns`: 组合列的子列配置列表。
- `getColumnIndex`: 获取列索引。
- `filterOpened`: 是否展示筛选弹窗。
 */