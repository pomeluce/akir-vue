import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/admin/dashboard',
  component: () => import('@/pages/admin/route'),
  meta: { auth: true, label: 'Dashboard' },
  children: [
    {
      path: 'console',
      name: RouteName.DASHBOARD_CONSOLE,
      meta: { label: '主控台' },
      component: () => import('@/pages/admin/dashboard/console'),
    },
    {
      path: 'workbench',
      name: RouteName.DASHBOARD_WORKBENCH,
      meta: { label: '工作台' },
      component: () => import('@/pages/admin/dashboard/workbench'),
    },
    {
      path: 'monitor',
      name: RouteName.DASHBOARD_MONITOR,
      meta: { label: '监控台' },
      component: () => import('@/pages/admin/dashboard/monitor'),
    },
  ],
} as RouteRecordRaw;
