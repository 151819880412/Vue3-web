



import { defHttp } from '@/utils/http';
import { Result } from '#/axios';
import MenuService from '../menuService';
import { MenuAddModel, MenuListModel } from '../../model/menuModel';

export default class MenuServiceImpl implements MenuService {

  public queryAllMenuList(): Promise<Result<MenuListModel[]>> {
    return defHttp.get({ url: '/menu/queryAllMenuList' });
  }

  public queryMenuById(menuId:string): Promise<Result<MenuListModel>> {
    return defHttp.get({ url: '/menu/queryMenuById' ,params:{menuId}});
  }

  public queryParentMenuById(menuId:string): Promise<Result<MenuListModel>> {
    return defHttp.get({ url: '/menu/queryParentMenuById' ,params:{menuId}});
  }

  public addMenuItems(data:MenuAddModel): Promise<Result<MenuListModel[]>> {
    return defHttp.post({ url: '/menu/addMenuItems' , data });
  }

  public editorMenuItems(data:MenuAddModel): Promise<Result<MenuListModel[]>> {
    return defHttp.post({ url: '/menu/editorMenuItems' , data });
  }

  public delMenuItems(menuId:string): Promise<Result<MenuListModel[]>> {
    return defHttp.get({ url: '/menu/delMenuItems' , params:{menuId} });
  }

}