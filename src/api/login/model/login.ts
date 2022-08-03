export interface LoginParams {
  username: string;
  password: string;
}

export interface ChangePwdParams {
  username: string;
  oldPwd: string;
  newPwd: string;
}