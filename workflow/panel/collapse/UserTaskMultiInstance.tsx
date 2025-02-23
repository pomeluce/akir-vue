import { NCollapseItem, NInput, NInputGroup, NInputGroupLabel, NInputNumber, NSelect } from 'naive-ui';
import { IconCaretLeftFilled, IconUsersGroup } from '@tabler/icons-vue';
import { approvalMethodOptions, comparisonOperatorOptions, completionConditionTypeOptions, WFComparisonOperator, WFCompletionConditionType } from 'wf/configuration';
import { AkirPanelEdit, AkirPanelRadioGroup } from 'wf/common';

export default defineComponent<{ modelValue: WFBaseNode }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit }) => {
    const vModelNode = computed<WFBaseNode>({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val),
    });

    const approvalMethod = computed<number>({
      get: () => vModelNode.value.businessData?.approvalMethod as number,
      set: val => (vModelNode.value.businessData.approvalMethod = val),
    });

    const completionConditionType = computed<WFCompletionConditionType>({
      get: () => vModelNode.value.businessData?.completionConditionType as WFCompletionConditionType,
      set: val => (vModelNode.value.businessData.completionConditionType = val),
    });
    const completionConditionCompare = computed<WFComparisonOperator>({
      get: () => vModelNode.value.businessData?.completionConditionCompare as WFComparisonOperator,
      set: val => (vModelNode.value.businessData.completionConditionCompare = val),
    });
    const completionConditionNum = computed<number>({
      get: () => vModelNode.value.businessData?.completionConditionNum as number,
      set: val => (vModelNode.value.businessData.completionConditionNum = val),
    });
    const completionConditionExpression = computed<string>({
      get: () => vModelNode.value.businessData?.completionConditionExpression as string,
      set: val => (vModelNode.value.businessData.completionConditionExpression = val),
    });

    const clearCompletionCondition = () => {
      vModelNode.value.businessData.completionConditionType = undefined;
      vModelNode.value.businessData.completionConditionCompare = undefined;
      vModelNode.value.businessData.completionConditionNum = undefined;
      vModelNode.value.businessData.completionConditionExpression = undefined;
    };

    const resetCompletionCondition = (val: number | string | boolean) => {
      vModelNode.value.businessData.completionConditionExpression = undefined;

      if (val === 'number' || val === 'percentage') {
        vModelNode.value.businessData.completionConditionCompare = '==';
        if (val === 'number') {
          vModelNode.value.businessData.completionConditionNum = 1;
        } else {
          vModelNode.value.businessData.completionConditionNum = 100;
        }
      }
    };

    return () => (
      <NCollapseItem key="UserTaskMultiInstance">
        {{
          header: () => (
            <div class="flex gap-2 grow-1 items-center">
              <IconUsersGroup size={18} />
              <span>多人审批</span>
            </div>
          ),
          default: () => (
            <>
              <AkirPanelEdit label="审批方式">
                {{
                  tooltip: () => (
                    <>
                      <div>会签：需要指定数量或者百分比的人员审批通过</div>
                      <div>或签：只需要一次审批通过</div>
                    </>
                  ),
                  default: () => <AkirPanelRadioGroup v-model={approvalMethod.value} options={approvalMethodOptions} onChange={clearCompletionCondition} />,
                }}
              </AkirPanelEdit>
              {approvalMethod.value === 2 && (
                <AkirPanelEdit label="通过条件">
                  <AkirPanelRadioGroup v-model={completionConditionType.value} options={completionConditionTypeOptions} onChange={resetCompletionCondition} />
                  {(completionConditionType.value === 'number' || completionConditionType.value === 'percentage') && (
                    <NInputGroup>
                      <NSelect class="!w-3/5" v-model={[completionConditionCompare.value, 'value']} size="small" options={comparisonOperatorOptions}></NSelect>
                      <NInputNumber
                        v-model={[completionConditionNum.value, 'value']}
                        size="small"
                        min="1"
                        step="1"
                        max={completionConditionType.value === 'percentage' ? 100 : 1000}
                      />
                      {completionConditionType.value === 'percentage' && <NInputGroupLabel size="small">%</NInputGroupLabel>}
                    </NInputGroup>
                  )}
                  {completionConditionType.value === 'expression' && <NInput v-model={[completionConditionExpression.value, 'value']} />}
                </AkirPanelEdit>
              )}
            </>
          ),
          arrow: () => <IconCaretLeftFilled size="18" />,
        }}
      </NCollapseItem>
    );
  },
  { name: 'PanelUserTaskMultiInstance', props: ['modelValue'] },
);
