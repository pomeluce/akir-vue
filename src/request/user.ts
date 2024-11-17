import { http } from '@/plugins';

/**
 * 获取当前已经登录的用户信息
 *
 */
export const current = (): Promise<ResponseModel<UserModel, { role: string }>> => {
  return http.request<ResponseModel<UserModel, { role: string }>>({ url: RequestURL.CURRENT_USER }, { message: false });
};
