export default defineComponent<{ modelValue: WFEventNode; direction?: WFDirection }, { 'update:modelValue': (value: WFEventNode) => true }>(
  props => {
    const { modelValue } = props;

    return () => (
      <div class={`flow-node flow-event ${modelValue?.businessData.cls || ''}`}>
        <span>{modelValue?.name}</span>
      </div>
    );
  },
  { name: 'EventNode', props: ['modelValue', 'direction'] },
);
