import { Result } from "#/axios";
import { MenuAddModel, MenuListModel } from "../model/menuModel";

/**
 * 菜单
 * @date 2022-09-21
 * @param {any} data:object
 * @returns {any}
 */
export default interface MenuService {
  
  // 查询所有菜单
  queryAllMenuList(): Promise<Result<MenuListModel[]>>;

  // 查询单个菜单
  queryMenuById(menuId:string): Promise<Result<MenuListModel>>;

  // 查询父节点
  queryParentMenuById(menuId:string): Promise<Result<MenuListModel>>;

  // 新增菜单
  addMenuItems(menuAddModel:MenuAddModel): Promise<Result<MenuListModel[]>>;

  // 编辑菜单
  editorMenuItems(menuAddModel:MenuAddModel): Promise<Result<MenuListModel[]>>;

  // 删除菜单
  delMenuItems(menuId:string): Promise<Result<MenuListModel[]>>;

}