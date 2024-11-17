import { RouteRecordRaw } from 'vue-router';
import admin from './admin';
import auth from './auth';
import error from './error';
import front from './front';

/* 匹配未定义的路由 */
const notFound: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: RouteName.UNKNOWN,
  component: () => import('@/pages/error/404'),
};

export default [front, auth, ...admin, error, notFound];
