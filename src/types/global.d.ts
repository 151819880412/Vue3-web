export declare global {

  // 表示类型 T 或者 null
  declare type Nullable<T> = T | null;
  // 表示一个由字符串作为键，任意类型的值组成的对象
  declare type Recordable<T = any> = Record<string, T>;
}
