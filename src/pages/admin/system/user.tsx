import { WorkflowBpmnModeler } from '@/components';
import { NCard } from 'naive-ui';

export default defineComponent({
  name: RouteName.SYSTEM_USER,
  setup() {
    return () => (
      <NCard class="h-full">
        <WorkflowBpmnModeler />
      </NCard>
    );
  },
});
