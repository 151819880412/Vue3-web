



import { defHttp } from '@/utils/http';
import LoginService from '../loginService';
import { LoginResultModel } from '../../model/userModel';
import { LoginParams } from '../../model/login';

export default class LoginServiceImpl implements LoginService {

  /**
   * 用户登录 LoginServiceImpl
   * @date 2022-03-02
   * @param {any} data:LoginParams
   * @returns {any}
   */
  public login(data: LoginParams): Promise<LoginResultModel> {
    return defHttp.post<LoginResultModel>({ url: '/login', data });
  }

  public test(data) {
    return defHttp.post({ url: '/login/test', data });
  }

  public queryRoleMenuList(params:string): Promise<LoginResultModel> {
    return defHttp.get<LoginResultModel>({ url: '/genuine-system/systemResource/queryResourceByUserId/', params });
  }

}