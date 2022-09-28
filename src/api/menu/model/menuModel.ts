export interface MenuListModel {
  id: number;
  menuId: string;
  parentId: number;
  menuName: string;
  path: string;
  btnName: string;
  type: number;
  sort: number;
  icon: string;
  delFlag: number;
  children: MenuListModel[];
  parent: MenuListModel;
  name:string,
  meta:{
    title:string
    icon:string
  }
}

export interface MenuAddModel {
  id: number;
  menuId: string;
  parentId: number;
  menuName: string;
  path: string;
  btnName: string;
  type: number;
  sort: number;
  icon: string;
  delFlag: number;
  children: MenuListModel[];
  parent: MenuListModel;
}