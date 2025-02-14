import { PropType } from 'vue';

export default defineComponent({
  name: 'AkirFlowList',
  props: {
    modelValue: {
      type: Object as PropType<WFBaseNode>,
      required: true,
    },
    direction: {
      type: String as PropType<WFDirection>,
      default: 'vertical',
      validator: (v: WFDirection) => ['vertical', 'horizontal'].includes(v),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const cls = computed<string>(() => `akir-flow_container akir-flow_${props.direction || 'vertical'}`);

    const startNode = computed<WFBaseNode>({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value),
    });

    return { cls, startNode };
  },
  render() {
    return (
      <div class="akir-flow_wrapper">
        <div class={this.cls}></div>
      </div>
    );
  },
});
