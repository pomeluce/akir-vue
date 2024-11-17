import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/auth',
  component: () => import('@/pages/auth/route'),
  meta: { guest: true },
  children: [
    {
      path: 'login',
      name: RouteName.LOGIN,
      meta: { loginView: true },
      component: () => import('@/pages/auth/login'),
    },
    {
      path: 'register',
      name: RouteName.REGISTER,
      component: () => import('@/pages/auth/register'),
    },
  ],
} as RouteRecordRaw;
