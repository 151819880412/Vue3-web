
export interface UserInfo {
  userId: string;
  username: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
  auth: any[];
  password: string;
}
