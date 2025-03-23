import { http } from '@/plugins';

/**
 * 获取当前已经登录的用户信息
 *
 */
export const current = (): Promise<ResponseModel<UserModel>> => {
  return http.request<ResponseModel<UserModel>>({ url: RequestURL.CURRENT_USER }, { message: false });
};

/* 获取用户列表 */
export const userList = (count: number) => {
  return http.request<ResponseModel<Array<UserModel>>>({ url: `${RequestURL.USER_LIST}/${count}` }, { message: false });
};
