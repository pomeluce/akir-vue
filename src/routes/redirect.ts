import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/redirect',
  name: RouteName.REDIRECT,
  component: () => import('@/pages/redirect/route'),
  children: [{ path: ':path(.*)', component: () => import('@/pages/redirect') }],
} as RouteRecordRaw;
