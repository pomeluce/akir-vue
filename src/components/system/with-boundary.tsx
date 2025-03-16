import { SlotsType, VNode } from 'vue';

export default defineComponent<{}, {}, string, SlotsType<{ default?: () => VNode[] }>>(
  (_, { slots }) => {
    /* TODO: 403 页面和 500 页面优化, 路由地址不变, 添加认证组件, 判断是否渲染 403/500 页面还是路由页面 */
    return () => <>{slots.default?.()}</>;
  },
  { name: 'AkirWithBoundary' },
);
