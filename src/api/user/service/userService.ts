import { Result } from "#/axios";
import { UserAddModel, UserChangeStateModel } from "../model/userModel";

/**
 * 用户
 * @date 2022-03-02
 * @param {any} data:object
 * @returns {any}
 */
export default interface UserService {
  
  // 关联角色
  relationRole(data): Promise<Result>;

  // 新增用户
  addUser(data:UserAddModel): Promise<Result>;

  // 启用/禁用
  changeState(data:UserChangeStateModel): Promise<Result>;

  // 假删除
  changeDelFlag(data:UserChangeStateModel): Promise<Result>;

  // 删除用户
  delUser(data:UserChangeStateModel): Promise<Result>;

  // 根据id查询用户
  queryUserById(data:UserChangeStateModel): Promise<Result>;

}