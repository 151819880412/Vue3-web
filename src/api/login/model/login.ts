export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  phone: string;
  type: string;
}


export interface ChangePwdParams {
  username: string;
  oldPwd: string;
  newPwd: string;
}