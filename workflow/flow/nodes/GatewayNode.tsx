import { NButton } from 'naive-ui';
import { AkirFlowList } from '..';
import { createNode, setNodeInMap } from 'wf/utils';
import { checkParallelGateway } from 'wf/configuration';

export default defineComponent<{ modelValue: WFGatewayNode; direction?: WFDirection }, { 'update:modelValue': (value: WFGatewayNode) => true }>(
  (props, { emit }) => {
    const direction = computed(() => props.direction || 'vertical');

    const isParallelGatewayChild = computed(() => checkParallelGateway(props.modelValue!));
    const computedGatewayNode = computed<WFGatewayNode>({
      get: () => props.modelValue!,
      set: node => emit('update:modelValue', node),
    });

    const nextNodeTraversal = (node?: WFBaseNode): WFBaseNode[] => {
      if (!node) {
        return [];
      }
      const list: WFBaseNode[] = [];
      let curNode: WFBaseNode | undefined = node;
      while (curNode) {
        list.push(curNode);
        curNode = curNode.$next;
      }
      return list;
    };

    const branchesNodeList = computed<WFBranchNodeList[]>(() => {
      const branches: WFBranchNodeList[] = [];
      const expressions = computedGatewayNode.value.$expressions;
      for (const ex of expressions) {
        branches.push({
          expression: ex,
          nextNodeList: nextNodeTraversal(ex.$next),
        });
      }
      return branches;
    });

    const addExpression = () => {
      const prefix = isParallelGatewayChild.value ? '分支' : '条件';
      const newExpression = createNode('expression', computedGatewayNode.value, `${prefix}-${computedGatewayNode.value.$expressions.length + 1}`);
      setNodeInMap(newExpression);
      computedGatewayNode.value.$expressions.push(newExpression);
    };

    return () => (
      <div class="flow-node flow-gateway">
        <div class="gateway-node__behavior">
          <NButton class="!p-4" type="primary" size="tiny" round onClick={addExpression}>
            {isParallelGatewayChild.value ? '添加分支' : '添加条件'}
          </NButton>
        </div>

        <div class="gateway-node__branches">
          {branchesNodeList.value.map(branch => (
            <div class="branch-col" key={branch.expression.id}>
              <div class="branch-col_prefix" />
              <div class="branch-col_content">
                <AkirFlowList v-model={branch.expression} direction={direction.value} />
              </div>
              <div class="branch-col_suffix" />
            </div>
          ))}
        </div>
      </div>
    );
  },
  { name: 'GatewayNode', props: ['modelValue', 'direction'] },
);
