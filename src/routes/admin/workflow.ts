import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/admin/workflow',
  component: () => import('@/pages/admin/route'),
  meta: { auth: true, label: '流程管理' },
  children: [
    {
      path: 'design',
      name: RouteName.WORKFLOW_DESIGN,
      meta: { label: '流程设计' },
      component: () => import('@/pages/admin/workflow/design'),
    },
    {
      path: 'role',
      name: RouteName.WORKFLOW_TESTER,
      meta: { label: '流程测试' },
      component: () => import('@/pages/admin/workflow/tester'),
    },
  ],
} as RouteRecordRaw;
