import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/workflow',
  name: RouteName.WORKFLOW_DEFINE,
  meta: { auth: true, label: '流程定义' },
  component: () => import('@/pages/workflow/route'),
} as RouteRecordRaw;
