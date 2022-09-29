export declare interface FormInterface<R, O> {
  labelWidth?: string | number,
  type: string,
  title: string,
  field: string,
  value: any,
  maxlength?: number,
  isShow?: boolean,
  required: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback?: Function,
  rules: Array<R>,
  options?: Array<O>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: any,
  col?: ColType,
  on?: {
    [propname: string]: (val: string | number | Array<string> | Array<number>) => void;
  },
  // on: Array<string>,
  queryOptionsFn?: {
    url: string,
    data: string,
    label: string,
    value: string;
  };
}

export declare interface Rules {
  message: string,
  required: boolean,
  trigger: string,
  pattern?: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  validator?: Function,
}
export declare interface Options {
  label: string,
  value: string | number,
  // 动态控制是否显示
  hide?: Array<string>;
  // 动态控制是否禁用
  disabled?: Array<string>;
}

export declare interface ColType {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  tag?: any,
}

// export class FormInterface<R, O> {
//   public type: string,
//   public title: string,
//   public field: string,
//   public value: any,
//   public  maxlength?: number,
//   public  required: boolean,
//   public  callback?: Function,
//   public rules: Array<R>,
//   public options?: Array<O>,
//   public  props?: any,
//   public col: ColType,
//   public  on: Array<string>,
//   constructor(parameters) {
//       console.log(parameters)
//   }
// }

// export class ColType = {
//   public span?: number;
//   public offset?: number;
//   public pull?: number;
//   public push?: number;
//   public xs?: number;
//   public sm?: number;
//   public md?: number;
//   public lg?: number;
//   public xl?: number;
//   public tag?: any,
//   constructor(parameters) {
//     console.log(parameters)
// }
// };