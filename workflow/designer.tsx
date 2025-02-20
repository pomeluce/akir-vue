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
    const { modelValue, direction = 'vertical', ...prop } = props;

    const dir = ref<WFDirection>(direction);
    const flowRef = ref<ComponentInstance<typeof AkirFlow> & IAkirFlowExpose>();
    const flowPanelRef = ref<ComponentInstance<typeof AkirFlowPanel> & IAkirFlowPanelExpose>();
    const activeNode = ref<WFBaseNode>();

    const processData = computed<WFBaseNode>({
      get: () => modelValue!,
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
      setWFGlobalConfig('canAppend', prop.canAppend);
      setWFGlobalConfig('canRemove', prop.canRemove);
      setWFGlobalConfig('canMove', prop.canMove);
      setWFGlobalConfig('canDropped', prop.canDropped);
      setWFGlobalConfig('removeValidator', prop.removeValidator);
      setWFGlobalConfig('completenessValidator', prop.completenessValidator);
      setWFGlobalConfig('preBehaviorOfDelete', prop.preBehaviorOfDelete);
    });

    provide(WFAppMenuGetter, prop.appendMenuProvider ?? defaultWFAppendMenuProvider);

    expose({ toggleDirection, toggleRoot, fitViewport });

    return () => (
      <div id="akir-designer">
        <AkirFlow
          ref={flowRef}
          v-model={processData.value}
          direction={dir.value}
          onNodeClick={handleNodeClick}
          onZoomChanged={event => emit('zoomChanged', event)}
          onNodeDblclick={event => emit('nodeDblclick', event)}
          onNodeContextmenu={event => emit('nodeContextmenu', event)}
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
