import { NPopover } from 'naive-ui';
import { IconTrash } from '@tabler/icons-vue';
import { isFunction, isString, isUndefined } from 'lodash-es';
import { appendNode, capitalize, createNode, removeNode, setDragData } from 'wf/utils';
import { getWFGlobalConfig } from 'wf/configuration';
import NodeBehavior from './node-behavior';

const props = { modelValue: { type: Object as PropType<WFBaseNode>, required: true }, direction: String as PropType<WFDirection> };

export default defineComponent({
  name: 'AkirNodeWrapper',
  props,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue, direction = 'vertical' } = props;

    const computedModelNode = computed<WFBaseNode>({
      get: () => modelValue!,
      set: (node: WFBaseNode) => emit('update:modelValue', node),
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
      return modelValue?.type === 'expression' && (modelValue as WFExpressionNode).$parent?.$default === modelValue;
    });

    // 追加节点
    function appendNewNode(item: WFAppendMenuItem<WFBaseNodeType>) {
      let canAppend = getWFGlobalConfig('canAppend');
      if (!isFunction(canAppend)) canAppend = () => canAppend as boolean;
      if (canAppend(computedModelNode.value)) {
        const newNode = ref(createNode(item.type, computedModelNode.value?.$parent, item.name, item.businessData));
        appendNode(computedModelNode, newNode);
      }
    }

    // 拖拽放置
    const dragHandler = (e: DragEvent) => {
      e.stopPropagation();
      e.dataTransfer?.setDragImage(e.target! as HTMLDivElement, -6, -6);
      setDragData(computedModelNode);
    };

    const handleDeleteNode = async (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      try {
        const preBehavior = getWFGlobalConfig('preBehaviorOfDelete');
        const isDel = await preBehavior(computedModelNode.value);
        isDel && removeNode(computedModelNode.value);
      } catch (e) {
        console.error(e);
      }
    };

    const transformNodeName = (node: WFBaseNode) => defineAsyncComponent<VNode>(() => import(`../nodes/${capitalize(node.type)}Node.tsx`));

    return () => (
      <>
        {modelValue && (
          <div class="flow-node__wrapper">
            <div
              class={['flow-node__container', movable.value && 'flow-node__movable', !completenessValid.value.status && 'flow-node__uncompleted']}
              draggable={movable.value}
              onDragstart={dragHandler}
              onMousedown={e => e.stopPropagation()}
            >
              {/* 校验未通过标识 */}
              {!completenessValid.value.status && completenessValid.value.message && (
                <NPopover trigger="hover">
                  {{
                    trigger: () => (
                      <div class="node-tag-icon node__uncompleted-tag">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <line x1="12" x2="12" y1="4" y2="14" />
                          <line x1="12" x2="12" y1="18" y2="20" />
                        </svg>
                      </div>
                    ),
                    default: () => <div>{isString(completenessValid.value.message) ? completenessValid.value.message : completenessValid.value.message?.join(';')}</div>,
                  }}
                </NPopover>
              )}
              {/* 默认条件标识 */}
              {isDefaultFlow.value && (
                <div class="node-tag-icon node__default-flow-tag">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 13v8" />
                    <path d="M12 3v3" />
                    <path d="M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z" />
                  </svg>
                </div>
              )}

              {removable.value && (
                <div class="node-tag-icon node__delete-tag" title="删除节点">
                  <IconTrash size={18} onClick={handleDeleteNode} />
                </div>
              )}
              {h(transformNodeName(computedModelNode.value), {
                modelValue: computedModelNode.value,
                onUpdateModelValue: (v: WFBaseNode) => (computedModelNode.value = v),
                direction: direction,
                'data-node-id': computedModelNode.value.id,
              })}
            </div>
            {appendable.value && <NodeBehavior data={modelValue} onAppend={appendNewNode} />}
          </div>
        )}
      </>
    );
  },
});
