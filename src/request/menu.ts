import { http } from '@/plugins';

/** 获取菜单列表 */
export const menuList = (menu?: MenuModel) => {
  return http.request<ResponseModel<Array<MenuModel>>>({ url: RequestURL.MENU_LIST, params: menu }, { message: false });
};
