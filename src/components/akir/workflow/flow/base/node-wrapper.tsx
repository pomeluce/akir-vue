import { PropType } from 'vue';
import { getWFGlobalConfig } from '../../configuration/global';
import { isFunction, isUndefined } from 'lodash-es';

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<WFBaseNode>,
      required: true,
    },
    direction: {
      type: String as PropType<WFDirection>,
      default: 'vertical',
      validator: (v: WFDirection) => ['vertical', 'horizontal'].includes(v),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const computedModelNode = computed<WFBaseNode>({
      get: () => props.modelValue,
      set: (node: WFBaseNode) => emit('update:modelValue', node),
    });
    const getValidatorFC = (key: WFGlobalConfigKey) => {
      const config = getWFGlobalConfig(key);
      if (isUndefined(config)) return () => true;
      if (isFunction(config)) return config;
      return () => config;
    };

    const movable = computed(() => {
      return (getValidatorFC('canMove') as WFCanRuleValidator)(computedModelNode.value);
    });

    const completenessValid = computed(() => {
      return (getValidatorFC('completenessValidator') as WFExecutionValidator)(computedModelNode.value);
    });

    return { movable, completenessValid };
  },
  render() {
    const { movable, completenessValid, $props } = this;
    return (
      <>
        {$props.modelValue && (
          <div class="flow-node__wrapper">
            <div
              class={['flow-node__container', movable && 'flow-node__movable', !completenessValid.status && 'flow-node__uncompleted']}
              draggable={movable}
              onMouseup={e => e.stopPropagation()}
            ></div>
          </div>
        )}
      </>
    );
  },
});
