import { ComponentInstance } from 'vue';
import FlowCanvas, { IFlowCanvasExpose } from './base/flow-canvas';
import FlowList from './flow-list';
import { createPresetProcess, delegate, getNodeInMap } from 'wf/utils';

interface BreadcrumbItem {
  id: string;
  label: string;
  disabled: boolean;
  node?: WFBaseNode;
}

export interface IFlowExpose {
  fitViewport: (padding?: number) => void;
  toggleRoot: (r?: WFSubprocessNode) => void;
}

const props = { modelValue: { type: Object as PropType<WFBaseNode>, default: () => null }, direction: String as PropType<WFDirection> };

export default defineComponent({
  name: 'AkirFlow',
  props,
  emits: ['update:modelValue', 'zoomChanged', 'nodeClick', 'nodeDblclick', 'nodeMouseenter', 'nodeMouseleave', 'nodeContextmenu'],
  setup(props, { emit, expose }) {
    const { modelValue, direction = 'vertical' } = props;

    const root = ref<WFSubprocessNode>();
    const canvas = shallowRef<ComponentInstance<typeof FlowCanvas> & IFlowCanvasExpose>();
    const fitViewport = (padding?: number) => canvas.value?.fitViewport(padding);

    const computedFlowData = computed<WFBaseNode>(() => modelValue || ref(createPresetProcess()).value);
    const computedVisibleFlowData = computed<WFBaseNode>({
      get: () => (root.value ? root.value.$start! : computedFlowData.value),
      set: () => emit('update:modelValue', computedFlowData.value),
    });

    const computedBreadcrumbList = computed<BreadcrumbItem[] | undefined>(() => {
      if (!root.value) return undefined;

      const list: BreadcrumbItem[] = [];
      let parent: WFBaseNode | undefined = root.value;
      while (parent) {
        const disabled: boolean = parent.id === root.value.id;
        list.unshift({ node: parent, id: parent.id, label: parent.name || parent.type, disabled });
        parent = parent.$parent;
      }
      list.unshift({ label: '根节点', id: '__root', disabled: false });
      return list;
    });

    const toggleRoot = (r?: WFSubprocessNode) => {
      if (!r || r.type === 'subprocess') {
        root.value = r;
        nextTick(() => fitViewport());
      }
    };

    const breadcrumbClick = (bc: BreadcrumbItem) => {
      if (!bc.disabled) toggleRoot(bc.node ? (getNodeInMap(bc.node.id) as WFSubprocessNode) : undefined);
    };
    // dom 事件代理
    const emitDomEvent = (type: 'nodeClick' | 'nodeDblclick' | 'nodeMouseenter' | 'nodeMouseleave' | 'nodeContextmenu', element: HTMLElement, ev: Event) => {
      const nodeId = element.getAttribute('data-node-id');
      if (nodeId) {
        const node = getNodeInMap(nodeId);
        emit(type, node, ev);
      }
    };

    onMounted(() => {
      delegate(canvas.value!.$el, 'click', '.flow-node__container .flow-node', (element, ev) => emitDomEvent('nodeClick', element, ev));
      delegate(canvas.value!.$el, 'dblclick', '.flow-node__container .flow-node', (element, ev) => emitDomEvent('nodeDblclick', element, ev));
      delegate(canvas.value!.$el, 'mouseenter', '.flow-node__container .flow-node', (element, ev) => emitDomEvent('nodeMouseenter', element, ev));
      delegate(canvas.value!.$el, 'mouseleave', '.flow-node__container .flow-node', (element, ev) => emitDomEvent('nodeMouseleave', element, ev));
      delegate(canvas.value!.$el, 'contextmenu', '.flow-node__container .flow-node', (element, ev) => emitDomEvent('nodeContextmenu', element, ev));
    });

    expose({ fitViewport, toggleRoot } satisfies IFlowExpose);

    return () => (
      <FlowCanvas ref={canvas}>
        {{
          header: () => {
            computedBreadcrumbList.value?.length ? (
              <div class="akir-flow_breadcrumbs">
                {computedBreadcrumbList.value.map((bc, index) => (
                  <div class="akir-flow_breadcrumb-item" key={bc.id}>
                    {index > 0 && <span class="akir-flow_breadcrumb-item-tag"></span>}
                    <span class={['akir-flow_breadcrumb-item-label', bc.disabled && 'breadcrumb-item_is-disabled']} onClick={() => breadcrumbClick(bc)}>
                      {bc.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            );
          },
          default: () => <FlowList v-model={computedVisibleFlowData.value} direction={direction} />,
        }}
      </FlowCanvas>
    );
  },
});

// defineOptions({ name: 'AkirFlow' });
