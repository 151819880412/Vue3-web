
export type tablePropsType<T> = {
  rowClassName?: ({ row, rowIndex }) => | string | undefined;
  border?: boolean;
  height?: string | number | undefined;
  width?: string | number | undefined;
  maxHeight?: string | number | undefined;
  stripe?: boolean;
  size?: 'large' | 'default' | 'small' | undefined;
  fit?: boolean | undefined;
  showHeader?: boolean | undefined;
  highlightCurrentRow?: boolean | undefined;
  currentRowKey?: string | number | undefined;
  cellClassName?: ({ row, column, rowIndex, columnIndex }) => | string | undefined;
  cellStyle?: ({ row, column, rowIndex, columnIndex }) => | object | undefined;
  headerRowClassName?: ({ row, rowIndex }) => | string | undefined;
  headerRowStyle?: ({ row, rowIndex }) => | object | undefined;
  fixed?: true | 'left' | 'right' | undefined;
  data: T[];
  tableLayout?: 'fixed' | 'auto' | undefined,
  flexible?: boolean,
  rowKey?: string | (({ row, rowIndex }) => | string | undefined);
  defaultExpandAll?:boolean;
};

export type columnsBtnType = {
  label:string;
  visible:string;
  fn:string;
}

export type columnsType = {
  label?: string | undefined;
  width?: string | number | undefined;
  prop?: string | undefined;
  showOverflowTooltip?: boolean | undefined;
  fixed?: boolean | 'left' | 'right' | undefined;
  slot?: string | undefined;
  align?: 'left' | 'center' | 'right' | undefined;
  type?: 'selection' | 'operation' | 'index' | 'expand' | undefined;
  visible?:boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operationBtn?:any[]
};

export type tableConfigType<T> = {
  tableProps: tablePropsType<T>;
  columns?: Array<columnsType>;
};

export const tableConfigTypes = function <T>(): tableConfigType<T> {
  return {} as tableConfigType<T>;
};












// import { TableProps } from "element-plus/lib/components/table/src/table/defaults";
// // import _default from "element-plus/es/components/table/src/table/defaults";

// // export type attrsType = {
// //   rowClassName?: ({ row, rowIndex }) => | string | undefined;
// //   border?: boolean;
// //   height?: string | number | undefined;
// //   width?: string | number | undefined;
// //   maxHeight?: string | number | undefined;
// //   stripe?: boolean;
// //   size?: 'large' | 'default' | 'small' | undefined;
// //   fit?: boolean | undefined;
// //   showHeader?: boolean | undefined;
// //   highlight?: boolean | undefined;
// //   currentRowKey?: string | number | undefined;
// //   cellClassName?: ({ row, column, rowIndex, columnIndex }) => | string | undefined;
// //   cellStyle?: ({ row, column, rowIndex, columnIndex }) => | object | undefined;
// //   headerRowClassName?: ({ row, rowIndex }) => | string | undefined;
// //   headerRowStyle?: ({ row, rowIndex }) => | object | undefined;
// //   fixed?: true | 'left' | 'right' | undefined;
// //   defaultExpandAll?:boolean
// // };





// export type columnsType = {
//   label?: string | undefined;
//   width?: string | number | undefined;
//   prop?: string | undefined;
//   showOverflowTooltip?: boolean | undefined;
//   fixed?: true | 'left' | 'right' | undefined;
//   slot?: string | undefined;
//   align?: 'left' | 'center' | 'right' | undefined;
//   type?: 'selection' | undefined | 'index' | 'expand' | undefined;
// };

// export type tableConfigType<T> = {
//   tableProps:  TableProps<T>;
//   // data?: Array<T>;
//   // columns: Array<columnsType>;
// };



// export const tableConfigTypes = function <T>(): tableConfigType<T> {
//   return {} as tableConfigType<T>;
// };


