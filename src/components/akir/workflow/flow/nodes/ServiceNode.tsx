import { IconSubtask } from '@tabler/icons-vue';

const props = {
  modelValue: {
    type: Object as PropType<WFServiceNode>,
    required: true,
  },
  direction: String as PropType<WFDirection>,
};

export default defineComponent({
  props,
  emits: ['update:modelValue'],
  setup(props) {
    const { modelValue } = props;

    return () => (
      <div class="flow-node flow-service">
        <div class="flow-node_header">
          <IconSubtask /> <span>{modelValue?.name}</span>
        </div>
        <div class="flow-node_content" />
      </div>
    );
  },
});
