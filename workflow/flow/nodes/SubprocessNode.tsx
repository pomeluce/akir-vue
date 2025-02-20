import { IconParking } from '@tabler/icons-vue';
import { AkirFlowList } from '..';

export default defineComponent<{ modelValue: WFSubprocessNode; direction?: WFDirection }, { 'update:modelValue': (value: WFSubprocessNode) => true }>(
  props => {
    const { modelValue, direction = 'vertical' } = props;

    return () => (
      <div class="flow-node flow-subprocess">
        <div class="flow-node_header">
          <IconParking /> <span>{modelValue?.name}</span>
        </div>
        <AkirFlowList modelValue={modelValue?.$start} direction={direction} />
      </div>
    );
  },
  { name: 'SubprocessNode', props: ['modelValue', 'direction'] },
);
