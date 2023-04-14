export enum StateEnum {
  Add = "新 增",
  Edit = '编 辑',
  DatabaseConfig = '数据库设置'
}
export const StateMap = new Map<number, string>([
  [0, "启用"],
  [1, "禁用"],
]);
