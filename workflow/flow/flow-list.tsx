import NodeWrapper from './base/node-wrapper';

export default defineComponent<{ modelValue?: WFBaseNode; direction?: WFDirection; onNodeDelete?: () => void }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit }) => {
    const direction = computed(() => props.direction || 'vertical');

    const cls = computed<string>(() => `akir-flow_container akir-flow_${direction.value}`);

    const startNode = computed<WFBaseNode>({
      get: () => props.modelValue!,
      set: (value: WFBaseNode) => emit('update:modelValue', value),
    });

    const nodeList = computed<WFBaseNode[]>(() => {
      const list: WFBaseNode[] = [];
      let nextNode: WFBaseNode | undefined = startNode.value;
      while (nextNode) {
        list.push(nextNode);
        nextNode = nextNode.$next;
      }
      return list;
    });
    return () => (
      <div class="akir-flow_wrapper">
        <div class={cls.value}>
          {nodeList.value.map(node => (
            <NodeWrapper key={node.id} v-model={node} direction={direction.value} onNodeDelete={props.onNodeDelete} />
          ))}
        </div>
      </div>
    );
  },
  { name: 'AkirFlowList', props: ['modelValue', 'direction', 'onNodeDelete'] },
);
