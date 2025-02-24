export enum RouteName {
  /* front */
  HOME = 'home',
  COMPONENTS = 'components',

  /* auth */
  LOGIN = 'login',
  REGISTER = 'register',

  /* admin */
  ADMIN = 'admin',

  /* dashboard*/
  DASHBOARD_CONSOLE = 'dashboard.console',
  DASHBOARD_WORKBENCH = 'dashboard.workbench',
  DASHBOARD_MONITOR = 'dashboard.monitor',

  /* system */
  SYSTEM_USER = 'system.user',
  SYSTEM_ROLE = 'system.role',
  SYSTEM_PERMISSION = 'system.permission',
  SYSTEM_MENU = 'system.menu',
  SYSTEM_WORKFLOW = 'system.workflow',

  /* error */
  ERROR_403 = 'error.403',
  ERROR_404 = 'error.404',
  ERROR_500 = 'error.500',

  /* not found */
  UNKNOWN = 'unknown',
}
