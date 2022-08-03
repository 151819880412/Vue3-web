import { Result } from '#/axios';
// import { UserInfo } from '#/store';

export interface LoginResultModel extends Result{
  userId: string | number;
  accessToken: string;
  refreshToken: string;
  // user: UserInfo;
  // data: Object;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChangePwdResultModel extends Result{

}