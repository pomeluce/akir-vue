import { ComponentInstance } from 'vue';
import { AkirFlow, IAkirFlowExpose } from './flow';
import { AkirFlowPanel, IAkirFlowPanelExpose } from './panel';
import { WFAppMenuGetter } from './injection';
import { defaultWFAppendMenuProvider, setWFGlobalConfig } from './configuration';
import './styles/index.css';

interface IFlowDesignerProps {
  modelValue?: WFBaseNode;
  direction?: WFDirection;
  canAppend?: WFCanAppend;
  canRemove?: WFCanRemove;
  canMove?: WFCanMove;
  canDropped?: WFCanDropped;
  removeValidator?: WFExecutionValidator;
  completenessValidator?: WFExecutionValidator;
  appendMenuProvider?: WFAppendMenuProvider<WFBaseNodeType>;
  preBehaviorOfDelete?: WFPreBehavior;
}

type IFlowDesignerEmits = {
  'update:modelValue': (node: WFBaseNode) => true;
  zoomChanged: (zoom: number) => true;
  nodeClick: (node: WFBaseNode) => true;
  nodeDblclick: (node: WFBaseNode) => true;
  nodeHover: (node: WFBaseNode) => true;
  nodeContextmenu: (node: WFBaseNode) => true;
};

export default defineComponent<IFlowDesignerProps, IFlowDesignerEmits>(
  (props, { emit, expose }) => {
    const dir = ref<WFDirection>(props.direction || 'vertical');
    const flowRef = ref<ComponentInstance<typeof AkirFlow> & IAkirFlowExpose>();
    const flowPanelRef = ref<ComponentInstance<typeof AkirFlowPanel> & IAkirFlowPanelExpose>();
    const activeNode = ref<WFBaseNode>();

    const processData = computed<WFBaseNode>({
      get: () => props.modelValue!,
      set: value => emit('update:modelValue', value),
    });

    const toggleDirection = () => (dir.value = dir.value === 'vertical' ? 'horizontal' : 'vertical');

    const toggleRoot = (node?: WFBaseNode) => flowRef.value?.toggleRoot(node as WFSubprocessNode);

    const handleNodeClick = (node: WFBaseNode) => {
      activeNode.value = node;
      emit('nodeClick', node);
      nextTick(() => flowPanelRef.value?.togglePanel(true));
    };

    const fitViewport = (padding?: number) => flowRef.value?.fitViewport(padding);

    watchEffect(() => {
      setWFGlobalConfig('canAppend', props.canAppend);
      setWFGlobalConfig('canRemove', props.canRemove);
      setWFGlobalConfig('canMove', props.canMove);
      setWFGlobalConfig('canDropped', props.canDropped);
      setWFGlobalConfig('removeValidator', props.removeValidator);
      setWFGlobalConfig('completenessValidator', props.completenessValidator);
      setWFGlobalConfig('preBehaviorOfDelete', props.preBehaviorOfDelete);
    });

    provide(WFAppMenuGetter, props.appendMenuProvider ?? defaultWFAppendMenuProvider);

    expose({ toggleDirection, toggleRoot, fitViewport });

    return () => (
      <div class="akir-designer">
        <AkirFlow
          ref={flowRef}
          v-model={processData.value}
          direction={dir.value}
          onNodeClick={handleNodeClick}
          onZoomChanged={event => emit('zoomChanged', event)}
          onNodeDblclick={event => emit('nodeDblclick', event)}
          onNodeContextmenu={event => emit('nodeContextmenu', event)}
          onNodeDelete={() => flowPanelRef.value?.togglePanel(false)}
        />
        <AkirFlowPanel ref={flowPanelRef} v-model={activeNode.value} />
      </div>
    );
  },
  {
    name: 'AkirFlowDesigner',
    props: ['modelValue', 'direction', 'canAppend', 'canRemove', 'canMove', 'canDropped', 'removeValidator', 'completenessValidator', 'appendMenuProvider', 'preBehaviorOfDelete'],
  },
);
