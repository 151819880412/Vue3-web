



import { defHttp } from '@/utils/http';
import UserService from '../userService';
import { PageResult, Result } from '#/axios';
import { UserAddModel, UserChangeStateModel, UserEditorModel, UserPageModel } from '../../model/userModel';

export default class UserServiceImpl implements UserService {

  public addUser(data: UserAddModel): Promise<Result> {
    return defHttp.post({ url: '/user/register', data });
  }

  /**
   * 关联角色
   * @date 2022-08-05
   * @param {any} data
   * @returns {any}
   */
  public relationRole(data) {
    return defHttp.post({ url: '/user/relation', data });
  }

  /**
   * 用户分页
   * @date 2022-08-05
   * @param {any} currentPage:number
   * @param {any} pageSize:number
   * @param {any} data
   * @returns {any}
   */
  public queryUserPage(currentPage: number, pageSize: number, data): Promise<PageResult<UserPageModel>> {
    return defHttp.post<PageResult<UserPageModel>>({ url: `/user/page/${currentPage}/${pageSize}`, data });
  }


  /**
   * 启用禁用
   * @date 2022-08-09
   * @param {any} data:UserChangeStateModel
   * @returns {any}
   */
  public changeState(data: UserChangeStateModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/user/changeState`, data });
  }

  /**
   * 假删除
   * @date 2022-08-09
   * @param {any} data:UserChangeStateModel
   * @returns {any}
   */
  public changeDelFlag(data: UserChangeStateModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/user/changeDelFlag`, data });
  }

  /**
   * 真删除
   * @date 2022-08-09
   * @param {any} data:UserChangeStateModel
   * @returns {any}
   */
  public delUser(data: UserChangeStateModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/user/delUser`, data });
  }

  /**
   * 根据id查询
   * @date 2022-08-09
   * @param {any} data:UserChangeStateModel
   * @returns {any}
   */
  public queryUserById(data: UserChangeStateModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/user/queryUserById`, data });
  }

  /**
   * 编辑用户
   * @date 2022-08-09
   * @param {any} data:UserEditorModel
   * @returns {any}
   */
   public editorUser(data: UserEditorModel): Promise<Result> {
    return defHttp.post<Result>({ url: `/user/editor`, data });
  }

  public queryOptions(url:string,data:object): Promise<Result>{
    return defHttp.post<Result>({ url: url, data});
  }

  /**
   * 查询用户权限
   * @date 2022-09-28
   * @param {any} userId:string
   * @returns {any}
   */
  public queryUserAuthById(userId:string): Promise<Result>{
    return defHttp.get<Result>({ url: `/user/queryUserAuthById`, params:{userId}});
  }

}