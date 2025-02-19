import { IconChevronLeft } from '@tabler/icons-vue';
import { isUndefined } from 'lodash-es';
import { NCollapse, NIcon } from 'naive-ui';
import { Component, PropType } from 'vue';
import NodeBasic from './collapse/NodeBasic';

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

      // const businessData = props.modelValue.businessData;
      // const bpmnType = businessData.$type;

      // if (isTaskNode($props.node) && bpmnType === 'userTask') {
      //   components.push(UserTask);
      //   components.push(UserTaskMultiInstance);
      //   components.push(UserTaskOperation);
      // }
      // if (isServiceNode($props.node) && bpmnType === 'serviceTask') {
      //   if (businessData.type === 'copy') {
      //     components.push(ServiceCopyTo);
      //   }
      //   if (businessData.type === 'mail') {
      //     components.push(ServiceMailTo);
      //   }
      // }
      // if (isExpressionNode($props.node) && checkExclusiveGateway($props.node as ExpressionNode)) {
      //   components.push(NodeExpression);
      // }

      return components;
    });

    const togglePanel = (state?: boolean) => {
      if (!props.modelValue.id) return (panelState.value = false);
      if (isUndefined(state)) return (panelState.value = !panelState.value);
      panelState.value = state;
    };

    expose({ togglePanel } satisfies IFlowPanelExpose);

    return () => (
      <div class={{ 'akir-flow-panel': true, opened: panelState.value }}>
        <div class="toggle-btn" onClick={() => togglePanel()}>
          <NIcon>
            <IconChevronLeft />
          </NIcon>
        </div>

        <div class="akir-flow-panel_header">{headerTitle.value}</div>
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
    );
  },
});
