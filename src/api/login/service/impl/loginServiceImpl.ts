



import { defHttp } from '@/utils/http';
import LoginService from '../loginService';
import { ChangePwdResultModel, LoginResultModel } from '../../model/userModel';
import { LoginParams, ChangePwdParams } from '../../model/login';
import { Result } from '#/axios';

export default class LoginServiceImpl implements LoginService {

  /**
   * 用户登录 LoginServiceImpl
   * @date 2022-03-02
   * @param {any} data:LoginParams
   * @returns {any}
   */
  public login(data: LoginParams): Promise<LoginResultModel> {
    return defHttp.post<LoginResultModel>({ url: '/auth/registerLogin', data });
  }

  public changePwd(data: ChangePwdParams): Promise<ChangePwdResultModel> {
    return defHttp.post<ChangePwdResultModel>({ url: '/auth/changePwd', data });
  }

  public test(data) {
    return defHttp.post({ url: '/login/test', data });
  }

  public queryRoleMenuList(userId:string): Promise<LoginResultModel> {
    return defHttp.get<LoginResultModel>({ url: '/permission/queryRoleMenuList', params:{userId} });
  }

  public logOut(userId:string): Promise<Result> {
    return defHttp.get<LoginResultModel>({ url: '/auth/logOut', params:{userId} });
  }

}