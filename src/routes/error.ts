import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/error',
  component: () => import('@/pages/error/route'),
  meta: { auth: false, menu: { label: '异常页面', order: 4 } },
  children: [
    {
      path: '403',
      name: RouteName.ERROR_403,
      meta: { menu: { label: '403页面', blank: '_blank' } },
      component: () => import('@/pages/error/403'),
    },
    {
      path: '404',
      name: RouteName.ERROR_404,
      meta: { menu: { label: '404页面', blank: '_blank' } },
      component: () => import('@/pages/error/404'),
    },
    {
      path: '500',
      name: RouteName.ERROR_500,
      meta: { menu: { label: '500页面', blank: '_blank' } },
      component: () => import('@/pages/error/500'),
    },
  ],
} as RouteRecordRaw;
