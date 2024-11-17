import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  component: () => import('@/pages/front/route'),
  children: [
    {
      path: '',
      name: RouteName.HOME,
      component: () => import('@/pages/front/home'),
    },
  ],
} as RouteRecordRaw;
