import { http } from '@/plugins';

/* 获取角色列表 */
export const roleList = () => {
  return http.request<ResponseModel<Array<RoleModel>>>({ url: `${RequestURL.ROLE_LIST}` }, { message: false });
};
