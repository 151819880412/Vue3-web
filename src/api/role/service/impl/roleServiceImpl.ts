



import { defHttp } from '@/utils/http';
import RoleService from '../roleService';

export default class RoleServiceImpl implements RoleService {
  public addRole(data){
    return defHttp.post({ url: '/role/add', data });
  }

}