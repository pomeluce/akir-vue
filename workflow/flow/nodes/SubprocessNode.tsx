import { IconParking } from '@tabler/icons-vue';
import { AkirFlowList } from '..';

const props = {
  modelValue: {
    type: Object as PropType<WFSubprocessNode>,
    required: true,
  },
  direction: String as PropType<WFDirection>,
};

export default defineComponent({
  props,
  emits: ['update:modelValue'],
  setup(props) {
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
});
