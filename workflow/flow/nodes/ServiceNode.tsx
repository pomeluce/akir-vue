import { IconSubtask } from '@tabler/icons-vue';

export default defineComponent<{ modelValue: WFServiceNode; direction?: WFDirection }, { 'update:modelValue': (value: WFServiceNode) => true }>(
  props => {
    return () => (
      <div class="flow-node flow-service">
        <div class="flow-node_header">
          <IconSubtask /> <span>{props.modelValue?.name}</span>
        </div>
        <div class="flow-node_content" />
      </div>
    );
  },
  { name: 'ServiceNode', props: ['modelValue', 'direction'] },
);
