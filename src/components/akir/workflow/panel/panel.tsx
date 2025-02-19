import { NCollapse, NDrawer, NDrawerContent } from 'naive-ui';
import { Component, PropType } from 'vue';
import { isUndefined } from 'lodash-es';
import { isExpressionNode, isServiceNode } from '@/utils/workflow';
import { checkExclusiveGateway } from '../configuration/node-checker';
import NodeBasic from './collapse/NodeBasic';
import NodeExpression from './collapse/NodeExpression';
import ServiceCopyTo from './collapse/ServiceCopyTo';

export interface IFlowPanelExpose {
  togglePanel: (state?: boolean) => void;
}

const props = { modelValue: { type: Object as PropType<WFBaseNode>, default: () => ({ businessData: {} }) } };

export default defineComponent({
  name: 'AkirFlowPanel',
  props,
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const panelState = ref<boolean>(false);

    const { t } = useI18n();

    const headerTitle = computed(() => {
      if (props.modelValue.businessData?.$type) return t(props.modelValue.businessData?.$type);
      return props.modelValue.type ? t(props.modelValue.type) : 'Process';
    });

    const renderComponents = computed<Component[]>(() => {
      const components: Component[] = [NodeBasic];

      const businessData = props.modelValue.businessData;
      const bpmnType = businessData.$type;

      // if (isTaskNode($props.node) && bpmnType === 'userTask') {
      //   components.push(UserTask);
      //   components.push(UserTaskMultiInstance);
      //   components.push(UserTaskOperation);
      // }
      if (isServiceNode(props.modelValue) && bpmnType === 'serviceTask') {
        if (businessData.type === 'copy') {
          components.push(ServiceCopyTo);
        }
        // if (businessData.type === 'mail') {
        //   components.push(ServiceMailTo);
        // }
      }
      if (isExpressionNode(props.modelValue) && checkExclusiveGateway(props.modelValue as WFExpressionNode)) {
        components.push(NodeExpression);
      }

      return components;
    });

    const togglePanel = (state?: boolean) => {
      if (!props.modelValue.id) return (panelState.value = false);
      if (isUndefined(state)) return (panelState.value = !panelState.value);
      panelState.value = state;
    };

    expose({ togglePanel } satisfies IFlowPanelExpose);

    return () => (
      <NDrawer
        v-model={[panelState.value, 'show']}
        class="!w-[22vw] min-w-sm border-1 border-rim2 rounded-xl"
        to="#akir-designer"
        showMask="transparent"
        trap-focus={false}
        block-scroll={false}
      >
        <NDrawerContent headerClass="bg-fill2">
          {{
            header: () => <div class="akir-flow-panel_header">{headerTitle.value}</div>,
            default: () => (
              <div class={{ 'akir-flow-panel': true, opened: panelState.value }}>
                {props.modelValue.id ? (
                  <div class="akir-flow-panel_body">
                    <NCollapse arrowPlacement="right">
                      {renderComponents.value.map(collapseItem =>
                        h(collapseItem, { key: collapseItem.name, modelValue: props.modelValue, onUpdateModelValue: (event: WFBaseNode) => emit('update:modelValue', event) }),
                      )}
                    </NCollapse>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ),
          }}
        </NDrawerContent>
      </NDrawer>
    );
  },
});
