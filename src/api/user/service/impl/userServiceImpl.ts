



import { defHttp } from '@/utils/http';
import UserService from '../userService';
import { PageResult } from '#/axios';
import { UserPageModel } from '../../model/userModel';

export default class UserServiceImpl implements UserService {
  public relationRole(data){
    return defHttp.post({ url: '/user/relation', data });
  }

  public queryUserPage(currentPage:number,pageSize:number,data): Promise<PageResult<UserPageModel>>{
    return defHttp.post<PageResult<UserPageModel>>({ url: `/user/page/${currentPage}/${pageSize}`, data});
  }

}