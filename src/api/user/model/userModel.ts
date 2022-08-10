


export interface UserPageModel {
  username: string;
  userId: string;
  state: string | number;
  delFlag: number;
  createdTime: Date;
  updatedTime: Date;
}

export interface UserAddModel {
  username: string;
  password: string;
}

export interface UserChangeStateModel {
  userId: string;
}

export interface UserQueryModel {
  username?: string;
  state?: string | number;
}