export default defineComponent<{ modelValue: WFEventNode; direction?: WFDirection }, { 'update:modelValue': (value: WFEventNode) => true }>(
  props => {
    return () => (
      <div class={`flow-node flow-event ${props.modelValue?.businessData.cls || ''}`}>
        <span>{props.modelValue?.name}</span>
      </div>
    );
  },
  { name: 'EventNode', props: ['modelValue', 'direction'] },
);
