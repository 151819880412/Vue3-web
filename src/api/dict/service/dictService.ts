import { PageResult, Result } from "#/axios";
import { DictPageModel } from "../model/dictModel";

/**
 * 系统字典
 * @date 2023-02-02
 * @param {any} data
 * @returns {any}
 */
export default interface DictService {

  // 分页查询
  queryDictListByPage(currentPage:number,pageSize:number,data:DictPageModel):Promise<Result<PageResult<DictPageModel>>>;

  // 查询单个字典
  queryDictById(dictId: string): Promise<Result<DictPageModel>>;

  // 根据字典类型查询
  queryDictByDictType(data: string[]): Promise<Result<DictPageModel>>;

  // 新增字典
  addDict(data: DictPageModel): Promise<Result>;

  // 编辑字典
  editorDict(data: DictPageModel): Promise<Result>;

  // 启用/禁用
  changeState(data: DictPageModel): Promise<Result>;

}