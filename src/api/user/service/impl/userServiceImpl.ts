



import { defHttp } from '@/utils/http';
import UserService from '../userService';
import { PageResult, Result } from '#/axios';
import { UserAddModel, UserChangeStateModel, UserPageModel } from '../../model/userModel';

export default class UserServiceImpl implements UserService {

  public addUser(data:UserAddModel): Promise<Result>{
    return defHttp.post({ url: '/user/register', data });
  }

  /**
   * 关联角色
   * @date 2022-08-05
   * @param {any} data
   * @returns {any}
   */
  public relationRole(data){
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
  public queryUserPage(currentPage:number,pageSize:number,data): Promise<PageResult<UserPageModel>>{
    return defHttp.post<PageResult<UserPageModel>>({ url: `/user/page/${currentPage}/${pageSize}`, data});
  }
  
  
  /**
   * 启用禁用
   * @date 2022-08-09
   * @param {any} data:UserChangeStateModel
   * @returns {any}
   */
  public changeState(data:UserChangeStateModel): Promise<PageResult<UserPageModel>>{
    return defHttp.post<PageResult<UserPageModel>>({ url: `/user/changeState`, data});
  }

  /**
   * 假删除
   * @date 2022-08-09
   * @param {any} data:UserChangeStateModel
   * @returns {any}
   */
  public changeDelFlag(data:UserChangeStateModel): Promise<PageResult<UserPageModel>>{
    return defHttp.post<PageResult<UserPageModel>>({ url: `/user/changeDelFlag`, data});
  }

  /**
   * 真删除
   * @date 2022-08-09
   * @param {any} data:UserChangeStateModel
   * @returns {any}
   */
  public delUser(data:UserChangeStateModel): Promise<PageResult<UserPageModel>>{
    return defHttp.post<PageResult<UserPageModel>>({ url: `/user/delUser`, data});
  }

}