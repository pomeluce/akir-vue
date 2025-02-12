import { PropType } from 'vue';

export default defineComponent({
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
  setup(props) {
    const cls = computed<string>(() => `akir-flow_container akir-flow_${props.direction || 'vertical'}`);
    return { cls };
  },
  render() {
    return (
      <div class="akir-flow_wrapper">
        <div class={this.cls}></div>
      </div>
    );
  },
});
