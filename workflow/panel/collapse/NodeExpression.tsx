import { IconCaretLeftFilled, IconCornerRightDown } from '@tabler/icons-vue';
import { NCollapseItem } from 'naive-ui';
import { AkirPanelEdit, AkirPanelInput, AkirPanelSelect } from '../../common';

export default defineComponent<{ modelValue: WFBaseNode }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit }) => {
    const vModelNode = computed<WFBaseNode>({
      get: () => props.modelValue!,
      set: value => emit('update:modelValue', value),
    });

    const conditionType = computed({
      get: () => {
        if ((props.modelValue as any).$parent!.$default === vModelNode.value) {
          return 'default';
        }
        return 'condition';
      },
      set: val => updateConditionNode(val),
    });

    function updateConditionNode(type: 'default' | 'condition') {
      if (type === 'default') {
        (vModelNode as any).expression = '';
        return ((props.modelValue as any).$parent!.$default = vModelNode.value);
      }
      if (type === 'condition') return ((vModelNode as any).expression = '');
    }

    const conditionTypeOptions = [
      { label: '默认', value: 'default' },
      { label: '条件表达式', value: 'condition' },
    ];

    return () => (
      <NCollapseItem key="UserTaskMultiInstance">
        {{
          header: () => (
            <div class="flex gap-2 grow-1 items-center">
              <IconCornerRightDown size={18} />
              <span>条件配置</span>
            </div>
          ),

          default: () => (
            <>
              <AkirPanelEdit label="条件类型">
                <AkirPanelSelect v-model={conditionType.value} options={conditionTypeOptions} />
              </AkirPanelEdit>
              {conditionType.value === 'condition' && (
                <AkirPanelEdit label="表达式">
                  <AkirPanelInput v-model={(vModelNode.value as WFExpressionNode).expression} />
                </AkirPanelEdit>
              )}
            </>
          ),
          arrow: () => <IconCaretLeftFilled size="18" />,
        }}
      </NCollapseItem>
    );
  },
  { name: 'PanelNodeExpression', props: ['modelValue'] },
);
