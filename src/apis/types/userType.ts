/* 接口请求参数类型 */
export interface LoginParams {
  userName: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  authority: number;
  createTime: string;
  photo: string;
}

export interface UserIdParams {
  id: number;
}

export interface UserNameParams {
  userName: string;
}

export interface UpdateUserParams extends UserIdParams, UserNameParams {
  password: string;
}

export interface TrackParams {
  data: string;
}
