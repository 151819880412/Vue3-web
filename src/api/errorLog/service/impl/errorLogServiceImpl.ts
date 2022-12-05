



import { defHttp } from '@/utils/http';
import ErrorLogService from '../errorLogService';
import { PageResult, Result } from '#/axios';
import { ErrorlogPageModel, ErrorlogQueryModel } from '../model/errorLogModel';
import { ErrorLogInfo } from '#/store';

export default class ErrorLogServiceImpl implements ErrorLogService {


  /**
   * 错误日志分页
   * @date 2022-11-30
   * @param {any} currentPage:number
   * @param {any} pageSize:number
   * @param {any} data:ErrorlogQueryModel
   * @returns {any}
   */
  public rerrorLogPage(currentPage: number, pageSize: number, data: ErrorlogQueryModel): Promise<PageResult<ErrorlogPageModel>> {
    return defHttp.post<PageResult<ErrorlogPageModel>>({ url: `/errorLog/page/${currentPage}/${pageSize}`, data });
  }

  public add(data: ErrorLogInfo): Promise<Result> {
    return defHttp.post<Result>({ url: `/errorLog/add`, data });
  }

  public rerrorLogTest(currentPage: number, pageSize: number, data: ErrorlogQueryModel): Promise<PageResult<ErrorlogPageModel>> {
    return defHttp.post<PageResult<ErrorlogPageModel>>({ url: `/errorLog/test/${currentPage}/${pageSize}`, data });
  }


}