



import { PageResult, Result } from '#/axios';
import { defHttp } from '@/utils/http';
import { RoleAddModel, RoleChangeStateModel, RoleEditorModel, RolePageModel, RoleQueryModel } from '../model/roleModel';
import RoleService from '../roleService';

export default class RoleServiceImpl implements RoleService {

  /**
   * 新增角色
   * @date 2022-08-10
   * @param {any} data:RoleAddModel
   * @returns {any}
   */
  public addRole(data: RoleAddModel) {
    return defHttp.post({ url: '/role/add', data });
  }

  /**
   * 角色分页
   * @date 2022-08-10
   * @param {any} currentPage:number
   * @param {any} pageSize:number
   * @param {any} data:RoleQueryModel
   * @returns {any}
   */
  public rolePage(currentPage: number, pageSize: number, data: RoleQueryModel): Promise<PageResult<RolePageModel>> {
    return defHttp.post<PageResult<RolePageModel>>({ url: `/role/page/${currentPage}/${pageSize}`, data });
  }

  /**
   * 启用禁用
   * @date 2022-08-09
   * @param {any} data:RoleChangeStateModel
   * @returns {any}
   */
  public changeState(data: RoleChangeStateModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/role/changeState`, data });
  }

  /**
   * 假删除
   * @date 2022-08-09
   * @param {any} data:RoleChangeStateModel
   * @returns {any}
   */
  public changeDelFlag(data: RoleChangeStateModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/role/changeDelFlag`, data });
  }

  /**
   * 真删除
   * @date 2022-08-09
   * @param {any} data:RoleChangeStateModel
   * @returns {any}
   */
  public delUser(data: RoleChangeStateModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/role/delUser`, data });
  }

  /**
   * 根据id查询
   * @date 2022-08-09
   * @param {any} data:RoleChangeStateModel
   * @returns {any}
   */
  public queryRoleById(data: RoleChangeStateModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/role/queryRoleById`, data });
  }

    /**
   * 编辑角色
   * @date 2022-08-09
   * @param {any} data:RoleEditorModel
   * @returns {any}
   */
     public editorRole(data: RoleEditorModel): Promise<Result> {
      return defHttp.post<Result>({ url: `/role/editor`, data });
    }
}