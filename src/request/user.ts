import { http } from '@/plugins';

/**
 * 获取当前已经登录的用户信息
 *
 */
export const current = (): Promise<ResponseModel<UserModel, { role: string }>> => {
  return http.request<ResponseModel<UserModel, { role: string }>>({ url: RequestURL.CURRENT_USER }, { message: false });
};

/* 获取当前用户菜单信息 */
export const menuList = () => {
  return http.request<ResponseModel<Array<MenuModel>>>({ url: RequestURL.USER_MENUS }, { message: false });
};
