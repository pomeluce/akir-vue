import { NCard } from 'naive-ui';

export default defineComponent<{}>(
  () => {
    return () => <NCard class="h-full">主控台</NCard>;
  },
  { name: RouteName.DASHBOARD_CONSOLE },
);
