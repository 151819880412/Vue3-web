export interface RoleQueryModel {
  roleName?: string;
  state?: string | number;
}

export interface RolePageModel {
  roleName: string;
  roleId: string;
  state: string | number;
  delFlag: number;
  createdTime: Date;
  updatedTime: Date;
  id: number;
}

export interface RoleAddModel {
  roleName: string;
}

export interface RoleEditorModel {
  roleName: string;
  menus: Array<string>;
}

export interface RoleChangeStateModel {
  roleId: string;
}