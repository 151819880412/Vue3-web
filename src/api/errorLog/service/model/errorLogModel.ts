import { BaseModel } from "@/api/baseModel";
import { ErrorLogInfo } from '../../../../../types/store';

export interface ErrorlogQueryModel {
  type?: string;
}

export interface ErrorlogPageModel extends BaseModel , ErrorLogInfo{
  errorLogId: string;
}