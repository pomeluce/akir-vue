import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/admin',
    component: () => import('@/pages/admin/route'),
    meta: { auth: true, menu: { label: 'Dashboard', order: 1 } },
    children: [
      {
        path: '',
        name: RouteName.ADMIN,
        meta: { menu: { label: '主控台' } },
        component: () => import('@/pages/admin/dashboard'),
      },
      {
        path: 'workbench',
        name: RouteName.WORKBENCH,
        meta: { menu: { label: '工作台' } },
        component: () => import('@/pages/admin/workbench'),
      },
    ],
  },
] as RouteRecordRaw[];
