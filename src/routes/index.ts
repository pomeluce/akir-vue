import { RouteRecordRaw } from 'vue-router';
import admin from './admin';
import auth from './auth';
import error from './error';
import front from './front';

export default [
  front,
  auth,
  error,
  ...admin,
  /* 匹配未定义的路由 */
  {
    path: '/:pathMatch(.*)*',
    name: RouteName.UNKNOWN,
    component: () => import('@/pages/error/404'),
  },
] as RouteRecordRaw[];
