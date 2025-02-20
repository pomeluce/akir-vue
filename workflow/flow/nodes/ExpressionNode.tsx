import { IconVariable } from '@tabler/icons-vue';
import { checkDefaultExpressionFlow, checkParallelGateway } from 'wf/configuration';

export default defineComponent<{ modelValue: WFExpressionNode; direction?: WFDirection }, { 'update:modelValue': (value: WFExpressionNode) => true }>(
  props => {
    const isParallelGatewayChild = computed(() => checkParallelGateway(props.modelValue!));
    const isDefaultFlow = computed(() => checkDefaultExpressionFlow(props.modelValue!));

    return () => (
      <div class="flow-node flow-expression">
        <div class="flow-node_header">
          <IconVariable /> <span>{props.modelValue?.name}</span>
        </div>
        <div class="flow-node_content">
          {isParallelGatewayChild.value ? <div>并行执行, 无需条件</div> : <div>{isDefaultFlow.value ? '默认条件' : props.modelValue?.expression || '未配置条件'}</div>}
        </div>
      </div>
    );
  },
  { name: 'ExpressionNode', props: ['modelValue', 'direction'] },
);
