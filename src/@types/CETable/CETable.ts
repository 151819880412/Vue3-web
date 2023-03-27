import { CETableColumnProps } from "./CETableColumn ";

export interface CETableProps<T> {
  ceRef: string;
  column: CETableColumnProps[];
  data: T[]; // 显示的数据
  height: string | number; // Table 的高度，可以是数字类型的像素值，也可以是表示样式高度的字符串
  maxHeight: string | number; // Table 的最大高度，可以是数字或者单位为像素的字符串
  stripe: boolean; // 是否为斑马纹 table
  border: boolean; // 是否带有纵向边框
  size: 'large' | 'default' | 'small'; // Table 的尺寸
  fit: boolean; // 列的宽度是否自撑开
  showHeader: boolean; // 是否显示表头
  highlightCurrentRow: boolean; // 是否要高亮当前行
  currentRowKey: string | number; // 当前行的 key
  rowClassName: string | ((row: any, rowIndex: number) => string); // 行的 className 的回调方法或一个字符串，参数为当前行和行号
  rowStyle: object | ((row: any, rowIndex: number) => object); // 行的 style 的回调方法或一个 Object，参数为当前行和行号
  cellClassName: string | ((row: any, column: any, rowIndex: number, columnIndex: number) => string); // 单元格的 className 的回调方法或一个字符串，参数为当前行、当前列和行列号
  cellStyle: object | ((row: any, column: any, rowIndex: number, columnIndex: number) => object); // 单元格的 style 的回调方法或一个 Object，参数为当前行、当前列和行列号
  headerRowClassName: string | ((row: any, rowIndex: number) => string); // 表头行的 className 的回调方法或一个字符串，参数为当前行和行号
  headerRowStyle: object | ((row: any, rowIndex: number) => object); // 表头行的 style 的回调方法或一个 Object，参数为当前行和行号
  headerCellClassName: string | ((column: any, columnIndex: number) => string); // 表头单元格的 className 的回调方法或一个字符串，参数为当前列和列号
  headerCellStyle: object | ((column: any, columnIndex: number) => object); // 表头单元格的 style 的回调方法或一个 Object，参数为当前列和列号
  rowKey: string | ((row: any) => string | number); // 行数据的 key，用来优化 Table 的渲染
  emptyText: string; // 空数据时显示的文本内容
  defaultExpandAll: boolean; // 是否默认展开所有行
  expandRowKeys: (string | number)[]; // 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
  defaultSort: { prop: string, order: 'ascending' | 'descending' }; // 默认的排序列的 prop 和顺序，prop 属性指定默认的排序的列，order 指定默认排序的顺序
  tooltipEffect: 'dark' | 'light'; // 溢出的 tooltip 的 effect
  tooltipOptions: object; // 溢出 tooltip 的选项，参见下述 tooltip 组件
  showSummary: boolean; // 是否在表尾显示合计行
  sumText: string; // 显示摘要行第一列的文本
  summaryMethod: (props: { columns: any[], data: any[] }) => any[]; // 自定义的合计计算方法
  spanMethod: (props: { row: any, column: any, rowIndex: number, columnIndex: number }) => [number, number]; // 合并行或列的计算方法
  selectOnIndeterminate: boolean; // 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为，若为 true，则选中所有行；若为 false，则取消选择所有行。
  indent: number; // 展示树形数据时，树节点的缩进
  lazy: boolean; // 是否懒加载子节点数据
  load: (row: any, treeNode: any, resolve: Function) => void; // 加载子节点数据的函数，lazy 为 true 时生效
  treeProps: { hasChildren: string, children: string }; // 渲染嵌套数据的配置选项
  tableLayout: 'fixed' | 'auto'; // 设置表格单元、行和列的布局方式
  scrollbarAlwaysOn: boolean; // 总是显示滚动条
  flexible: boolean; // 确保主轴的最小尺寸
}

export class CETable<T> implements CETableProps<T> {
  ceRef: string = 'ceTableRef';
  column: CETableColumnProps[] = [];
  data: T[] = [];
  height!: string | number;
  maxHeight!: string | number;
  stripe: boolean = false;
  border: boolean = true;
  size: "large" | "default" | "small" = 'default';
  fit: boolean = true;
  showHeader: boolean = true;
  highlightCurrentRow: boolean = true;
  currentRowKey!: string | number;
  rowClassName!: string | ((row: any, rowIndex: number) => string);
  rowStyle!: object | ((row: any, rowIndex: number) => object);
  cellClassName!: string | ((row: any, column: any, rowIndex: number, columnIndex: number) => string);
  cellStyle!: object | ((row: any, column: any, rowIndex: number, columnIndex: number) => object);
  headerRowClassName!: string | ((row: any, rowIndex: number) => string);
  headerRowStyle!: object | ((row: any, rowIndex: number) => object);
  headerCellClassName!: string | ((column: any, columnIndex: number) => string);
  headerCellStyle!: object | ((column: any, columnIndex: number) => object);
  rowKey!: string | ((row: any) => string | number);
  emptyText: string = '暂无数据';
  defaultExpandAll: boolean = false;
  expandRowKeys!: (string | number)[];
  defaultSort!: { prop: string; order: "ascending" | "descending"; };
  tooltipEffect: "dark" | "light" = 'dark';
  tooltipOptions: object = { enterable: true, placement: 'top', showArrow: true, hideAfter: 200, popperOptions: { strategy: 'fixed' } };
  showSummary: boolean = false;
  sumText: string = 'Sum';
  summaryMethod!: (props: { columns: any[]; data: any[]; }) => any[];
  spanMethod!: (props: { row: any; column: any; rowIndex: number; columnIndex: number; }) => [number, number];
  selectOnIndeterminate: boolean = true;
  indent: number = 16;
  lazy!: boolean;
  load!: (row: any, treeNode: any, resolve: Function) => void;
  treeProps!: { hasChildren: string; children: string; };
  tableLayout: "fixed" | "auto" = 'fixed';
  scrollbarAlwaysOn: boolean = false;
  flexible: boolean = false;
}


















// import { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults';
// import { ColumnCls, ColumnStyle, Sort, SummaryMethod, TableProps,Table, TreeNode } from 'element-plus/lib/components/table/src/table/defaults';
// import { CSSProperties, } from 'vue';
// import { CETableColumnProps } from './CETableColumn ';


// export interface CETableProps<T> extends TableProps<T> {
//   ceRef: string;
//   column: CETableColumnProps<T>[];
// }

// export class CETable<T> implements CETableProps<T> {
//   column: CETableColumnProps<T>[] = [];
//   ceRef = 'cetable';
//   data: T[] = [];
//   size: string | undefined;
//   width: string | number | undefined;
//   height: string | number | undefined;
//   maxHeight: string | number | undefined;
//   fit: boolean | undefined;
//   stripe: boolean | undefined;
//   border: boolean | undefined;
//   rowKey: string | ((row: T) => string) | undefined;
//   context: Table<any>;
//   showHeader: boolean | undefined;
//   showSummary: boolean | undefined;
//   sumText: string | undefined;
//   summaryMethod: SummaryMethod<T> | undefined;
//   rowClassName: ColumnCls<T> | undefined;
//   rowStyle: ColumnStyle<T> | undefined;
//   cellClassName: (string | ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number; }) => string)) | undefined;
//   cellStyle: (CSSProperties | ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number; }) => CSSProperties)) | undefined;
//   headerRowClassName: ColumnCls<T> | undefined;
//   headerRowStyle: ColumnStyle<T> | undefined;
//   headerCellClassName: (string | ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number; }) => string)) | undefined;
//   headerCellStyle: (CSSProperties | ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number; }) => CSSProperties)) | undefined;
//   highlightCurrentRow: boolean | undefined;
//   currentRowKey: string | number | undefined;
//   emptyText: string | undefined;
//   expandRowKeys: any[] | undefined;
//   defaultExpandAll: boolean | undefined;
//   defaultSort: Sort | undefined;
//   tooltipEffect: string | undefined;
//   spanMethod: ((data: { row: T; rowIndex: number; column: TableColumnCtx<T>; columnIndex: number; }) => number[] | { rowspan: number; colspan: number; } | undefined) | undefined;
//   selectOnIndeterminate: boolean | undefined;
//   indent: number | undefined;
//   treeProps: { hasChildren: string | undefined; children: string | undefined; } | undefined;
//   lazy: boolean | undefined;
//   load: ((row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void) | undefined;
//   className: string | undefined;
//   style: CSSProperties | undefined;
//   tableLayout: 'fixed' | 'auto' = 'auto';
//   flexible = true;

// }