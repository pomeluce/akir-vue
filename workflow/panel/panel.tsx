import { Component } from 'vue';
import { NCollapse, NDrawer, NDrawerContent } from 'naive-ui';
import { isUndefined } from 'lodash-es';
import { isExpressionNode, isServiceNode, isTaskNode } from 'wf/utils';
import { checkExclusiveGateway } from 'wf/configuration';
import NodeBasic from './collapse/NodeBasic';
import NodeExpression from './collapse/NodeExpression';
import ServiceCopyTo from './collapse/ServiceCopyTo';
import ServiceMailTo from './collapse/ServiceMailTo';
import UserTask from './collapse/UserTask';
import UserTaskMultiInstance from './collapse/UserTaskMultiInstance';
import UserTaskOperation from './collapse/UserTaskOperation';

export interface IFlowPanelExpose {
  togglePanel: (state?: boolean) => void;
}

export default defineComponent<{ modelValue?: WFBaseNode }, { 'update:modelValue': (value: WFBaseNode) => true }>(
  (props, { emit, expose }) => {
    const panelState = ref<boolean>(false);

    const computedValue = computed<WFBaseNode>({
      get: () => props.modelValue || ({ businessData: {} } as WFBaseNode),
      set: value => emit('update:modelValue', value),
    });

    const { t } = useI18n();

    const headerTitle = computed(() => {
      if (computedValue.value.businessData?.$type) return t(computedValue.value.businessData?.$type);
      return computedValue.value.type ? t(computedValue.value.type) : 'Process';
    });

    const renderComponents = computed<Component[]>(() => {
      const components: Component[] = [NodeBasic];

      const businessData = computedValue.value.businessData;
      const bpmnType = businessData.$type;

      if (isTaskNode(computedValue.value) && bpmnType === 'userTask') {
        components.push(UserTask);
        components.push(UserTaskMultiInstance);
        components.push(UserTaskOperation);
      }
      if (isServiceNode(computedValue.value) && bpmnType === 'serviceTask') {
        if (businessData.type === 'copy') {
          components.push(ServiceCopyTo);
        }
        if (businessData.type === 'mail') {
          components.push(ServiceMailTo);
        }
      }
      if (isExpressionNode(computedValue.value) && checkExclusiveGateway(computedValue.value as WFExpressionNode)) {
        components.push(NodeExpression);
      }

      return components;
    });

    const togglePanel = (state?: boolean) => {
      if (!computedValue.value.id) return (panelState.value = false);
      if (isUndefined(state)) return (panelState.value = !panelState.value);
      panelState.value = state;
    };

    expose({ togglePanel } satisfies IFlowPanelExpose);

    return () => (
      <NDrawer class="akir-flow-panel" width={500} v-model={[panelState.value, 'show']}>
        <NDrawerContent title={headerTitle.value}>
          {computedValue.value.id ? (
            <div class="akir-flow-panel_body">
              <NCollapse arrowPlacement="right">
                {renderComponents.value.map(collapseItem =>
                  h(collapseItem, { key: collapseItem.name, modelValue: computedValue.value, onUpdateModelValue: (event: WFBaseNode) => (computedValue.value = event) }),
                )}
              </NCollapse>
            </div>
          ) : (
            <></>
          )}
        </NDrawerContent>
      </NDrawer>
    );
  },
  { name: 'AkirFlowPanel', props: ['modelValue'] },
);
