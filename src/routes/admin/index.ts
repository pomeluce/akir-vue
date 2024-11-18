import { RouteRecordRaw } from 'vue-router';
import dashboard from './dashboard';
import system from './system';

export default [
  {
    path: '/admin',
    name: RouteName.ADMIN,
    redirect: { name: RouteName.DASHBOARD_CONSOLE },
  },
  dashboard,
  system,
] as RouteRecordRaw[];
