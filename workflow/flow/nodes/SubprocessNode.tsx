import { IconParking } from '@tabler/icons-vue';
import { AkirFlowList } from '..';

export default defineComponent<{ modelValue: WFSubprocessNode; direction?: WFDirection }, { 'update:modelValue': (value: WFSubprocessNode) => true }>(
  props => {
    const direction = computed(() => props.direction || 'vertical');

    return () => (
      <div class="flow-node flow-subprocess">
        <div class="flow-node_header">
          <IconParking /> <span>{props.modelValue?.name}</span>
        </div>
        <AkirFlowList modelValue={props.modelValue?.$start} direction={direction.value} />
      </div>
    );
  },
  { name: 'SubprocessNode', props: ['modelValue', 'direction'] },
);
