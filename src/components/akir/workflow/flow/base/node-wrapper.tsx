import { getWFGlobalConfig } from '../../configuration/global';
import { isFunction, isString, isUndefined } from 'lodash-es';
import { capitalize, removeNode, setDragData } from '@/utils/workflow';
import { NIcon, NPopover } from 'naive-ui';
import { RiDeleteBinFill, RiErrorWarningFill, RiSignpostFill } from '@remixicon/vue';
import NodeBehavior from './node-behavior';

const NodeWrapper: SetupFC = () => {
  defineOptions({ name: 'AkirNodeWrapper' });

  const { direction = 'vertical' } = defineProps<{ direction?: WFDirection }>();

  const model = defineModel<WFBaseNode>({ required: true });

  const computedModelNode = computed<WFBaseNode>({
    get: () => model.value,
    set: (node: WFBaseNode) => (model.value = node),
  });

  const getValidatorFC = (key: WFGlobalConfigKey) => {
    const config = getWFGlobalConfig(key);
    if (isUndefined(config)) return () => true;
    if (isFunction(config)) return config;
    return () => config;
  };

  const appendable = computed(() => (getValidatorFC('canAppend') as WFCanRuleValidator)(computedModelNode.value));
  const removable = computed(() => (getValidatorFC('canRemove') as WFCanRuleValidator)(computedModelNode.value));
  const movable = computed(() => (getValidatorFC('canMove') as WFCanRuleValidator)(computedModelNode.value));

  const completenessValid = computed(() => {
    return (getValidatorFC('completenessValidator') as WFExecutionValidator)(computedModelNode.value);
  });

  // 默认条件
  const isDefaultFlow = computed(() => {
    return model.value?.type === 'expression' && (model.value as WFExpressionNode).$parent?.$default === model.value;
  });

  // 拖拽放置
  const dragHandler = (e: DragEvent) => {
    e.stopPropagation();
    e.dataTransfer?.setDragImage(e.target! as HTMLDivElement, -6, -6);
    setDragData(computedModelNode);
  };

  const handleDeleteNode = async () => {
    try {
      const preBehavior = getWFGlobalConfig('preBehaviorOfDelete');
      const isDel = await preBehavior(computedModelNode.value);
      isDel && removeNode(computedModelNode.value);
    } catch (e) {
      console.error(e);
    }
  };

  const transformNodeName = (node: WFBaseNode) => defineAsyncComponent<VNode>(() => import(`../nodes/${capitalize(node.type)}Node`));

  defineRender(
    <>
      {model.value && (
        <div class="flow-node__wrapper">
          <div
            class={['flow-node__container', movable.value && 'flow-node__movable', !completenessValid.value.status && 'flow-node__uncompleted']}
            draggable={movable.value}
            onDragstart={dragHandler}
            onMouseup={e => e.stopPropagation()}
          >
            {/* 校验未通过标识 */}
            {!completenessValid.value.status && completenessValid.value.message && (
              <NPopover trigger="hover">
                {{
                  trigger: () => (
                    <NIcon class="node-tag-icon node__uncompleted-tag">
                      <RiErrorWarningFill class="text-red-400" />
                    </NIcon>
                  ),
                  default: () => <div>{isString(completenessValid.value.message) ? completenessValid.value.message : completenessValid.value.message?.join(';')}</div>,
                }}
              </NPopover>
            )}
            {/* 默认条件标识 */}
            {isDefaultFlow && (
              <div class="node-tag-icon node__default-flow-tag">
                <RiSignpostFill class="text-green-500" />
              </div>
            )}

            {removable && (
              <div class="node-tag-icon node__delete-tag" title="删除节点">
                <button onClick={handleDeleteNode}>
                  <RiDeleteBinFill />
                </button>
              </div>
            )}
            {h(transformNodeName(computedModelNode.value), {
              modelValue: computedModelNode.value,
              onUpdateModelValue: (v: WFBaseNode) => (computedModelNode.value = v),
              direction: direction,
              dataNodeId: computedModelNode.value.id,
            })}
          </div>
        </div>
      )}
      <NodeBehavior data={model.value} />
    </>,
  );
};

export default NodeWrapper;
