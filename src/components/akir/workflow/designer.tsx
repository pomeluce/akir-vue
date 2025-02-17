import { ComponentInstance, PropType } from 'vue';
import { AkirFlow, IAkirFlowExpose } from './flow';
import './styles.scss';
import { setWFGlobalConfig } from './configuration/global';
import { WFAppMenuGetter } from './injection';
import { defaultWFAppendMenuProvider } from './configuration/provider';

const props = {
  modelValue: Object as PropType<WFBaseNode>,
  direction: String as PropType<WFDirection>,
  canAppend: [Boolean, Function] as PropType<WFCanAppend>,
  canRemove: [Boolean, Function] as PropType<WFCanRemove>,
  canMove: [Boolean, Function] as PropType<WFCanMove>,
  canDropped: [Boolean, Function] as PropType<WFCanDropped>,
  removeValidator: Function as PropType<WFExecutionValidator>,
  completenessValidator: Function as PropType<WFExecutionValidator>,
  appendMenuProvider: Function as PropType<WFAppendMenuProvider<WFBaseNodeType>>,
  preBehaviorOfDelete: Function as PropType<WFPreBehavior>,
};

export default defineComponent({
  props,
  emits: ['update:modelValue', 'zoomChanged', 'nodeClick', 'nodeDblclick', 'nodeContextmenu'],
  setup(props, { emit, expose }) {
    const { modelValue, direction = 'vertical', ...prop } = props;

    const dir = ref<WFDirection>(direction);
    const flowRef = ref<ComponentInstance<typeof AkirFlow> & IAkirFlowExpose>();
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
      // nextTick(() => dingPanelRef.value?.togglePanel(true));
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
      <div class="akir-designer">
        <AkirFlow
          ref={flowRef}
          v-model={processData.value}
          direction={dir.value}
          onNodeClick={handleNodeClick}
          onZoomChanged={event => emit('zoomChanged', event)}
          onNodeDblclick={event => emit('nodeDblclick', event)}
          onNodeContextmenu={event => emit('nodeContextmenu', event)}
        />
      </div>
    );
  },
});
