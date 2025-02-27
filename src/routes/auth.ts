import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/auth',
  meta: { guest: true },
  component: () => import('@/pages/auth/route'),
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
