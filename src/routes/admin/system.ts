import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/admin/system',
  component: () => import('@/pages/admin/route'),
  meta: { auth: true, menu: { label: '系统管理' } },
  children: [
    {
      path: 'user',
      name: RouteName.SYSTEM_USER,
      meta: { label: '用户管理' },
      component: () => import('@/pages/admin/system/user'),
    },
    {
      path: 'role',
      name: RouteName.SYSTEM_ROLE,
      meta: { label: '角色管理' },
      component: () => import('@/pages/admin/system/role'),
    },
    {
      path: 'permission',
      name: RouteName.SYSTEM_PERMISSION,
      meta: { label: '权限管理' },
      component: () => import('@/pages/admin/system/permission'),
    },
    {
      path: 'menu',
      name: RouteName.SYSTEM_MENU,
      meta: { label: '菜单管理' },
      component: () => import('@/pages/admin/system/menu'),
    },
  ],
} as RouteRecordRaw;
