import { IconVariable } from '@tabler/icons-vue';
import { checkDefaultExpressionFlow, checkParallelGateway } from 'wf/configuration';

export default defineComponent<{ modelValue: WFExpressionNode; direction?: WFDirection }, { 'update:modelValue': (value: WFExpressionNode) => true }>(
  props => {
    const { modelValue } = props;

    const isParallelGatewayChild = computed(() => checkParallelGateway(modelValue!));
    const isDefaultFlow = computed(() => checkDefaultExpressionFlow(modelValue!));

    return () => (
      <div class="flow-node flow-expression">
        <div class="flow-node_header">
          <IconVariable /> <span>{modelValue?.name}</span>
        </div>
        <div class="flow-node_content">
          {isParallelGatewayChild.value ? <div>并行执行, 无需条件</div> : <div>{isDefaultFlow.value ? '默认条件' : modelValue?.expression || '未配置条件'}</div>}
        </div>
      </div>
    );
  },
  { name: 'ExpressionNode', props: ['modelValue', 'direction'] },
);
