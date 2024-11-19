import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/:pathMatch(.*)*',
  component: () => import('@/pages/error/404'),
} as RouteRecordRaw;
