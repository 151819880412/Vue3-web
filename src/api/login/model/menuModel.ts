import { AppRouteRecordRaw } from "@/router/types";

export interface MenuPageModel {
  menuId: string;
  menuName: string;
  path: string;
  btnName: string;
  type: number;
  icon?: string;
  sort: number;
  delFlag: number;
  createdTime: Date;
  updatedTime: Date;
}

export interface SideBarItemType extends MenuPageModel, AppRouteRecordRaw {

}