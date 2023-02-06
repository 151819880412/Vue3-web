import { PageResult, Result } from "#/axios";
import { defHttp } from "@/utils/http";
import { DictPageModel } from "../../model/dictModel";
import DictService from "../dictService";

export default class DictServiceImpl implements DictService {

  queryDictListByPage(currentPage: number, pageSize: number, data: DictPageModel): Promise<Result<PageResult<DictPageModel>>> {
    return defHttp.post<Result<PageResult<DictPageModel>>>({ url: `/dict/page/${currentPage}/${pageSize}`, data });
  }

  queryDictById(dictId: string): Promise<Result<DictPageModel>> {
    return defHttp.get<Result<DictPageModel>>({ url: `/dict/queryDictById`, params: { dictId } });
  }

  queryDictByDictType(data: string[]): Promise<Result<DictPageModel>> {
    return defHttp.post<Result<DictPageModel>>({ url: `/dict/queryDictByDictType`, data });
  }

  addDict(data: DictPageModel): Promise<Result<DictPageModel>> {
    return defHttp.post<Result<DictPageModel>>({ url: `/dict/addDict`, data });
  }

  editorDict(data: DictPageModel): Promise<Result<DictPageModel>> {
    return defHttp.post<Result<DictPageModel>>({ url: `/dict/editorDict`, data });
  }

  changeState(data: DictPageModel): Promise<Result<DictPageModel>> {
    return defHttp.post<Result<DictPageModel>>({ url: `/user/page`, data });
  }

}