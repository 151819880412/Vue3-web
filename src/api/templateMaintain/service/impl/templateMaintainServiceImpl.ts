import { PageResult, Result } from "#/axios";
import { defHttp } from "@/utils/http";
import { TemplateMaintainPageModel } from "../../model/templateMaintain";
import TemplateMaintainService from "../templateMaintainService";

export default class TemplateMaintainImpl implements TemplateMaintainService {

  queryTemListByPage(currentPage: number, pageSize: number, data: TemplateMaintainPageModel): Promise<Result<PageResult<TemplateMaintainPageModel>>> {
    return defHttp.post<Result<PageResult<TemplateMaintainPageModel>>>({ url: `/templateMaintain/page/${currentPage}/${pageSize}`, data });
  }

  addTemplate(data: TemplateMaintainPageModel): Promise<Result<TemplateMaintainPageModel>> {
    return defHttp.post<Result<TemplateMaintainPageModel>>({ url: `/templateMaintain/addTemplate`, data });
  }

  queryTemplateById(templateMaintainId: string): Promise<Result<TemplateMaintainPageModel>> {
    return defHttp.get<Result<TemplateMaintainPageModel>>({ url: `/templateMaintain/queryTemplateById`, params: { templateMaintainId } });
  }

  editorTemplate(data: TemplateMaintainPageModel): Promise<Result<TemplateMaintainPageModel>> {
    return defHttp.post<Result<TemplateMaintainPageModel>>({ url: `/templateMaintain/editorTemplate`, data });
  }

  delTemplate(data: TemplateMaintainPageModel): Promise<Result<TemplateMaintainPageModel>> {
    return defHttp.post<Result<TemplateMaintainPageModel>>({ url: `/templateMaintain/delTemplate`, data });
  }

  changeState(data: TemplateMaintainPageModel): Promise<Result<TemplateMaintainPageModel>> {
    return defHttp.post<Result<TemplateMaintainPageModel>>({ url: `/templateMaintain/changeState`, data });
  }

}