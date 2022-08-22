import { PageResult, Result } from "#/axios";
import { RoleAddModel, RoleChangeStateModel, RolePageModel, RoleQueryModel } from "./model/roleModel";

/**
 * 角色
 * @date 2022-03-02
 * @param {any} data:object
 * @returns {any}
 */
export default interface RoleService {

  // 新增角色
  addRole(data: RoleAddModel): Promise<Result>;

  // 角色分页
  rolePage(currentPage: number, pageSize: number, data: RoleQueryModel): Promise<PageResult<RolePageModel>>;

  // 启用/禁用
  changeState(data: RoleChangeStateModel): Promise<Result>;

  // 假删除
  changeDelFlag(data: RoleChangeStateModel): Promise<Result>;

  // 删除用户
  delUser(data: RoleChangeStateModel): Promise<Result>;

  // 根据id查询
  queryRoleById(data: RoleChangeStateModel): Promise<Result>;

}