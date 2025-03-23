export enum RequestURL {
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  CAPTCHA = 'auth/captcha',
  /* 获取当前用户信息 */
  CURRENT_USER = 'user/current',
  /* 获取当前用户菜单 */
  USER_MENUS = 'user/menus',
  /* 获取当前用户列表*/
  USER_LIST = 'user/list',

  /* 获取权限列表 */
  ROLE_LIST = 'role/list',

  /* 获取菜单列表 */
  MENU_LIST = 'menu/list',

  UPLOAD_IMAGE = 'upload/image',

  DASHBOARD_LIST = 'dashboard/list',
}
