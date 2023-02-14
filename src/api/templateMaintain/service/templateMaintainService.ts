import { PageResult, Result } from "#/axios";
import { TemplateMaintainPageModel } from "../model/templateMaintain";

/**
 * 系统字典
 * @date 2023-02-02
 * @param {any} data
 * @returns {any}
 */
export default interface TemplateMaintainService {
  
  
  
  // 分页查询
  queryTemListByPage(currentPage: number, pageSize: number, data: TemplateMaintainPageModel): Promise<Result<PageResult<TemplateMaintainPageModel>>>;

  // 新增字典
  addTemplate(data: TemplateMaintainPageModel): Promise<Result>;

  // 根据id查询
  queryTemplateById(templateMaintainId: string): Promise<Result<TemplateMaintainPageModel>>;

  // 编辑字典
  editorTemplate(data: TemplateMaintainPageModel): Promise<Result>;

  // 删除字典
  delTemplate(data: TemplateMaintainPageModel): Promise<Result>;

  // 启用/禁用
  changeState(data: TemplateMaintainPageModel): Promise<Result>;

}