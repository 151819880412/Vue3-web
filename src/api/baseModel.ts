export interface BaseModel {
  createdTime: Date;
  updatedTime: Date;
  id: number;
  state: string | number;
  delFlag: string | number;
}