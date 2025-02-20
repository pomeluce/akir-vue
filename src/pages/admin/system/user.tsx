import { NCard } from 'naive-ui';
import { AkirDesigner } from 'wf/index';

export default defineComponent({
  name: RouteName.SYSTEM_USER,
  setup() {
    return () => (
      <NCard class="h-full">
        <AkirDesigner />
      </NCard>
    );
  },
});
