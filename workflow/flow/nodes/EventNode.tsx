import { PropType } from 'vue';

const props = {
  modelValue: {
    type: Object as PropType<WFEventNode>,
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
      <div class={`flow-node flow-event ${modelValue?.businessData.cls || ''}`}>
        <span>{modelValue?.name}</span>
      </div>
    );
  },
});
