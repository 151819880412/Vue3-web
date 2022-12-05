import { PageResult, Result } from "#/axios";
import { ErrorLogInfo } from "#/store";
import { ErrorlogPageModel, ErrorlogQueryModel } from "./model/errorLogModel";

/**
 * 错误日志
 * @date 2022-11-30
 * @param {any} data:object
 * @returns {any}
 */
export default interface ErrorLogService {

  // 错误日志分页查询
  rerrorLogPage(currentPage: number, pageSize: number, data: ErrorlogQueryModel): Promise<PageResult<ErrorlogPageModel>>;

  // 错误日志测试
  rerrorLogTest(currentPage: number, pageSize: number, data: ErrorlogQueryModel): Promise<PageResult<ErrorlogPageModel>>;

  // 错误日志新增
  add(data: ErrorLogInfo): Promise<Result>;



}